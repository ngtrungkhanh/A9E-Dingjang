/**
 * A9E Dingjang Logistics Optimizer Core (v2.3)
 * Author: Antigravity
 * - Bỏ skill tăng xác suất manh mối khỏi đề xuất
 * - Tối ưu thời gian thay ca Control Nexus theo giờ nghỉ của các khoang
 * - Mô phỏng stamina chuẩn xác: CHỈ HỒI KHI NGHỈ
 */

(function (window) {
  'use strict';

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

  function parseAllOperators(fullSkillsData, userRosterData, useUserRoster) {
    const list = [];
    const userOpMap = {};

    if (userRosterData && userRosterData.operators) {
      for (const op of userRosterData.operators) {
        userOpMap[op.name] = op;
      }
    }

    for (const char of fullSkillsData) {
      if (!char.slots || char.slots.length === 0) continue;

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
        evolvePhase: opDetail ? opDetail.evolvePhase : 4,
        weapon: opDetail ? opDetail.weapon : null,
        unlockedSkillIds: unlockedSkills || [],
        skills: {
          'Control Nexus': parseSkillsForCabin(char, 'Control Nexus', useUserRoster, unlockedSkills),
          'MFG Cabin': parseSkillsForCabin(char, 'MFG Cabin', useUserRoster, unlockedSkills),
          'Growth Chamber': parseSkillsForCabin(char, 'Growth Chamber', useUserRoster, unlockedSkills),
          'Reception Room': parseSkillsForCabin(char, 'Reception Room', useUserRoster, unlockedSkills)
        }
      });
    }

    return list;
  }

  function evaluateOperatorForRoom(op, cabinEn, targetTypes, weights) {
    const sk = op.skills[cabinEn];
    if (!sk) return 0;

    if (cabinEn === 'Control Nexus') {
      return (sk.regen || 0) * 1.5;
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

  // 1 CÁN VIÊN CHỈ Ở ĐÚNG 1 PHÒNG - KHỞI TẠO THAM LAM & TỐI ƯU HÓA HOÁN ĐỔI TOÀN CỤC (GLOBAL SWAP OPTIMIZER)
  function assignDistinctRooms(operators, roomConfigs, weights, cycleDays) {
    const prodRooms = ['mfg1', 'mfg2', 'growth', 'reception'];
    prodRooms.sort((a, b) => {
      const getW = (r) => {
        if (r === 'mfg1') return weights.char_exp || 1.0;
        if (r === 'mfg2') return weights.weapon_exp || 1.0;
        if (r === 'growth') return Math.max(...(roomConfigs.growth.types.map(t => weights[t] || 1.0)), 1.0);
        if (r === 'reception') return weights.clue || 1.0;
        return 1.0;
      };
      return getW(b) - getW(a);
    });

    const roomOrder = ['nexus', ...prodRooms];
    const usedOperators = new Set();
    const assignment = {
      nexus: { shift1: [], shift2: [] },
      mfg1: { shift1: [], shift2: [] },
      mfg2: { shift1: [], shift2: [] },
      growth: { shift1: [], shift2: [] },
      reception: { shift1: [], shift2: [] }
    };

    for (const rKey of roomOrder) {
      const cfg = roomConfigs[rKey];
      const cabin = cfg.cabin;
      const targets = cfg.types;
      const cap = cfg.cap;

      const candidates = [];
      for (const op of operators) {
        if (usedOperators.has(op.name)) continue;
        const score = evaluateOperatorForRoom(op, cabin, targets, weights);
        candidates.push({ op, score });
      }

      candidates.sort((a, b) => b.score - a.score);

      if (rKey === 'nexus') {
        const strongNexusOps = candidates.slice(0, cap).map(c => c.op);
        strongNexusOps.forEach(op => usedOperators.add(op.name));

        const remainingCandidates = candidates.slice(cap).filter(c => !usedOperators.has(c.op.name));
        const subNexusOps = remainingCandidates.slice(0, cap).map(c => c.op);
        subNexusOps.forEach(op => usedOperators.add(op.name));

        assignment[rKey] = {
          shift1: subNexusOps,
          shift2: strongNexusOps
        };
      } else {
        const shift1Ops = candidates.slice(0, cap).map(c => c.op);
        shift1Ops.forEach(op => usedOperators.add(op.name));

        const remainingCandidates = candidates.slice(cap).filter(c => !usedOperators.has(c.op.name));
        const shift2Ops = remainingCandidates.slice(0, cap).map(c => c.op);
        shift2Ops.forEach(op => usedOperators.add(op.name));

        assignment[rKey] = {
          shift1: shift1Ops,
          shift2: shift2Ops
        };
      }
    }

    // TỐI ƯU TOÀN CỤC: Giải quyết xung đột cán viên có 2 skill ở 2 phòng khác nhau
    // và liên kết chặt chẽ với tốc độ hồi phục của Control Nexus
    return optimizeGlobalSwaps(assignment, roomConfigs, weights, cycleDays || 3);
  }

  function getSkillEffectSummary(op, cabinEn, targetTypes) {
    const sk = op.skills[cabinEn];
    if (!sk) return 'Không có hiệu ứng đặc biệt';

    const parts = [];
    if (cabinEn === 'Control Nexus') {
      if (sk.regen > 0) parts.push(`+${sk.regen}% Tái tạo tâm trạng`);
    } else {
      if (sk.buffs) {
        for (const t of targetTypes) {
          if (sk.buffs[t]) {
            const labelMap = {
              char_exp: 'EXP Cán Viên',
              weapon_exp: 'EXP Vũ Khí',
              plant: 'Cây Trồng',
              mineral: 'Khoáng Sản',
              fungus: 'Nấm',
              clue: 'Thu Thập Manh Mối'
            };
            parts.push(`+${sk.buffs[t]}% ${labelMap[t] || t}`);
          }
        }
      }
      if (sk.red > 0) parts.push(`-${sk.red}% Giảm hao`);
    }

    return parts.length > 0 ? parts.join(', ') : 'Nền +40% hiệu suất';
  }

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

  function calculateNexusRegenSpeed(nexusMembers) {
    let totalBuffPct = 0;
    for (const op of nexusMembers) {
      const sk = op.skills['Control Nexus'];
      if (sk && sk.regen) {
        totalBuffPct += sk.regen;
      }
    }
    const realSpeed = 12.0 * (1.0 + totalBuffPct / 100.0);
    const ingameSpeed = Math.round(realSpeed);
    return {
      totalBuffPct,
      realSpeed: parseFloat(realSpeed.toFixed(2)),
      ingameSpeed
    };
  }

  // Mô phỏng chu kỳ độc lập (CHỈ HỒI KHI NGHỈ)
  function simulateRoomCycle(roomKey, teamShift1, teamShift2, cabinEn, targetTypes, x, cycleDays, nexusShift1Regen, nexusShift2Regen) {
    const days = Math.max(1, cycleDays || 1);
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
      // === CA 1: 0h -> x === (Team 1 LÀM VIỆC: CHỈ HAO)
      if (teamShift1.length > 0) {
        let minS = 100.0;
        teamShift1.forEach(op => { minS = Math.min(minS, opStamina[op.name]); });

        const maxWorkTime = minS / m1.actualBurnRate;
        const actualWorkTime = Math.min(shift1Duration, maxWorkTime);

        if (actualWorkTime < shift1Duration && !depletedHourShift1) {
          depletedHourShift1 = parseFloat(actualWorkTime.toFixed(1));
        }

        totalCycleOutput += actualWorkTime * (m1.totalEffPct / 100.0);

        teamShift1.forEach(op => {
          opStamina[op.name] = Math.max(0, opStamina[op.name] - shift1Duration * m1.actualBurnRate);
        });
      }

      // Team 2 NGHỈ NGƠI trong lúc Ca 1 làm việc (HỒI STAMINA theo Nexus Ca 1)
      if (teamShift2.length > 0) {
        teamShift2.forEach(op => {
          opStamina[op.name] = Math.min(100.0, opStamina[op.name] + shift1Duration * nexusShift1Regen.realSpeed);
        });
      }

      // === CA 2: x -> 24 === (Team 2 LÀM VIỆC: CHỈ HAO)
      if (teamShift2.length > 0) {
        let minS = 100.0;
        teamShift2.forEach(op => { minS = Math.min(minS, opStamina[op.name]); });

        const maxWorkTime = minS / m2.actualBurnRate;
        const actualWorkTime = Math.min(shift2Duration, maxWorkTime);

        if (actualWorkTime < shift2Duration && !depletedHourShift2) {
          depletedHourShift2 = parseFloat((x + actualWorkTime).toFixed(1));
        }

        totalCycleOutput += actualWorkTime * (m2.totalEffPct / 100.0);

        teamShift2.forEach(op => {
          opStamina[op.name] = Math.max(0, opStamina[op.name] - shift2Duration * m2.actualBurnRate);
        });
      }

      // Team 1 NGHỈ NGƠI trong lúc Ca 2 làm việc (HỒI STAMINA theo Nexus Ca 2)
      if (teamShift1.length > 0) {
        teamShift1.forEach(op => {
          opStamina[op.name] = Math.min(100.0, opStamina[op.name] + shift2Duration * nexusShift2Regen.realSpeed);
        });
      }
    }

    const dailyOutputAvg = parseFloat((totalCycleOutput / days).toFixed(1));
    const dailyAvgEfficiency = Math.round((dailyOutputAvg / 24.0) * 100);

    const sanRate = (SANITY_PER_UNIT && SANITY_PER_UNIT[roomKey]) || (11.5508 / 24.0);
    const sanityDaily = parseFloat((dailyOutputAvg * sanRate).toFixed(1));

    return {
      m1,
      m2,
      x,
      shift1Duration,
      shift2Duration,
      dailyOutputAvg,
      dailyAvgEfficiency,
      sanityDaily,
      depletedHourShift1,
      depletedHourShift2
    };
  }

  function findOptimalXForRoom(roomKey, teamShift1, teamShift2, cabinEn, targetTypes, cycleDays, nexusShift1Regen, nexusShift2Regen) {
    let bestX = 12;
    let maxDailyOutput = -1;

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

      if (sim.dailyOutputAvg > maxDailyOutput) {
        maxDailyOutput = sim.dailyOutputAvg;
        bestX = testX;
      }
    }

    return { bestX, maxDailyOutput };
  }

  // Tỷ lệ Sanity quy đổi trên mỗi đơn vị giờ sản lượng chuẩn (1.0x Base Rate)
  // Dựa trên dữ liệu 177h46p40s (640,000s) ở hiệu suất 220%:
  // - Weapon EXP: 40 cái -> 5.4 cái/ngày ở 220% (2.455 cái/ngày ở 100%) -> 11.5508 Sanity/ngày
  // - Op EXP (61-80): 16 cái -> 2.16 cái/ngày ở 220% (0.982 cái/ngày ở 100%) -> 11.5508 Sanity/ngày
  // - Growth Chamber: 30% Weapon EXP -> 3.4652 Sanity/ngày ở 100%
  // - Reception Room: 50% Weapon EXP -> 5.7754 Sanity/ngày ở 100%
  const SANITY_PER_UNIT = {
    mfg1: 11.5508 / 24.0,       // ~0.48128 Sanity / đơn vị giờ
    mfg2: 11.5508 / 24.0,       // ~0.48128 Sanity / đơn vị giờ
    growth: (11.5508 * 0.3) / 24.0, // ~0.14438 Sanity / đơn vị giờ
    reception: (11.5508 * 0.5) / 24.0 // ~0.24064 Sanity / đơn vị giờ
  };

  function cloneAssignment(a) {
    const res = {};
    for (const r in a) {
      res[r] = {
        shift1: [...a[r].shift1],
        shift2: [...a[r].shift2]
      };
    }
    return res;
  }

  function evaluateGlobalBaseScore(assign, roomConfigs, weights, cycleDays = 3) {
    const reg1 = calculateNexusRegenSpeed(assign.nexus.shift1);
    const reg2 = calculateNexusRegenSpeed(assign.nexus.shift2);
    let totalScore = 0;

    for (const r of ['mfg1', 'mfg2', 'growth', 'reception']) {
      const cfg = roomConfigs[r];
      const opt = findOptimalXForRoom(
        r,
        assign[r].shift1,
        assign[r].shift2,
        cfg.cabin,
        cfg.types,
        cycleDays,
        reg1,
        reg2
      );
      const w = (r === 'mfg1') ? (weights.char_exp !== undefined ? weights.char_exp : 1.0)
              : (r === 'mfg2') ? (weights.weapon_exp !== undefined ? weights.weapon_exp : 1.0)
              : (r === 'growth') ? (weights.plant !== undefined ? weights.plant : 1.0)
              : (weights.clue !== undefined ? weights.clue : 1.0);
      const sanValue = opt.maxDailyOutput * (SANITY_PER_UNIT[r] || (11.5508 / 24.0));
      totalScore += sanValue * w;
    }
    return totalScore;
  }

  // TỐI ƯU HÓA HOÁN ĐỔI TOÀN CỤC (GLOBAL 2-SWAP LOCAL SEARCH)
  // Giải quyết triệt để vấn đề cán viên có 2 skill ở các phòng khác nhau và liên kết stamina với Nexus
  function optimizeGlobalSwaps(curAssign, roomConfigs, weights, cycleDays = 3) {
    let bestAssign = cloneAssignment(curAssign);
    let bestScore = evaluateGlobalBaseScore(bestAssign, roomConfigs, weights, cycleDays);
    const rooms = ['nexus', 'mfg1', 'mfg2', 'growth', 'reception'];
    const shifts = ['shift1', 'shift2'];

    let improved = true;
    let pass = 0;
    while (improved && pass < 5) {
      improved = false;
      pass++;
      const slots = [];
      rooms.forEach(r => {
        shifts.forEach(s => {
          bestAssign[r][s].forEach((op, idx) => {
            slots.push({ room: r, shift: s, idx, op });
          });
        });
      });

      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const s1 = slots[i];
          const s2 = slots[j];
          if (s1.room === s2.room) continue;

          const candidate = cloneAssignment(bestAssign);
          candidate[s1.room][s1.shift][s1.idx] = s2.op;
          candidate[s2.room][s2.shift][s2.idx] = s1.op;

          const score = evaluateGlobalBaseScore(candidate, roomConfigs, weights, cycleDays);
          if (score > bestScore + 0.1) {
            bestScore = score;
            bestAssign = candidate;
            improved = true;
            break;
          }
        }
        if (improved) break;
      }
    }

    // Đảm bảo sau tối ưu: Trong sản xuất, Ca 1 luôn là ca có hiệu suất cao hơn; Trong Nexus, Ca 2 có buff hồi phục cao hơn
    for (const r of rooms) {
      if (r === 'nexus') {
        const reg1 = calculateNexusRegenSpeed(bestAssign.nexus.shift1);
        const reg2 = calculateNexusRegenSpeed(bestAssign.nexus.shift2);
        if (reg1.totalBuffPct > reg2.totalBuffPct) {
          const tmp = bestAssign.nexus.shift1;
          bestAssign.nexus.shift1 = bestAssign.nexus.shift2;
          bestAssign.nexus.shift2 = tmp;
        }
      } else {
        const cfg = roomConfigs[r];
        const m1 = calculateTeamMetrics(bestAssign[r].shift1, cfg.cabin, cfg.types, 7.2);
        const m2 = calculateTeamMetrics(bestAssign[r].shift2, cfg.cabin, cfg.types, 7.2);
        if (m2.totalEffPct > m1.totalEffPct) {
          const tmp = bestAssign[r].shift1;
          bestAssign[r].shift1 = bestAssign[r].shift2;
          bestAssign[r].shift2 = tmp;
        }
      }
    }

    return bestAssign;
  }

  // Tối ưu mốc đổi ca cho Control Nexus:
  // Cân đối thời gian đổi ca của Nexus sao cho ca Nexus mạnh nhất (Ca 2) bắt đầu sớm đủ để đón
  // các đợt đổi ca về nghỉ của các cán viên Ca 1 chủ lực ở các phòng sản xuất
  function findOptimalNexusX(roomXSettings) {
    const prodXValues = [
      roomXSettings.mfg1 || 12,
      roomXSettings.mfg2 || 12,
      roomXSettings.growth || 12,
      roomXSettings.reception || 12
    ];
    // Sắp xếp các mốc đổi ca sản xuất tăng dần
    prodXValues.sort((a, b) => a - b);
    // Chọn mốc sớm nhất khi phòng sản xuất đầu tiên đổi ca về nghỉ (giới hạn an toàn từ 8h đến 14h)
    // để khi các cán viên Ca 1 sản xuất bắt đầu về nghỉ thì Nexus Ca 2 (+buff lớn nhất) đã sẵn sàng túc trực!
    const earliestProdX = prodXValues[0];
    return Math.max(8, Math.min(14, earliestProdX));
  }

  // TÍNH TOÁN CHI PHÍ SANITY/STAMINA THEO BẢNG QUY ĐỔI CHUẨN (A9E_SANITY_DATA)
  function calculateLevelUpCost(curLvl, targetLvl) {
    const sanityData = (typeof window !== 'undefined' && window.A9E_SANITY_DATA) ||
                       (typeof global !== 'undefined' && global.A9E_SANITY_DATA);
    if (sanityData && typeof sanityData.calculateSanityToMilestone === 'function') {
      let targetMilestone = 1;
      if (targetLvl >= 80) targetMilestone = 4;
      else if (targetLvl >= 60) targetMilestone = 3;
      else if (targetLvl >= 40) targetMilestone = 2;
      else if (targetLvl >= 20) targetMilestone = 1;
      return sanityData.calculateSanityToMilestone(curLvl, targetMilestone);
    }
    // Fallback nếu chưa nạp thư viện Sanity
    let cost = 0;
    if (curLvl < 10 && targetLvl >= 10) cost += 1;
    if (curLvl < 20 && targetLvl >= 20) cost += 2;
    if (curLvl < 30 && targetLvl >= 30) cost += 4;
    if (curLvl < 40 && targetLvl >= 40) cost += 8;
    if (curLvl < 60 && targetLvl >= 60) cost += 16;
    if (curLvl < 80 && targetLvl >= 80) cost += 32;
    return cost;
  }

  function isClueProbabilitySkill(desc) {
    return desc.includes('Tăng Xác Suất Manh Mối') || desc.includes('Tăng Tỷ Lệ Manh Mối');
  }

  function getShortSkillBenefit(desc) {
    const pcts = (desc.match(/(\d+)%/g) || []).map(p => parseInt(p, 10));
    const val = pcts.length > 0 ? pcts[0] : '';

    if (desc.includes('EXP cán viên')) return `+${val}% EXP Cán Viên`;
    if (desc.includes('EXP vũ khí')) return `+${val}% EXP Vũ Khí`;
    if (desc.includes('cây trồng')) return `+${val}% Cây Trồng Hóa Đá`;
    if (desc.includes('khoáng sản')) return `+${val}% Khoáng Sản Quý Hiếm`;
    if (desc.includes('nấm')) return `+${val}% Vật Chất Nấm`;
    if (desc.includes('thu thập manh mối')) return `+${val}% Tốc Độ Thu Thập Manh Mối`;
    if (desc.includes('Tái Tạo Tâm Trạng') || desc.includes('Trung Tâm Kiểm Soát')) return `+${val}% Tái Tạo Tâm Trạng (Nexus)`;
    if (desc.includes('Giảm Tâm Trạng') || desc.includes('làm chậm')) return `-${val}% Giảm Hao Tâm Trạng`;
    return desc;
  }

  function calculateDailySanityGain(cabinVi, effGain) {
    // Giả định trung bình ca làm việc 13h/ngày cho cán viên
    const avgShiftHours = 13.0;
    if (cabinVi.includes('Sản Xuất') || cabinVi.includes('Manufacturing')) {
      // 1 đv sản lượng EXP = 0.48128 Sanity. Cứ +100% hiệu suất sinh ra 1 đv/h
      return parseFloat((avgShiftHours * (effGain / 100) * 0.48128).toFixed(2));
    }
    if (cabinVi.includes('Buồng Phát Triển') || cabinVi.includes('Growth')) {
      // 1 đv sản lượng Buồng Phát Triển = 0.14438 Sanity
      return parseFloat((avgShiftHours * (effGain / 100) * 0.14438).toFixed(2));
    }
    if (cabinVi.includes('Tiếp Khách') || cabinVi.includes('Reception')) {
      // 1 đv sản lượng Tiếp Khách = 0.24064 Sanity
      return parseFloat((avgShiftHours * (effGain / 100) * 0.24064).toFixed(2));
    }
    if (cabinVi.includes('Kiểm Soát') || cabinVi.includes('Nexus')) {
      // Nexus buff +12% hồi phục giúp các cán viên hồi phục nhanh hơn, tăng thời gian làm việc toàn trạm
      return 1.25;
    }
    return 1.0;
  }

  // Đề xuất nâng cấp: QUY ĐỔI SANITY & XẾP THEO THỜI GIAN HOÀN VỐN NGẮN NHẤT
  function getUpgradeRecommendations(userOperators, fullSkillsData) {
    if (!userOperators || userOperators.length === 0) return [];

    const fullMap = {};
    fullSkillsData.forEach(c => { fullMap[c.name] = c; });

    const recs = [];

    for (const op of userOperators) {
      const name = op.name;
      const lvl = op.level || 1;
      const unlocked = op.spaceshipSkills || [];
      const charData = fullMap[name];
      if (!charData || !charData.slots || charData.slots.length < 2) continue;

      const s1 = charData.slots[0];
      const s2 = charData.slots[1];
      const s1_max = s1.levels[s1.levels.length - 1];
      const s2_max = s2.levels[s2.levels.length - 1];

      let s1_cur = null;
      for (const l of s1.levels) {
        if (unlocked.includes(l.skill_id)) s1_cur = l;
      }

      let s2_cur = null;
      for (const l of s2.levels) {
        if (unlocked.includes(l.skill_id)) s2_cur = l;
      }

      // Case 0: Chưa mở Slot 1 (Lv < 20)
      if (!s1_cur && lvl < 20) {
        const unlockSkill = s1.levels[0];
        if (!isClueProbabilitySkill(unlockSkill.desc_vi || '')) {
          const targetLvl = 20;
          const cost = calculateLevelUpCost(lvl, targetLvl);
          const shortBenefit = getShortSkillBenefit(unlockSkill.desc_vi || '');
          const effMatch = (unlockSkill.desc_vi || '').match(/(\d+)%/);
          const effGain = effMatch ? parseInt(effMatch[1], 10) : 10;
          const dailySanityGain = calculateDailySanityGain(s1.cabin_vi, effGain);
          const paybackDays = Math.round(cost / Math.max(0.05, dailySanityGain));
          const dailyRoi = parseFloat(((dailySanityGain / Math.max(1, cost)) * 100).toFixed(2));
          recs.push({
            name,
            rarity: op.rarity || '5',
            curLvl: lvl,
            targetLvl,
            cost: parseFloat(cost.toFixed(1)),
            dailySanityGain,
            paybackDays,
            dailyRoi,
            cabin: s1.cabin_vi,
            shortBenefit: `Mở mới: ${shortBenefit}`,
            effGain
          });
        }
      }

      // Case 1: Chưa mở Slot 2 (Lv < 40)
      if (!s2_cur && lvl < 40) {
        const unlockSkill = s2.levels[0];
        if (!isClueProbabilitySkill(unlockSkill.desc_vi || '')) {
          const targetLvl = 40;
          const cost = calculateLevelUpCost(lvl, targetLvl);
          const shortBenefit = getShortSkillBenefit(unlockSkill.desc_vi || '');
          const effMatch = (unlockSkill.desc_vi || '').match(/(\d+)%/);
          const effGain = effMatch ? parseInt(effMatch[1], 10) : 20;
          const dailySanityGain = calculateDailySanityGain(s2.cabin_vi, effGain);
          const paybackDays = Math.round(cost / Math.max(0.05, dailySanityGain));
          const dailyRoi = parseFloat(((dailySanityGain / Math.max(1, cost)) * 100).toFixed(2));
          recs.push({
            name,
            rarity: op.rarity || '5',
            curLvl: lvl,
            targetLvl,
            cost: parseFloat(cost.toFixed(1)),
            dailySanityGain,
            paybackDays,
            dailyRoi,
            cabin: s2.cabin_vi,
            shortBenefit: `Mở mới: ${shortBenefit}`,
            effGain
          });
        }
      }

      // Case 2: Slot 1 chưa max (Lv < 60)
      if (s1_cur && s1_cur.level < s1_max.level && lvl < 60) {
        if (!isClueProbabilitySkill(s1_max.desc_vi || '')) {
          const targetLvl = 60;
          const cost = calculateLevelUpCost(lvl, targetLvl);
          const shortBenefit = getShortSkillBenefit(s1_max.desc_vi || '');
          const effMatch = (s1_max.desc_vi || '').match(/(\d+)%/);
          const prevMatch = (s1_cur.desc_vi || '').match(/(\d+)%/);
          const curVal = effMatch ? parseInt(effMatch[1], 10) : 20;
          const prevVal = prevMatch ? parseInt(prevMatch[1], 10) : 10;
          const effGain = Math.max(5, curVal - prevVal);
          const dailySanityGain = calculateDailySanityGain(s1.cabin_vi, effGain);
          const paybackDays = Math.round(cost / Math.max(0.05, dailySanityGain));
          const dailyRoi = parseFloat(((dailySanityGain / Math.max(1, cost)) * 100).toFixed(2));
          recs.push({
            name,
            rarity: op.rarity || '5',
            curLvl: lvl,
            targetLvl,
            cost: parseFloat(cost.toFixed(1)),
            dailySanityGain,
            paybackDays,
            dailyRoi,
            cabin: s1.cabin_vi,
            shortBenefit: `Nâng lên: ${shortBenefit}`,
            effGain
          });
        }
      }

      // Case 3: Slot 2 chưa max (Lv < 80)
      if (s2_cur && s2_cur.level < s2_max.level && lvl < 80) {
        if (!isClueProbabilitySkill(s2_max.desc_vi || '')) {
          const targetLvl = 80;
          const cost = calculateLevelUpCost(lvl, targetLvl);
          const shortBenefit = getShortSkillBenefit(s2_max.desc_vi || '');
          const effMatch = (s2_max.desc_vi || '').match(/(\d+)%/);
          const prevMatch = (s2_cur.desc_vi || '').match(/(\d+)%/);
          const curVal = effMatch ? parseInt(effMatch[1], 10) : 30;
          const prevVal = prevMatch ? parseInt(prevMatch[1], 10) : 20;
          const effGain = Math.max(5, curVal - prevVal);
          const dailySanityGain = calculateDailySanityGain(s2.cabin_vi, effGain);
          const paybackDays = Math.round(cost / Math.max(0.05, dailySanityGain));
          const dailyRoi = parseFloat(((dailySanityGain / Math.max(1, cost)) * 100).toFixed(2));
          recs.push({
            name,
            rarity: op.rarity || '5',
            curLvl: lvl,
            targetLvl,
            cost: parseFloat(cost.toFixed(1)),
            dailySanityGain,
            paybackDays,
            dailyRoi,
            cabin: s2.cabin_vi,
            shortBenefit: `Nâng lên: ${shortBenefit}`,
            effGain
          });
        }
      }
    }

    // Sắp xếp theo Thời Gian Hoàn Vốn ngắn nhất (Nhanh có lãi Sanity nhất)
    recs.sort((a, b) => a.paybackDays - b.paybackDays);
    return recs;
  }

  const exported = {
    parseAllOperators,
    assignDistinctRooms,
    calculateTeamMetrics,
    calculateNexusRegenSpeed,
    simulateRoomCycle,
    findOptimalXForRoom,
    findOptimalNexusX,
    getSkillEffectSummary,
    getUpgradeRecommendations,
    SANITY_PER_UNIT
  };

  if (typeof window !== 'undefined') {
    window.A9EOptimizer = exported;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
