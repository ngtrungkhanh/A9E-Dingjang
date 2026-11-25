/**
 * A9E Dingjang Logistics Optimizer Core
 * Author: Antigravity
 * Thuật toán tối ưu hóa phân ca và bố trí cán viên cho Arknights: Endfield
 */

(function (window) {
  'use strict';

  // Trích xuất chỉ số kỹ năng từ mô tả
  function parseSkillsForCabin(charData, cabinEn, isUserOwned, userUnlockedSkills) {
    const slots = charData.slots || [];
    let bestBuffs = { char_exp: 0, weapon_exp: 0, plant: 0, mineral: 0, fungus: 0, clue: 0 };
    let bestRed = 0;
    let bestRegen = 0;
    let skillNameVi = '';
    let skillNameEn = '';
    let skillDescVi = '';
    let skillDescEn = '';

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

      skillNameVi = chosenLevel.name_vi || chosenLevel.name_en;
      skillNameEn = chosenLevel.name_en;
      skillDescVi = chosenLevel.desc_vi || '';
      skillDescEn = chosenLevel.desc_en || '';

      const pcts = (skillDescVi.match(/(\d+)%/g) || []).map(p => parseInt(p, 10));
      const val = pcts.length > 0 ? pcts[0] : 0;

      if (cabinEn === 'Control Nexus' || skillDescVi.includes('Tái Tạo Tâm Trạng')) {
        bestRegen = Math.max(bestRegen, val);
      } else if (skillDescVi.includes('Giảm Tâm Trạng') || skillDescVi.includes('làm chậm')) {
        bestRed = Math.max(bestRed, val);
      } else {
        if (skillDescVi.includes('EXP cán viên')) bestBuffs.char_exp = Math.max(bestBuffs.char_exp, val);
        if (skillDescVi.includes('EXP vũ khí')) bestBuffs.weapon_exp = Math.max(bestBuffs.weapon_exp, val);
        if (skillDescVi.includes('cây trồng')) bestBuffs.plant = Math.max(bestBuffs.plant, val);
        if (skillDescVi.includes('khoáng sản')) bestBuffs.mineral = Math.max(bestBuffs.mineral, val);
        if (skillDescVi.includes('nấm')) bestBuffs.fungus = Math.max(bestBuffs.fungus, val);
        if (cabinEn === 'Reception Room' || skillDescVi.includes('thu thập manh mối')) {
          bestBuffs.clue = Math.max(bestBuffs.clue, val);
        }
      }
    }

    return {
      buffs: bestBuffs,
      red: bestRed,
      regen: bestRegen,
      nameVi: skillNameVi,
      nameEn: skillNameEn,
      descVi: skillDescVi,
      descEn: skillDescEn
    };
  }

  // Chuẩn hóa toàn bộ danh sách cán viên
  function parseAllOperators(fullSkillsData, userRosterData, useUserRoster) {
    const list = [];
    const userOpMap = {};

    if (userRosterData && userRosterData.operators) {
      for (const op of userRosterData.operators) {
        userOpMap[op.name] = op;
      }
    }

    for (const char of fullSkillsData) {
      // Bỏ qua nhân vật không có kỹ năng căn cứ (Endministrator, M3, Mimino, Warfarin...)
      if (!char.slots || char.slots.length === 0) {
        continue;
      }

      const name = char.name;
      const isOwned = Boolean(userOpMap[name]);

      if (useUserRoster && !isOwned) {
        continue; // Chỉ lấy nhân vật người dùng có
      }

      const unlockedSkills = isOwned ? (userOpMap[name].spaceshipSkills || []) : null;
      const opDetail = isOwned ? userOpMap[name] : null;

      const mfg = parseSkillsForCabin(char, 'MFG Cabin', useUserRoster, unlockedSkills);
      const growth = parseSkillsForCabin(char, 'Growth Chamber', useUserRoster, unlockedSkills);
      const reception = parseSkillsForCabin(char, 'Reception Room', useUserRoster, unlockedSkills);
      const nexus = parseSkillsForCabin(char, 'Control Nexus', useUserRoster, unlockedSkills);

      list.push({
        id: char.id,
        name: name,
        rarity: opDetail ? opDetail.rarity : (char.rarity || '5'),
        level: opDetail ? opDetail.level : 90,
        evolvePhase: opDetail ? opDetail.evolvePhase : 4,
        weapon: opDetail ? opDetail.weapon : null,
        skills: {
          'MFG Cabin': mfg,
          'Growth Chamber': growth,
          'Reception Room': reception,
          'Control Nexus': nexus
        }
      });
    }

    return list;
  }

  // Tính điểm đánh giá của 1 cán viên cho 1 phòng cụ thể
  function evaluateOperatorForRoom(op, cabinEn, targetType, weight) {
    const cabinSkill = op.skills[cabinEn];
    if (!cabinSkill) return 0;

    let buff = 0;
    if (cabinSkill.buffs && cabinSkill.buffs[targetType] !== undefined) {
      buff = cabinSkill.buffs[targetType];
    }
    const red = cabinSkill.red || 0;
    const regen = cabinSkill.regen || 0;

    if (cabinEn === 'Control Nexus') {
      return regen * (weight || 1.0);
    }

    // Điểm số kết hợp giữa % buff sản lượng và % giảm hao (giảm hao cực kỳ giá trị)
    // Giảm hao 18% tương đương việc tăng thêm ~30% thời gian hoạt động
    const score = (buff * 1.0 + red * 1.5) * (weight || 1.0);
    return score;
  }

  // Thuật toán xếp đội hình cho 1 Ca
  function assignShiftTeams(availableOps, roomConfigs, weights) {
    const assignment = {
      mfg1: [],
      mfg2: [],
      growth: [],
      reception: [],
      nexus: []
    };

    const roomDefs = [
      { key: 'mfg1', cabin: 'MFG Cabin', type: roomConfigs.mfg1.type, cap: 3, weight: weights.char_exp || 1.0 },
      { key: 'mfg2', cabin: 'MFG Cabin', type: roomConfigs.mfg2.type, cap: 3, weight: weights.weapon_exp || 1.0 },
      { key: 'growth', cabin: 'Growth Chamber', type: roomConfigs.growth.type, cap: 3, weight: weights.growth || 1.0 },
      { key: 'reception', cabin: 'Reception Room', type: 'clue', cap: 3, weight: weights.clue || 1.0 },
      { key: 'nexus', cabin: 'Control Nexus', type: 'regen', cap: 5, weight: weights.nexus || 1.0 }
    ];

    // Sắp xếp các phòng theo độ ưu tiên trọng số giảm dần
    roomDefs.sort((a, b) => b.weight - a.weight);

    const assignedNames = new Set();

    // Vòng 1: Chọn ứng viên xuất sắc nhất cho từng phòng
    for (const r of roomDefs) {
      const candidates = [];
      for (const op of availableOps) {
        if (assignedNames.has(op.name)) continue;
        const score = evaluateOperatorForRoom(op, r.cabin, r.type, r.weight);
        if (score > 0) {
          candidates.push({ op, score });
        }
      }
      candidates.sort((a, b) => b.score - a.score);

      const pickCount = Math.min(r.cap, candidates.length);
      for (let i = 0; i < pickCount; i++) {
        assignment[r.key].push(candidates[i].op);
        assignedNames.add(candidates[i].op.name);
      }
    }

    // Vòng 2: Nếu phòng sản xuất chưa đủ 3 người, bù thêm cán viên giảm hao hoặc dự bị
    for (const r of roomDefs) {
      if (r.key === 'nexus') continue; // Nexus không bắt buộc đủ
      while (assignment[r.key].length < r.cap) {
        let bestFiller = null;
        let bestFillerScore = -1;
        for (const op of availableOps) {
          if (assignedNames.has(op.name)) continue;
          const s = evaluateOperatorForRoom(op, r.cabin, r.type, r.weight);
          if (s > bestFillerScore) {
            bestFillerScore = s;
            bestFiller = op;
          }
        }
        if (bestFiller) {
          assignment[r.key].push(bestFiller);
          assignedNames.add(bestFiller.name);
        } else {
          break; // Hết nhân lực
        }
      }
    }

    return {
      assignment,
      usedOps: assignedNames
    };
  }

  // Tính thông số hiệu suất và tốc độ hao của một team
  function getTeamMetrics(teamMembers, cabinEn, targetType, baseBurnRate) {
    const n = teamMembers.length;
    const baseEff = 1.0 + 0.4 * n;

    let totalBuffPct = 0;
    let totalRedPct = 0;
    let totalRegenPct = 0;

    for (const op of teamMembers) {
      const sk = op.skills[cabinEn];
      if (!sk) continue;
      if (sk.buffs && sk.buffs[targetType] !== undefined) {
        totalBuffPct += sk.buffs[targetType];
      }
      totalRedPct += sk.red || 0;
      totalRegenPct += sk.regen || 0;
    }

    const totalEffPct = baseEff * (1.0 + totalBuffPct / 100.0) * 100.0;
    const actualBurnRate = (baseBurnRate || 7.2) * Math.max(0.1, 1.0 - totalRedPct / 100.0);
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

  // Mô phỏng chu kỳ stamina 1, 3, 7 ngày và tính sản lượng thực tế
  function simulateCycle(shift1Assignment, shift2Assignment, roomConfigs, x, cycleDays, baseBurnRate, baseRestRegen) {
    const burnRate = baseBurnRate || 7.2;
    const restRegen = baseRestRegen || 12.0;
    const days = cycleDays || 1;

    // Tính buff Control Nexus của 2 ca
    const nexusMetrics1 = getTeamMetrics(shift1Assignment.nexus, 'Control Nexus', 'regen', burnRate);
    const nexusMetrics2 = getTeamMetrics(shift2Assignment.nexus, 'Control Nexus', 'regen', burnRate);

    const regenSpeedShift1 = restRegen * (1.0 + nexusMetrics1.totalRegenPct / 100.0);
    const regenSpeedShift2 = restRegen * (1.0 + nexusMetrics2.totalRegenPct / 100.0);

    const roomKeys = ['mfg1', 'mfg2', 'growth', 'reception'];
    const results = {};

    // Khởi tạo trạng thái stamina của cán viên (100% lúc ban đầu)
    const opStamina = {};
    const allOps = [];
    [...shift1Assignment.mfg1, ...shift1Assignment.mfg2, ...shift1Assignment.growth, ...shift1Assignment.reception,
     ...shift2Assignment.mfg1, ...shift2Assignment.mfg2, ...shift2Assignment.growth, ...shift2Assignment.reception].forEach(op => {
      if (!opStamina[op.name]) {
        opStamina[op.name] = 100.0;
        allOps.push(op);
      }
    });

    for (const rKey of roomKeys) {
      results[rKey] = {
        shift1: {
          members: shift1Assignment[rKey],
          metrics: getTeamMetrics(shift1Assignment[rKey], roomConfigs[rKey].cabin, roomConfigs[rKey].type, burnRate),
          dailyWorkHoursAvg: 0,
          dailyOutputAvg: 0,
          depletedHour: null
        },
        shift2: {
          members: shift2Assignment[rKey],
          metrics: getTeamMetrics(shift2Assignment[rKey], roomConfigs[rKey].cabin, roomConfigs[rKey].type, burnRate),
          dailyWorkHoursAvg: 0,
          dailyOutputAvg: 0,
          depletedHour: null
        },
        dailyTotalOutputAvg: 0,
        dailyAvgEfficiency: 0
      };
    }

    const shift1Duration = x;
    const shift2Duration = 24 - x;

    let totalCycleOutputByRoom = { mfg1: 0, mfg2: 0, growth: 0, reception: 0 };

    for (let day = 1; day <= days; day++) {
      // === CA 1: 0h -> x ===
      for (const rKey of roomKeys) {
        const team = shift1Assignment[rKey];
        const m = results[rKey].shift1.metrics;
        if (team.length === 0) continue;

        // Lấy stamina nhỏ nhất trong team
        let minS = 100.0;
        team.forEach(op => { minS = Math.min(minS, opStamina[op.name]); });

        // Thời gian làm việc có buff hiệu suất
        const maxTimePossible = minS / m.actualBurnRate;
        const actualWorkTime = Math.min(shift1Duration, maxTimePossible);

        if (actualWorkTime < shift1Duration && !results[rKey].shift1.depletedHour) {
          results[rKey].shift1.depletedHour = parseFloat(actualWorkTime.toFixed(1));
        }

        const out = actualWorkTime * (m.totalEffPct / 100.0);
        totalCycleOutputByRoom[rKey] += out;

        // Tiêu hao stamina của team Ca 1
        team.forEach(op => {
          opStamina[op.name] = Math.max(0, opStamina[op.name] - shift1Duration * m.actualBurnRate);
        });
      }

      // Đội Ca 2 nghỉ trong lúc Ca 1 làm việc (x giờ)
      for (const rKey of roomKeys) {
        shift2Assignment[rKey].forEach(op => {
          opStamina[op.name] = Math.min(100.0, opStamina[op.name] + shift1Duration * regenSpeedShift1);
        });
      }

      // === CA 2: x -> 24 ===
      for (const rKey of roomKeys) {
        const team = shift2Assignment[rKey];
        const m = results[rKey].shift2.metrics;
        if (team.length === 0) continue;

        let minS = 100.0;
        team.forEach(op => { minS = Math.min(minS, opStamina[op.name]); });

        const maxTimePossible = minS / m.actualBurnRate;
        const actualWorkTime = Math.min(shift2Duration, maxTimePossible);

        if (actualWorkTime < shift2Duration && !results[rKey].shift2.depletedHour) {
          results[rKey].shift2.depletedHour = parseFloat((x + actualWorkTime).toFixed(1));
        }

        const out = actualWorkTime * (m.totalEffPct / 100.0);
        totalCycleOutputByRoom[rKey] += out;

        // Tiêu hao stamina của team Ca 2
        team.forEach(op => {
          opStamina[op.name] = Math.max(0, opStamina[op.name] - shift2Duration * m.actualBurnRate);
        });
      }

      // Đội Ca 1 nghỉ trong lúc Ca 2 làm việc (24 - x giờ)
      for (const rKey of roomKeys) {
        shift1Assignment[rKey].forEach(op => {
          opStamina[op.name] = Math.min(100.0, opStamina[op.name] + shift2Duration * regenSpeedShift2);
        });
      }
    }

    // Tính trung bình mỗi ngày
    let overallDailyOutput = 0;
    for (const rKey of roomKeys) {
      const avgOut = totalCycleOutputByRoom[rKey] / days;
      results[rKey].dailyTotalOutputAvg = parseFloat(avgOut.toFixed(1));
      results[rKey].dailyAvgEfficiency = Math.round((avgOut / 24.0) * 100);
      overallDailyOutput += avgOut;
    }

    const overallAvgEfficiency = Math.round((overallDailyOutput / (24.0 * roomKeys.length)) * 100);

    return {
      results,
      overallDailyOutput: parseFloat(overallDailyOutput.toFixed(1)),
      overallAvgEfficiency,
      nexusShift1: nexusMetrics1,
      nexusShift2: nexusMetrics2,
      regenSpeedShift1: parseFloat(regenSpeedShift1.toFixed(2)),
      regenSpeedShift2: parseFloat(regenSpeedShift2.toFixed(2))
    };
  }

  // Tự động tìm x tối ưu (1 <= x <= 23)
  function findOptimalX(shift1Assignment, shift2Assignment, roomConfigs, weights, cycleDays, baseBurnRate, baseRestRegen) {
    let bestX = 12;
    let maxWeightedOutput = -1;
    const comparisons = [];

    const roomWeights = {
      mfg1: weights.char_exp || 1.0,
      mfg2: weights.weapon_exp || 1.0,
      growth: weights.growth || 1.0,
      reception: weights.clue || 1.0
    };

    for (let testX = 1; testX <= 23; testX++) {
      const sim = simulateCycle(shift1Assignment, shift2Assignment, roomConfigs, testX, cycleDays, baseBurnRate, baseRestRegen);
      let weightedScore = 0;
      for (const rKey in roomWeights) {
        weightedScore += (sim.results[rKey].dailyTotalOutputAvg || 0) * roomWeights[rKey];
      }

      comparisons.push({
        x: testX,
        weightedScore: parseFloat(weightedScore.toFixed(2)),
        overallDailyOutput: sim.overallDailyOutput,
        overallAvgEfficiency: sim.overallAvgEfficiency
      });

      if (weightedScore > maxWeightedOutput) {
        maxWeightedOutput = weightedScore;
        bestX = testX;
      }
    }

    return {
      bestX,
      maxWeightedOutput,
      comparisons
    };
  }

  // API chính xuất ra ngoài
  window.A9EOptimizer = {
    parseAllOperators,
    assignShiftTeams,
    getTeamMetrics,
    simulateCycle,
    findOptimalX
  };

})(window);
