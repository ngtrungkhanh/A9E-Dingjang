/**
 * A9E Dingjang Logistics Optimizer Core (v2.0)
 * Author: Antigravity
 * Tính toán phân ca độc lập từng phòng, 1 cán viên chỉ ở 1 phòng, công thức Nexus chuẩn xác
 */

(function (window) {
  'use strict';

  // Chuẩn hóa kỹ năng của 1 cán viên
  function parseSkillsForCabin(charData, cabinEn, isUserOwned, userUnlockedSkills) {
    const slots = charData.slots || [];
    let buffs = { char_exp: 0, weapon_exp: 0, plant: 0, mineral: 0, fungus: 0, clue: 0 };
    let red = 0;
    let regen = 0;

    for (const slot of slots) {
      if (slot.cabin_en !== cabinEn) continue;

      let chosenLevel = null;
      const levels = slot.levels || [];
      if (isUserOwned && userUnlockedSkills) {
        for (let i = levels.length - 1; i >= 0; i--) {
          if (userUnlockedSkills.includes(levels[i].skill_id)) {
            chosenLevel = levels[i];
            break;
          }
        }
      } else {
        chosenLevel = levels.length > 0 ? levels[levels.length - 1] : null;
      }

      if (!chosenLevel) continue;

      const desc = chosenLevel.desc_vi || chosenLevel.desc_en || '';
      const pcts = (desc.match(/(\d+)%/g) || []).map(p => parseInt(p, 10));
      const val = pcts.length > 0 ? pcts[0] : 0;

      if (cabinEn === 'Control Nexus' || desc.includes('Tái Tạo Tâm Trạng')) {
        regen = Math.max(regen, val);
      } else if (desc.includes('Giảm Tâm Trạng') || desc.includes('làm chậm')) {
        red = Math.max(red, val);
      } else {
        if (desc.includes('EXP cán viên')) buffs.char_exp = Math.max(buffs.char_exp, val);
        if (desc.includes('EXP vũ khí')) buffs.weapon_exp = Math.max(buffs.weapon_exp, val);
        if (desc.includes('cây trồng')) buffs.plant = Math.max(buffs.plant, val);
        if (desc.includes('khoáng sản')) buffs.mineral = Math.max(buffs.mineral, val);
        if (desc.includes('nấm')) buffs.fungus = Math.max(buffs.fungus, val);
        if (cabinEn === 'Reception Room' || desc.includes('thu thập manh mối')) {
          buffs.clue = Math.max(buffs.clue, val);
        }
      }
    }

    return { buffs, red, regen };
  }

  // Lọc và parse toàn bộ danh sách cán viên
  function parseAllOperators(fullSkillsData, userRosterData, useUserRoster) {
    const list = [];
    const userOpMap = {};

    if (userRosterData && userRosterData.operators) {
      for (const op of userRosterData.operators) {
        userOpMap[op.name] = op;
      }
    }

    for (const char of fullSkillsData) {
      if (!char.slots || char.slots.length === 0) continue; // Bỏ nhân vật không có kỹ năng

      const name = char.name;
      const isOwned = Boolean(userOpMap[name]);

      if (useUserRoster && !isOwned) {
        continue;
      }

      const unlockedSkills = isOwned ? (userOpMap[name].spaceshipSkills || []) : null;
      const opDetail = isOwned ? userOpMap[name] : null;

      list.push({
        id: char.id,
        name: name,
        rarity: opDetail ? opDetail.rarity : (char.rarity || '5'),
        level: opDetail ? opDetail.level : 90,
        weapon: opDetail ? opDetail.weapon : null,
        skills: {
          'MFG Cabin': parseSkillsForCabin(char, 'MFG Cabin', useUserRoster, unlockedSkills),
          'Growth Chamber': parseSkillsForCabin(char, 'Growth Chamber', useUserRoster, unlockedSkills),
          'Reception Room': parseSkillsForCabin(char, 'Reception Room', useUserRoster, unlockedSkills),
          'Control Nexus': parseSkillsForCabin(char, 'Control Nexus', useUserRoster, unlockedSkills)
        }
      });
    }

    return list;
  }

  // Đánh giá điểm phù hợp của cán viên đối với phòng
  function evaluateOperatorForRoom(op, cabinEn, targetTypes, weights) {
    const sk = op.skills[cabinEn];
    if (!sk) return 0;

    if (cabinEn === 'Control Nexus') {
      return (sk.regen || 0) * (weights.nexus || 1.0);
    }

    let buffScore = 0;
    if (sk.buffs) {
      for (const t of targetTypes) {
        if (sk.buffs[t]) {
          const w = weights[t] !== undefined ? weights[t] : 1.0;
          buffScore += sk.buffs[t] * w;
        }
      }
    }

    const redScore = (sk.red || 0) * 1.5;
    return buffScore + redScore;
  }

  // Phân bổ cán viên vào 5 phòng: 1 CÁN VIÊN CHỈ ĐƯỢC Ở ĐÚNG 1 PHÒNG!
  function assignDistinctRooms(operators, roomConfigs, weights) {
    const roomKeys = ['mfg1', 'mfg2', 'growth', 'reception', 'nexus'];

    // Sắp xếp thứ tự ưu tiên của phòng theo trọng số tài nguyên cao nhất của phòng đó
    const roomPriorities = {
      mfg1: weights.char_exp || 1.0,
      mfg2: weights.weapon_exp || 1.0,
      growth: Math.max(...(roomConfigs.growth.types.map(t => weights[t] || 1.0)), 1.0),
      reception: weights.clue || 1.0,
      nexus: weights.nexus || 1.0
    };

    roomKeys.sort((a, b) => roomPriorities[b] - roomPriorities[a]);

    const usedOperators = new Set();
    const assignment = {
      mfg1: { shift1: [], shift2: [] },
      mfg2: { shift1: [], shift2: [] },
      growth: { shift1: [], shift2: [] },
      reception: { shift1: [], shift2: [] },
      nexus: { shift1: [], shift2: [] }
    };

    for (const rKey of roomKeys) {
      const cfg = roomConfigs[rKey];
      const cabin = cfg.cabin;
      const targets = cfg.types;
      const cap = cfg.cap;

      // Tìm ứng viên chưa được gán vào bất kỳ phòng nào
      const candidates = [];
      for (const op of operators) {
        if (usedOperators.has(op.name)) continue;
        const score = evaluateOperatorForRoom(op, cabin, targets, weights);
        candidates.push({ op, score });
      }

      // Sắp xếp ứng viên điểm cao nhất
      candidates.sort((a, b) => b.score - a.score);

      // Tuyển chọn Ca 1 (tối đa cap)
      const shift1Ops = candidates.slice(0, cap).map(c => c.op);
      shift1Ops.forEach(op => usedOperators.add(op.name));

      // Tuyển chọn Ca 2 từ các ứng viên còn lại
      const remainingCandidates = candidates.slice(cap).filter(c => !usedOperators.has(c.op.name));
      const shift2Ops = remainingCandidates.slice(0, cap).map(c => c.op);
      shift2Ops.forEach(op => usedOperators.add(op.name));

      assignment[rKey] = {
        shift1: shift1Ops,
        shift2: shift2Ops
      };
    }

    return assignment;
  }

  // Tính thông số hiệu suất và tốc độ hao của một team
  function calculateTeamMetrics(teamMembers, cabinEn, targetTypes, baseBurnRate) {
    const n = teamMembers.length;
    const baseEff = 1.0 + 0.4 * n;

    let totalBuffPct = 0;
    let totalRedPct = 0;
    let totalRegenPct = 0;

    for (const op of teamMembers) {
      const sk = op.skills[cabinEn];
      if (!sk) continue;

      if (cabinEn === 'Control Nexus') {
        totalRegenPct += sk.regen || 0;
      } else {
        if (sk.buffs) {
          for (const t of targetTypes) {
            if (sk.buffs[t]) {
              totalBuffPct += sk.buffs[t];
            }
          }
        }
        totalRedPct += sk.red || 0;
      }
    }

    const totalEffPct = baseEff * (1.0 + totalBuffPct / 100.0) * 100.0;
    const burnRate = baseBurnRate || 7.2;
    const actualBurnRate = burnRate * Math.max(0.1, 1.0 - totalRedPct / 100.0);
    const maxDurationHours = totalRedPct < 100 ? (100.0 / actualBurnRate) : 999.0;

    return {
      count: n,
      baseEffPct: Math.round(baseEff * 100),
      totalBuffPct,
      totalRedPct,
      totalRegenPct,
      totalEffPct: Math.round(totalEffPct),
      actualBurnRate: parseFloat(actualBurnRate.toFixed(3)),
      maxDurationHours: parseFloat(maxDurationHours.toFixed(2))
    };
  }

  // Tính tốc độ hồi phục Stamina toàn căn cứ từ Control Nexus
  // Công thức chuẩn xác: Base 12%/h * (1 + sum(buff) / 100)
  function calculateNexusRegenSpeed(nexusMembers) {
    let totalBuffPct = 0;
    for (const op of nexusMembers) {
      const sk = op.skills['Control Nexus'];
      if (sk && sk.regen) {
        totalBuffPct += sk.regen;
      }
    }
    const realSpeed = 12.0 * (1.0 + totalBuffPct / 100.0);
    const ingameSpeed = Math.round(realSpeed); // Ingame hiển thị làm tròn số nguyên
    return {
      totalBuffPct,
      realSpeed: parseFloat(realSpeed.toFixed(2)),
      ingameSpeed
    };
  }

  // Mô phỏng chu kỳ độc lập cho 1 phòng cụ thể với giá trị x của phòng đó
  function simulateRoomCycle(roomKey, teamShift1, teamShift2, cabinEn, targetTypes, x, cycleDays, nexusShift1Regen, nexusShift2Regen) {
    const days = cycleDays || 1;
    const m1 = calculateTeamMetrics(teamShift1, cabinEn, targetTypes, 7.2);
    const m2 = calculateTeamMetrics(teamShift2, cabinEn, targetTypes, 7.2);

    const shift1Duration = x;
    const shift2Duration = 24 - x;

    const opStamina = {};
    [...teamShift1, ...teamShift2].forEach(op => { opStamina[op.name] = 100.0; });

    let totalCycleOutput = 0;
    let depletedHourShift1 = null;
    let depletedHourShift2 = null;

    for (let day = 1; day <= days; day++) {
      // === CA 1: 0 -> x ===
      if (teamShift1.length > 0) {
        let minS = 100.0;
        teamShift1.forEach(op => { minS = Math.min(minS, opStamina[op.name]); });

        const maxWorkTime = minS / m1.actualBurnRate;
        const actualWorkTime = Math.min(shift1Duration, maxWorkTime);

        if (actualWorkTime < shift1Duration && !depletedHourShift1) {
          depletedHourShift1 = parseFloat(actualWorkTime.toFixed(1));
        }

        totalCycleOutput += actualWorkTime * (m1.totalEffPct / 100.0);

        // Hao stamina Ca 1
        teamShift1.forEach(op => {
          opStamina[op.name] = Math.max(0, opStamina[op.name] - shift1Duration * m1.actualBurnRate);
        });
      }

      // Ca 2 nghỉ trong lúc Ca 1 làm việc (x giờ)
      if (teamShift2.length > 0) {
        teamShift2.forEach(op => {
          opStamina[op.name] = Math.min(100.0, opStamina[op.name] + shift1Duration * nexusShift1Regen.realSpeed);
        });
      }

      // === CA 2: x -> 24 ===
      if (teamShift2.length > 0) {
        let minS = 100.0;
        teamShift2.forEach(op => { minS = Math.min(minS, opStamina[op.name]); });

        const maxWorkTime = minS / m2.actualBurnRate;
        const actualWorkTime = Math.min(shift2Duration, maxWorkTime);

        if (actualWorkTime < shift2Duration && !depletedHourShift2) {
          depletedHourShift2 = parseFloat((x + actualWorkTime).toFixed(1));
        }

        totalCycleOutput += actualWorkTime * (m2.totalEffPct / 100.0);

        // Hao stamina Ca 2
        teamShift2.forEach(op => {
          opStamina[op.name] = Math.max(0, opStamina[op.name] - shift2Duration * m2.actualBurnRate);
        });
      }

      // Ca 1 nghỉ trong lúc Ca 2 làm việc (24 - x giờ)
      if (teamShift1.length > 0) {
        teamShift1.forEach(op => {
          opStamina[op.name] = Math.min(100.0, opStamina[op.name] + shift2Duration * nexusShift2Regen.realSpeed);
        });
      }
    }

    const dailyOutputAvg = parseFloat((totalCycleOutput / days).toFixed(1));
    const dailyAvgEfficiency = Math.round((dailyOutputAvg / 24.0) * 100);

    return {
      m1,
      m2,
      x,
      shift1Duration,
      shift2Duration,
      dailyOutputAvg,
      dailyAvgEfficiency,
      depletedHourShift1,
      depletedHourShift2
    };
  }

  // Tự động tìm x tối ưu riêng cho 1 phòng cụ thể
  function findOptimalXForRoom(roomKey, teamShift1, teamShift2, cabinEn, targetTypes, cycleDays, nexusShift1Regen, nexusShift2Regen) {
    let bestX = 12;
    let maxDailyOutput = -1;
    const comparisons = [];

    for (let testX = 1; testX <= 23; testX++) {
      const sim = simulateRoomCycle(
        roomKey,
        teamShift1,
        teamShift2,
        cabinEn,
        targetTypes,
        testX,
        cycleDays,
        nexusShift1Regen,
        nexusShift2Regen
      );

      comparisons.push({
        x: testX,
        dailyOutput: sim.dailyOutputAvg,
        dailyEff: sim.dailyAvgEfficiency
      });

      if (sim.dailyOutputAvg > maxDailyOutput) {
        maxDailyOutput = sim.dailyOutputAvg;
        bestX = testX;
      }
    }

    return {
      bestX,
      maxDailyOutput,
      comparisons
    };
  }

  window.A9EOptimizer = {
    parseAllOperators,
    assignDistinctRooms,
    calculateTeamMetrics,
    calculateNexusRegenSpeed,
    simulateRoomCycle,
    findOptimalXForRoom
  };

})(window);
