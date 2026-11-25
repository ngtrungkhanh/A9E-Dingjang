/**
 * A9E Dingjang - Arknights: Endfield
 * Sanity & Resource Optimization Data (Client-side 100% Offline)
 * Dữ liệu quy đổi Sanity/Stamina và chi phí tài nguyên các mốc nâng cấp nhân vật
 */

(function (global) {
  'use strict';

  var SANITY_RATES = {
    // 80 Sanity = 34,000 T-Creds
    TCRED: 80.0 / 34000.0, // ~0.0023529 Sanity / TC (1 Sanity = 425 TC)

    // Operator EXP Protocol Space (80 Sanity)
    // Set A (Lv 1 - 60): 17x Advanced Combat Record = 170,000 EXP
    EXP_LV1_60: 80.0 / 170000.0, // ~0.0004706 Sanity / EXP (1 Sanity = 2,125 EXP)

    // Set B (Lv 61 - 80+): 6x Adv (60k) + 8x Elem (8k) = 68,000 EXP
    EXP_LV61_80: 80.0 / 68000.0, // ~0.0011765 Sanity / EXP (1 Sanity = 850 EXP)

    // Promotions Protocol Space (80 Sanity)
    PROTODISK: 80.0 / 34.0, // ~2.3529 Sanity / item (34 / 80 San)
    PROTOSET: 80.0 / 14.0,  // ~5.7143 Sanity / item (14 / 80 San)

    // Skill Up Protocol Space (80 Sanity)
    PROTOPRISM: 80.0 / 85.0,  // ~0.9412 Sanity / item (85 / 80 San)
    PROTOHEDRON: 80.0 / 17.0, // ~4.7059 Sanity / item (17 / 80 San)

    // Hazardous Material
    RARE_MATERIAL: 80.0 / 6.0, // ~13.3333 Sanity / item (1 item / 13.3 San)

    // Weapon EXP (Gunsmith's Mound - 80 Sanity: 16x 10k + 10x 1k = 170,000 W-EXP)
    WEAPON_EXP: 80.0 / 170000.0, // ~0.0004706 Sanity / W-EXP

    // Weapon Tune (Forge Trials Lv.5 - 80 Sanity)
    CAST_DIE: 80.0 / 34.0,       // ~2.3529 Sanity / item
    HEAVY_CAST_DIE: 80.0 / 14.0, // ~5.7143 Sanity / item

    // Fungal & Vitrified Plants: Free from Growth Chamber
    FUNGAL_PLANT: 0.0
  };

  var LEVEL_PROGRESSION = {
    step_1_20: { from: 1, to: 20, exp: 22860, tcreds: 820, expRate: SANITY_RATES.EXP_LV1_60 },
    step_20_40: { from: 20, to: 40, exp: 248540, tcreds: 12540, expRate: SANITY_RATES.EXP_LV1_60 },
    step_40_60: { from: 40, to: 60, exp: 475710, tcreds: 23900, expRate: SANITY_RATES.EXP_LV1_60 },
    step_60_80: { from: 60, to: 80, exp: 465230, tcreds: 109180, expRate: SANITY_RATES.EXP_LV61_80 },
    step_80_90: { from: 80, to: 90, exp: 579950, tcreds: 238980, expRate: SANITY_RATES.EXP_LV61_80 },

    cumulative: {
      lv20: { exp: 22860, tcreds: 820 },
      lv40: { exp: 271400, tcreds: 13360 },
      lv60: { exp: 747110, tcreds: 37260 },
      lv80: { exp: 1212340, tcreds: 146440 },
      lv90: { exp: 1792290, tcreds: 385420 }
    }
  };

  var MILESTONES = {
    1: {
      milestone: 1,
      name: "Base Skill 1 (Rank 1)",
      name_vi: "Kỹ Năng Base 1 (Cấp 1 - α/β)",
      targetLevel: 20,
      promotion: "Promotion I (E1)",
      stepSanity: 44.69,
      cumulativeSanity: 44.69,
      resources: {
        exp: 22860,
        tcreds: 4020, // 820 (lv) + 1600 (promo) + 1600 (skill)
        protodisk: 8,
        protoprism: 6,
        fungalMatter: 3
      },
      sanityBreakdown: {
        exp: 22860 * SANITY_RATES.EXP_LV1_60,    // 10.76
        tcreds: 4020 * SANITY_RATES.TCRED,      // 9.46
        protodisk: 8 * SANITY_RATES.PROTODISK,  // 18.82
        protoprism: 6 * SANITY_RATES.PROTOPRISM // 5.65
      },
      roiRank: "S+++ (Siêu Hời)"
    },

    2: {
      milestone: 2,
      name: "Base Skill 2 (Rank 1)",
      name_vi: "Kỹ Năng Base 2 (Cấp 1 - α/β)",
      targetLevel: 40,
      promotion: "Promotion II (E2)",
      stepSanity: 243.17,
      cumulativeSanity: 287.86,
      resources: {
        exp: 248540,
        tcreds: 23840, // 12540 (lv) + 1800 (outfit) + 6500 (promo) + 3000 (skill)
        protodisk: 25,
        protoprism: 12,
        fungalMatter: 5
      },
      sanityBreakdown: {
        exp: 248540 * SANITY_RATES.EXP_LV1_60,    // 116.96
        tcreds: 23840 * SANITY_RATES.TCRED,       // 56.09
        protodisk: 25 * SANITY_RATES.PROTODISK,   // 58.82
        protoprism: 12 * SANITY_RATES.PROTOPRISM  // 11.29
      },
      roiRank: "S+ (Rất Hời)"
    },

    3: {
      milestone: 3,
      name: "Base Skill 1 (Rank 2)",
      name_vi: "Kỹ Năng Base 1 (Cấp 2 - β/γ)",
      targetLevel: 60,
      promotion: "Promotion III (E3)",
      stepSanity: 550.18,
      cumulativeSanity: 838.04,
      resources: {
        exp: 475710,
        tcreds: 56400, // 23900 (lv) + 6500 (outfit) + 18000 (promo) + 8000 (skill)
        protoset: 24,
        protohedron: 12,
        fungalMatter: 5
      },
      sanityBreakdown: {
        exp: 475710 * SANITY_RATES.EXP_LV1_60,     // 223.86
        tcreds: 56400 * SANITY_RATES.TCRED,       // 132.71
        protoset: 24 * SANITY_RATES.PROTOSET,     // 137.14
        protohedron: 12 * SANITY_RATES.PROTOHEDRON // 56.47
      },
      roiRank: "A (Tốt)"
    },

    4: {
      milestone: 4,
      name: "Base Skill 2 (Rank 2)",
      name_vi: "Kỹ Năng Base 2 (Cấp 2 - β/γ)",
      targetLevel: 80,
      promotion: "Promotion IV (E4)",
      stepSanity: 1695.43,
      cumulativeSanity: 2533.47,
      resources: {
        exp: 465230, // Cognitive Carriers
        tcreds: 247180, // 109180 (lv) + 18000 (outfit) + 100000 (promo) + 20000 (skill)
        protoset: 36,
        protohedron: 20,
        rareMaterials: 20,
        fungalMatter: 8
      },
      sanityBreakdown: {
        exp: 465230 * SANITY_RATES.EXP_LV61_80,        // 547.33
        tcreds: 247180 * SANITY_RATES.TCRED,          // 581.60
        protoset: 36 * SANITY_RATES.PROTOSET,         // 205.71
        protohedron: 20 * SANITY_RATES.PROTOHEDRON,   // 94.12
        rareMaterials: 20 * SANITY_RATES.RARE_MATERIAL // 266.67
      },
      roiRank: "B/C (Rất Đắt)"
    }
  };

  /**
   * Tính toán lượng Stamina/Sanity thực tế cần bù thêm để đưa cán viên từ level hiện tại lên mốc mục tiêu
   * @param {number} currentLvl Level hiện tại của cán viên (1 - 80)
   * @param {number} targetMilestone Mốc cần đạt (1, 2, 3, 4)
   * @returns {number} Số Sanity cần thiết (làm tròn 1 chữ số thập phân)
   */
  function calculateSanityToMilestone(currentLvl, targetMilestone) {
    if (!MILESTONES[targetMilestone]) return 0;
    var targetLvl = MILESTONES[targetMilestone].targetLevel;
    if (currentLvl >= targetLvl) return 0;

    var totalSan = 0;
    for (var m = 1; m <= targetMilestone; m++) {
      var ms = MILESTONES[m];
      var prevLvl = m === 1 ? 1 : MILESTONES[m - 1].targetLevel;
      if (currentLvl < ms.targetLevel) {
        if (currentLvl <= prevLvl) {
          totalSan += ms.stepSanity;
        } else {
          // Nằm giữa chừng trong khoảng prevLvl -> ms.targetLevel
          var ratio = (ms.targetLevel - currentLvl) / (ms.targetLevel - prevLvl);
          totalSan += (ms.sanityBreakdown.exp + ms.sanityBreakdown.tcreds * 0.5) * ratio +
                      (ms.sanityBreakdown.protodisk || 0) +
                      (ms.sanityBreakdown.protoset || 0) +
                      (ms.sanityBreakdown.protoprism || 0) +
                      (ms.sanityBreakdown.protohedron || 0) +
                      (ms.sanityBreakdown.rareMaterials || 0);
        }
      }
    }
    return Math.round(totalSan * 10) / 10;
  }

  var A9E_SANITY_DATA = {
    RATES: SANITY_RATES,
    LEVELS: LEVEL_PROGRESSION,
    MILESTONES: MILESTONES,
    calculateSanityToMilestone: calculateSanityToMilestone
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = A9E_SANITY_DATA;
  }
  if (typeof window !== 'undefined') {
    window.A9E_SANITY_DATA = A9E_SANITY_DATA;
  }
  if (typeof global !== 'undefined') {
    global.A9E_SANITY_DATA = A9E_SANITY_DATA;
  }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
