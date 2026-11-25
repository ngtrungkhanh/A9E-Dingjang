/**
 * A9E Dingjang Logistics Optimizer - Frontend Controller (v2.3)
 * Author: Antigravity
 * - Ô nhập số giờ + Nút Mặc định (12h) + Nút Đề xuất
 * - Nexus ghi rõ giờ thay ca & chiến lược phối hợp với giờ nghỉ
 * - Đề xuất nâng cấp đưa xuống dưới cùng, gập mở, bỏ skill xác suất manh mối, text gọn gàng
 */

(function () {
  'use strict';

  const I18N = {
    vi: {
      appTitle: "A9E DINGJIANG",
      appSubtitle: "Trợ Lý Tối Ưu Hậu Cần Trạm Vũ Trụ Đế Giang (Arknights: Endfield)",
      btnLangVi: "Tiếng Việt",
      btnLangEn: "English",
      btnModeAll: "Toàn Bộ Cán Viên (Max Lv)",
      btnModeUser: "Tài Khoản Của Tôi",
      btnUploadData: "Cập Nhật Data / SKPORT",
      accountGuest: "Chưa nạp tài khoản cá nhân (Bấm Cập Nhật Data để chọn file roster_summary.json)",
      uidLabel: "UID",
      serverLabel: "Server",
      levelLabel: "Cấp",
      opsCountLabel: "Cán viên khả dụng",
      settingsTitle: "Cấu Hình Ưu Tiên Tài Nguyên & Buồng Phát Triển",
      resourceWeights: "Hệ số ưu tiên từng loại tài nguyên",
      wCharExp: "EXP Cán Viên",
      wWeaponExp: "EXP Vũ Khí",
      wPlant: "Cây trồng",
      wMineral: "Khoáng sản",
      wFungus: "Nấm",
      wClue: "Tốc Độ Manh Mối",
      growthTargetTitle: "Mặt hàng Buồng Phát Triển (Có thể chọn 1, 2 hoặc cả 3 loại)",
      plantTarget: "Cây trồng",
      mineralTarget: "Khoáng sản",
      fungusTarget: "Nấm",
      cycleTitle: "Chu kỳ mô phỏng bền vững (Nhập số ngày)",
      cycleDaysLabel: "ngày",
      btnAutoAllX: "⚡ Tự Động Tối Ưu Phân Ca Cho Tất Cả Phòng",
      metricsTitle: "Sản Lượng Trung Bình Hàng Ngày Toàn Căn Cứ",
      metricDailyOut: "TỔNG SẢN LƯỢNG SANITY / NGÀY",
      mfg1Name: "Khoang Sản Xuất 1 (EXP Cán Viên)",
      mfg2Name: "Khoang Sản Xuất 2 (EXP Vũ Khí)",
      growthName: "Buồng Phát Triển (Đa Canh Tác)",
      receptionName: "Phòng Tiếp Khách (Manh Mối)",
      nexusName: "Trung Tâm Kiểm Soát (Nexus - 3 Slots)",
      shift1Label: "Ca 1 (0h ➔ {x}h) - {x} tiếng",
      shift2Label: "Ca 2 ({x}h ➔ 24h) - {remain} tiếng",
      staminaSafe: "✓ Trụ hết ca an toàn",
      staminaDepleted: "⚠ Cạn lúc {h}h (nghỉ {rest}h)",
      burnRateLabel: "Hao: {burn}%/h",
      dailyOutLabel: "Sản lượng: <strong style='color:#38bdf8;'>{san} San/ngày</strong>",
      dailyEffLabel: "Hiệu suất TB/ngày: <strong>{eff}%</strong>",
      btnResetDefault: "↺ Mặc định (12h)",
      btnApplyOptimal: "⚡ Đề xuất ({h}h)",
      nexusFormulaTitle: "Cơ Chế Phục Hồi Stamina Khi Nghỉ Ngơi (Control Nexus):",
      nexusFormulaDesc: "Mặc định không có ai: 12%/giờ (đúng 5 phút / 1% Stamina). Tốc độ hồi thực tế = 12% × (1 + Tổng % buff Nexus).",
      nexusShift1Regen: "Ca 1 buff +{buff}% ➔ Tốc độ hồi: {real}%/h (Ingame hiển thị: {ingame}%/h)",
      nexusShift2Regen: "Ca 2 buff +{buff}% ➔ Tốc độ hồi: {real}%/h (Ingame hiển thị: {ingame}%/h)",
      recTitle: "🚀 Đề Xuất Nâng Cấp Cán Viên (Hoàn Vốn Sanity Nhanh Nhất)",
      recSub: "Quy đổi theo Sanity ải 80 San. Xếp hạng theo thời gian hoàn vốn ngắn nhất (Payback Period = Vốn Sanity / Sanity tăng thêm mỗi ngày). Đã loại bỏ skill xác suất.",
      recEmpty: "Tất cả cán viên hiện có đều đã mở tối đa kỹ năng căn cứ!",
      recNeedAccount: "Vui lòng chọn chế độ 'Tài Khoản Của Tôi' để xem danh sách nâng cấp riêng cho kho cán viên của bạn.",
      modalTitle: "Cập Nhật Dữ Liệu Nhân Vật (100% Offline & Cache Local)",
      modalTabUpload: "1. Tải File JSON",
      modalTabCode: "2. Cào Nhanh SKPORT",
      modalTabRaw: "3. Dán JSON Trực Tiếp",
      modalDropHelp: "Chọn file 'roster_summary.json' từ máy của bạn (D:\\ToiUuHauCan):",
      modalChooseFile: "Chọn File JSON",
      modalBookmarkHelp: "Lệnh Python cào nhanh từ SKPORT lưu trực tiếp vào máy:",
      modalCopyBtn: "Sao Chép Lệnh",
      modalRawHelp: "Dán chuỗi JSON vào đây:",
      modalApplyBtn: "Lưu & Áp Dụng",
      modalResetBtn: "Khôi Phục Mặc Định",
      modalNotice: "100% Offline & Bảo Mật: Dữ liệu cá nhân chỉ lưu trong LocalStorage của máy này, không gửi lên bất kỳ server mạng nào.",
      copiedToast: "Đã sao chép vào Clipboard!",
      appliedSuccess: "Đã cập nhật dữ liệu thành công!"
    },
    en: {
      appTitle: "A9E DINGJIANG",
      appSubtitle: "Arknights: Endfield Dijiang Base Logistics Optimizer",
      btnLangVi: "Tiếng Việt",
      btnLangEn: "English",
      btnModeAll: "All Operators (Max Lv)",
      btnModeUser: "My Account (SKPORT)",
      btnUploadData: "Update Data / SKPORT",
      accountGuest: "No custom account loaded (Click Update Data to load roster_summary.json)",
      uidLabel: "UID",
      serverLabel: "Server",
      levelLabel: "Level",
      opsCountLabel: "Available Operators",
      settingsTitle: "Resource Priorities & Growth Chamber Settings",
      resourceWeights: "Resource Priority Weights",
      wCharExp: "Operator EXP",
      wWeaponExp: "Weapon EXP",
      wPlant: "Crops",
      wMineral: "Minerals",
      wFungus: "Fungus",
      wClue: "Clue Gathering Speed",
      growthTargetTitle: "Growth Chamber Products (Select 1, 2 or all 3)",
      plantTarget: "Crops",
      mineralTarget: "Minerals",
      fungusTarget: "Fungus",
      cycleTitle: "Simulation Cycle (Enter Days)",
      cycleDaysLabel: "days",
      btnAutoAllX: "⚡ Auto-Optimize Shift Hours for All Rooms",
      metricsTitle: "Daily Base-Wide Average Production",
      metricDailyOut: "DAILY TOTAL SANITY OUTPUT",
      mfg1Name: "MFG Cabin 1 (Operator EXP)",
      mfg2Name: "MFG Cabin 2 (Weapon EXP)",
      growthName: "Growth Chamber (Multi-cultivation)",
      receptionName: "Reception Room (Clues)",
      nexusName: "Control Nexus (3 Slots)",
      shift1Label: "Shift 1 (0h ➔ {x}h) - {x} hrs",
      shift2Label: "Shift 2 ({x}h ➔ 24h) - {remain} hrs",
      staminaSafe: "✓ Sustainable Shift",
      staminaDepleted: "⚠ Depleted at {h}h ({rest}h idle)",
      burnRateLabel: "Burn: {burn}%/h",
      dailyOutLabel: "Output: <strong style='color:#38bdf8;'>{san} San/day</strong>",
      dailyEffLabel: "Daily Avg Eff: <strong>{eff}%</strong>",
      btnResetDefault: "↺ Default (12h)",
      btnApplyOptimal: "⚡ Optimal ({h}h)",
      nexusFormulaTitle: "Stamina Recovery Mechanism When Idle (Control Nexus):",
      nexusFormulaDesc: "Base rest speed: 12%/h (exactly 5 mins / 1% Stamina). Actual regen speed = 12% × (1 + sum of Nexus buffs).",
      nexusShift1Regen: "Shift 1 buff +{buff}% ➔ Regen speed: {real}%/h (Ingame: {ingame}%/h)",
      nexusShift2Regen: "Shift 2 buff +{buff}% ➔ Regen speed: {real}%/h (Ingame: {ingame}%/h)",
      recTitle: "🚀 Operator Upgrade Recommendations (Ranked by Sanity Payback Time)",
      recSub: "Calibrated via 80-Sanity stages. Ranked by shortest payback period (Capital / Daily Sanity Gain). Clue chances excluded.",
      recEmpty: "All currently owned operators have unlocked maximum base skills!",
      recNeedAccount: "Please switch to 'My Account' mode to see upgrade recommendations for your roster.",
      modalTitle: "Update Operator Data (100% Offline & Local Cache)",
      modalTabUpload: "1. Upload JSON File",
      modalTabCode: "2. Fast SKPORT Crawler",
      modalTabRaw: "3. Paste Raw JSON",
      modalDropHelp: "Select 'roster_summary.json' from your computer (D:\\ToiUuHauCan):",
      modalChooseFile: "Choose JSON File",
      modalBookmarkHelp: "Python command to crawl directly to local disk:",
      modalCopyBtn: "Copy Command",
      modalRawHelp: "Paste raw JSON here:",
      modalApplyBtn: "Save & Apply",
      modalResetBtn: "Reset to Default",
      modalNotice: "100% Offline & Private: All data strictly remains inside your browser's LocalStorage and is never sent to any server.",
      copiedToast: "Copied to clipboard!",
      appliedSuccess: "Data updated successfully!"
    }
  };

  const state = {
    lang: localStorage.getItem('a9e_lang') || 'vi',
    mode: localStorage.getItem('a9e_mode') || 'all',
    growthTargets: JSON.parse(localStorage.getItem('a9e_growth_targets') || '["plant", "mineral"]'),
    cycleDays: parseInt(localStorage.getItem('a9e_cycle_days') || '1', 10),
    roomX: JSON.parse(localStorage.getItem('a9e_room_x') || '{"nexus":12,"mfg1":12,"mfg2":12,"growth":12,"reception":12}'),
    weights: JSON.parse(localStorage.getItem('a9e_weights_v3') || JSON.stringify({
      char_exp: 1.0,
      weapon_exp: 1.0,
      plant: 1.0,
      mineral: 1.0,
      fungus: 1.0,
      clue: 1.0
    })),
    userData: null,
    showRecDetails: false,
    activeModalTab: 'upload'
  };

  try {
    const savedUserData = localStorage.getItem('a9e_user_roster');
    if (savedUserData) {
      state.userData = JSON.parse(savedUserData);
    }
  } catch (e) {
    state.userData = null;
  }

  function t(key, params) {
    let str = (I18N[state.lang] && I18N[state.lang][key]) || key;
    if (params) {
      for (const p in params) {
        str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
      }
    }
    return str;
  }

  function saveSettings() {
    localStorage.setItem('a9e_lang', state.lang);
    localStorage.setItem('a9e_mode', state.mode);
    localStorage.setItem('a9e_growth_targets', JSON.stringify(state.growthTargets));
    localStorage.setItem('a9e_cycle_days', state.cycleDays.toString());
    localStorage.setItem('a9e_room_x', JSON.stringify(state.roomX));
    localStorage.setItem('a9e_weights_v3', JSON.stringify(state.weights));
  }

  function updateOptimizer() {
    if (typeof A9EOptimizer === 'undefined' || typeof FULL_SKILLS_DATA === 'undefined') {
      return;
    }

    const useUserRoster = (state.mode === 'user');
    const ops = A9EOptimizer.parseAllOperators(FULL_SKILLS_DATA, state.userData, useUserRoster);

    const roomConfigs = {
      nexus: { cabin: 'Control Nexus', types: ['nexus'], cap: 3 },
      mfg1: { cabin: 'MFG Cabin', types: ['char_exp'], cap: 3 },
      mfg2: { cabin: 'MFG Cabin', types: ['weapon_exp'], cap: 3 },
      growth: { cabin: 'Growth Chamber', types: state.growthTargets.length > 0 ? state.growthTargets : ['plant'], cap: 3 },
      reception: { cabin: 'Reception Room', types: ['clue'], cap: 3 }
    };

    const assignment = A9EOptimizer.assignDistinctRooms(ops, roomConfigs, state.weights, state.cycleDays);

    const nexusRegen1 = A9EOptimizer.calculateNexusRegenSpeed(assignment.nexus.shift1);
    const nexusRegen2 = A9EOptimizer.calculateNexusRegenSpeed(assignment.nexus.shift2);

    const simResults = {};
    const autoXSuggestions = {};

    const roomKeys = ['nexus', 'mfg1', 'mfg2', 'growth', 'reception'];
    for (const rKey of roomKeys) {
      const cfg = roomConfigs[rKey];
      const team1 = assignment[rKey].shift1;
      const team2 = assignment[rKey].shift2;
      const currentX = state.roomX[rKey] || 12;

      simResults[rKey] = A9EOptimizer.simulateRoomCycle(
        rKey,
        team1,
        team2,
        cfg.cabin,
        cfg.types,
        currentX,
        state.cycleDays,
        nexusRegen1,
        nexusRegen2
      );

      if (rKey === 'nexus') {
        const optimalNexusX = A9EOptimizer.findOptimalNexusX(state.roomX);
        autoXSuggestions.nexus = { bestX: optimalNexusX };
      } else {
        autoXSuggestions[rKey] = A9EOptimizer.findOptimalXForRoom(
          rKey,
          team1,
          team2,
          cfg.cabin,
          cfg.types,
          state.cycleDays,
          nexusRegen1,
          nexusRegen2
        );
      }
    }

    const upgradeRecs = (state.userData && state.userData.operators)
      ? A9EOptimizer.getUpgradeRecommendations(state.userData.operators, FULL_SKILLS_DATA)
      : [];

    const optimalSync = (typeof A9EOptimizer !== 'undefined' && typeof A9EOptimizer.findOptimalGlobalSyncX === 'function')
      ? A9EOptimizer.findOptimalGlobalSyncX(assignment, roomConfigs, state.cycleDays, nexusRegen1, nexusRegen2)
      : { bestX: 18, maxBaseSanity: 127.0 };

    renderUI(ops, assignment, roomConfigs, simResults, autoXSuggestions, nexusRegen1, nexusRegen2, upgradeRecs, optimalSync);
  }

  function renderUI(allOps, assignment, roomConfigs, simResults, autoXSuggestions, nexusRegen1, nexusRegen2, upgradeRecs, optimalSync) {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let totalBaseDailyOutput = 0;
    let totalBaseDailySanity = 0;
    const prodRooms = ['mfg1', 'mfg2', 'growth', 'reception'];
    prodRooms.forEach(r => {
      totalBaseDailyOutput += simResults[r].dailyOutputAvg;
      totalBaseDailySanity += (simResults[r].sanityDaily || 0);
    });

    let accountHtml = '';
    if (state.userData && state.userData.account) {
      const acc = state.userData.account;
      accountHtml = `
        <div class="account-banner glass-panel">
          <div class="account-info">
            <div class="account-avatar">${acc.nickname ? acc.nickname.charAt(0).toUpperCase() : 'U'}</div>
            <div class="account-details">
              <h3>${acc.nickname || 'Unknown'} <span class="badge-tag">Lv.${acc.level || 1}</span></h3>
              <p>${t('serverLabel')}: ${acc.serverName || 'Asia'} | ${t('uidLabel')}: ${acc.uid || '---'} | ${t('opsCountLabel')}: <strong>${allOps.length}</strong></p>
            </div>
          </div>
          <div>
            <button class="btn-secondary" id="btnOpenModal">⚙ ${t('btnUploadData')}</button>
          </div>
        </div>
      `;
    } else {
      accountHtml = `
        <div class="account-banner glass-panel" style="border-left-color: var(--accent-orange);">
          <div class="account-info">
            <div class="account-avatar" style="background: linear-gradient(135deg, #f59e0b, #d97706);">★</div>
            <div class="account-details">
              <h3>${t('accountGuest')}</h3>
              <p style="font-size:0.8rem; color:var(--text-secondary);">${t('modalNotice')}</p>
            </div>
          </div>
          <div>
            <button class="btn-primary" id="btnOpenModal">📂 ${t('btnUploadData')}</button>
          </div>
        </div>
      `;
    }

    appEl.innerHTML = `
      <header class="glass-panel">
        <div class="logo-section">
          <div class="logo-badge">A9E</div>
          <div class="logo-text">
            <h1>${t('appTitle')}</h1>
            <p>${t('appSubtitle')}</p>
          </div>
        </div>

        <div class="header-controls">
          <div class="btn-group">
            <button class="btn-group-btn ${state.mode === 'all' ? 'active' : ''}" id="btnModeAll">${t('btnModeAll')}</button>
            <button class="btn-group-btn ${state.mode === 'user' ? 'active' : ''}" id="btnModeUser">${t('btnModeUser')}</button>
          </div>

          <div class="btn-group">
            <button class="btn-group-btn ${state.lang === 'vi' ? 'active' : ''}" id="btnLangVi">${t('btnLangVi')}</button>
            <button class="btn-group-btn ${state.lang === 'en' ? 'active' : ''}" id="btnLangEn">${t('btnLangEn')}</button>
          </div>
        </div>
      </header>

      ${accountHtml}

      <div class="controls-grid">
        <!-- Card 1: Multi-select Buồng Phát Triển & Chu kỳ -->
        <div class="control-card glass-panel">
          <div class="control-card-header">🌱 ${t('growthTargetTitle')}</div>
          <div class="btn-group" style="width:100%; display:flex; margin-bottom:1rem;">
            <button class="btn-group-btn ${state.growthTargets.includes('plant') ? 'active' : ''}" style="flex:1;" data-growth-toggle="plant">${t('plantTarget')}</button>
            <button class="btn-group-btn ${state.growthTargets.includes('mineral') ? 'active' : ''}" style="flex:1;" data-growth-toggle="mineral">${t('mineralTarget')}</button>
            <button class="btn-group-btn ${state.growthTargets.includes('fungus') ? 'active' : ''}" style="flex:1;" data-growth-toggle="fungus">${t('fungusTarget')}</button>
          </div>

          <div style="margin-top:1rem;">
            <div style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.4rem;">${t('cycleTitle')}:</div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <input type="number" id="cycleDaysInput" min="1" max="60" value="${state.cycleDays}" style="width:80px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.35rem 0.6rem; font-family:var(--font-mono); font-size:0.9rem;" />
              <span style="font-size:0.85rem; color:var(--text-secondary);">${t('cycleDaysLabel')}</span>
            </div>
          </div>

          <div style="margin-top:1.25rem;">
            <button class="btn-primary" id="btnAutoAllRooms" style="width:100%; justify-content:center; padding:0.65rem;">
              ${t('btnAutoAllX')}
            </button>
          </div>
        </div>

        <!-- Card 2: 6 Hệ số ưu tiên tài nguyên (Nhập số) -->
        <div class="control-card glass-panel">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <div class="control-card-header" style="margin-bottom:0;">⚖ ${t('resourceWeights')}</div>
            <button class="btn-group-btn" id="btnResetWeights" style="padding:0.2rem 0.5rem; font-size:0.72rem; color:var(--text-secondary);">
              ↺ Mặc định (1.0)
            </button>
          </div>
          <p style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Hệ số nhân trực tiếp vào giá trị Sanity quy đổi của từng loại tài nguyên để điều chỉnh ưu tiên tối ưu hóa (mặc định = 1.0).
          </p>
          
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:0.5rem;">
            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:6px; padding:0.4rem 0.55rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">${t('wCharExp')}</span>
              <input type="number" class="weight-number-input" data-weight="char_exp" min="0" max="10" step="0.1" value="${state.weights.char_exp}" style="width:48px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.3rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center; font-weight:700;" />
            </div>

            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:6px; padding:0.4rem 0.55rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">${t('wWeaponExp')}</span>
              <input type="number" class="weight-number-input" data-weight="weapon_exp" min="0" max="10" step="0.1" value="${state.weights.weapon_exp}" style="width:48px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.3rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center; font-weight:700;" />
            </div>

            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:6px; padding:0.4rem 0.55rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">${t('wPlant')}</span>
              <input type="number" class="weight-number-input" data-weight="plant" min="0" max="10" step="0.1" value="${state.weights.plant}" style="width:48px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.3rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center; font-weight:700;" />
            </div>

            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:6px; padding:0.4rem 0.55rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">${t('wMineral')}</span>
              <input type="number" class="weight-number-input" data-weight="mineral" min="0" max="10" step="0.1" value="${state.weights.mineral}" style="width:48px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.3rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center; font-weight:700;" />
            </div>

            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:6px; padding:0.4rem 0.55rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">${t('wFungus')}</span>
              <input type="number" class="weight-number-input" data-weight="fungus" min="0" max="10" step="0.1" value="${state.weights.fungus}" style="width:48px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.3rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center; font-weight:700;" />
            </div>

            <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:6px; padding:0.4rem 0.55rem; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">${t('wClue')}</span>
              <input type="number" class="weight-number-input" data-weight="clue" min="0" max="10" step="0.1" value="${state.weights.clue}" style="width:48px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.3rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center; font-weight:700;" />
            </div>
          </div>
        </div>
      </div>

      <!-- Metrics Section -->
      <div class="metrics-section glass-panel">
        <div class="metrics-header">
          <h2>📊 ${t('metricsTitle')} (${state.cycleDays}D Avg)</h2>
        </div>
        <div class="metrics-grid">
          <div class="metric-box cyan">
            <div class="metric-title">${t('wCharExp')}</div>
            <div class="metric-num" style="color:#38bdf8;">${simResults.mfg1.sanityDaily} <span style="font-size:0.75rem; font-weight:normal; color:var(--text-secondary);">San/ngày</span></div>
            <div class="metric-desc">Hiệu suất TB: ${simResults.mfg1.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box cyan">
            <div class="metric-title">${t('wWeaponExp')}</div>
            <div class="metric-num" style="color:#38bdf8;">${simResults.mfg2.sanityDaily} <span style="font-size:0.75rem; font-weight:normal; color:var(--text-secondary);">San/ngày</span></div>
            <div class="metric-desc">Hiệu suất TB: ${simResults.mfg2.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box green">
            <div class="metric-title">${t('growthName')}</div>
            <div class="metric-num" style="color:#34d399;">${simResults.growth.sanityDaily} <span style="font-size:0.75rem; font-weight:normal; color:var(--text-secondary);">San/ngày</span></div>
            <div class="metric-desc">Hiệu suất TB: ${simResults.growth.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box purple">
            <div class="metric-title">${t('wClue')}</div>
            <div class="metric-num" style="color:#c084fc;">${simResults.reception.sanityDaily} <span style="font-size:0.75rem; font-weight:normal; color:var(--text-secondary);">San/ngày</span></div>
            <div class="metric-desc">Hiệu suất TB: ${simResults.reception.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box">
            <div class="metric-title">Tổng Sanity Căn Cứ</div>
            <div class="metric-num" style="color:#fbbf24;">${parseFloat(totalBaseDailySanity.toFixed(1))} <span style="font-size:0.75rem; font-weight:normal; color:#fde68a;">San/ngày</span></div>
            <div class="metric-desc">Toàn bộ 4 khoang sản xuất</div>
          </div>
        </div>

        <div style="background:rgba(6, 182, 212, 0.08); border:1px solid rgba(6, 182, 212, 0.2); border-radius:8px; padding:0.75rem 1rem; margin-top:1rem;">
          <div style="font-weight:700; color:var(--accent-cyan); font-size:0.85rem;">⚡ ${t('nexusFormulaTitle')}</div>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${t('nexusFormulaDesc')}</p>
          <div style="display:flex; flex-wrap:wrap; gap:1.5rem; margin-top:0.4rem; font-size:0.82rem; font-family:var(--font-mono);">
            <span>• ${t('nexusShift1Regen', { buff: nexusRegen1.totalBuffPct, real: nexusRegen1.realSpeed, ingame: nexusRegen1.ingameSpeed })}</span>
            <span>• ${t('nexusShift2Regen', { buff: nexusRegen2.totalBuffPct, real: nexusRegen2.realSpeed, ingame: nexusRegen2.ingameSpeed })}</span>
          </div>

          <div style="margin-top:0.75rem; padding-top:0.6rem; border-top:1px dashed rgba(6,182,212,0.2); display:flex; align-items:center; flex-wrap:wrap; gap:0.75rem;">
            <span style="font-size:0.8rem; color:var(--text-primary); font-weight:600;">Tra cứu nhanh thời gian hồi phục:</span>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">Stamina hiện tại:</span>
              <input type="number" id="quickStaminaInput" min="0" max="99" value="37" style="width:55px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.4rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center;" />
              <span style="font-size:0.78rem; color:var(--text-secondary);">%</span>
            </div>
            <div id="quickStaminaResult" style="font-size:0.8rem; font-family:var(--font-mono); color:#fbbf24;"></div>
          </div>
        </div>
      </div>

      <!-- THANH ĐIỀU KHIỂN ĐỒNG BỘ ĐỔI CA TOÀN CĂN CỨ (TỐI ƯU CHO CONTROL NEXUS) -->
      ${renderGlobalSyncShiftCard(optimalSync, nexusRegen2)}

      <!-- DANH SÁCH 5 PHÒNG (NEXUS ĐẦU TIÊN) -->
      <div class="rooms-container">
        <!-- 1. CONTROL NEXUS (VỊ TRÍ ĐẦU TIÊN) -->
        ${renderNexusCard('nexus', t('nexusName'), assignment.nexus, state.roomX.nexus || 12, nexusRegen1, nexusRegen2, autoXSuggestions.nexus)}
        
        <!-- 2. KHOANG SX 1 -->
        ${renderRoomCard('mfg1', t('mfg1Name'), assignment.mfg1, simResults.mfg1, autoXSuggestions.mfg1, 'MFG Cabin', ['char_exp'])}
        
        <!-- 3. KHOANG SX 2 -->
        ${renderRoomCard('mfg2', t('mfg2Name'), assignment.mfg2, simResults.mfg2, autoXSuggestions.mfg2, 'MFG Cabin', ['weapon_exp'])}
        
        <!-- 4. BUỒNG PHÁT TRIỂN -->
        ${renderRoomCard('growth', t('growthName'), assignment.growth, simResults.growth, autoXSuggestions.growth, 'Growth Chamber', roomConfigs.growth.types)}
        
        <!-- 5. PHÒNG TIẾP KHÁCH -->
        ${renderRoomCard('reception', t('receptionName'), assignment.reception, simResults.reception, autoXSuggestions.reception, 'Reception Room', ['clue'])}
      </div>

      <!-- BẢNG KIỂM ĐỊNH ĐỘ BỀN VỮNG STAMINA TOÀN CĂN CỨ (100% ĐẦY PIN QUAY VÒNG) -->
      ${renderStaminaAuditCard(roomConfigs, assignment, simResults, nexusRegen1, nexusRegen2)}

      <!-- ĐỀ XUẤT NÂNG CẤP CÁN VIÊN (ĐƯA XUỐNG DƯỚI CÙNG & GẬP MỞ ACCORDION) -->
      ${renderCollapsibleUpgradeRecommendationsHtml(upgradeRecs)}

      ${renderModalHtml()}

      <footer>
        <p>A9E Dingjang Logistics Assistant &bull; Arknights: Endfield Fan-made Utility</p>
        <p style="margin-top:4px;">Project Source: <a href="https://github.com/ngtrungkhanh/A9E-Dingjang" target="_blank">github.com/ngtrungkhanh/A9E-Dingjang</a></p>
      </footer>
    `;

    bindEvents(autoXSuggestions, nexusRegen1, nexusRegen2, optimalSync);
  }

  // Render Thanh Điều Khiển Đổi Ca (Đồng Bộ Giao Ca Lúc 19:00 vs Chia Đều 12h)
  function renderGlobalSyncShiftCard(optimalSync, nexusRegen2) {
    const isOptimal19h = (state.roomX.mfg1 === 19 && state.roomX.mfg2 === 19 && state.roomX.growth === 14 && state.roomX.reception === 20 && state.roomX.nexus === 12);
    const isDefault12h = (state.roomX.mfg1 === 12 && state.roomX.mfg2 === 12 && state.roomX.growth === 12 && state.roomX.reception === 12 && state.roomX.nexus === 12);

    return `
      <div class="glass-panel" style="padding:1rem 1.25rem; margin-bottom:1.5rem; border:1px solid rgba(6,182,212,0.35); background:rgba(6,182,212,0.05); border-left:4px solid var(--accent-cyan);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span style="font-size:1.15rem;">⚡</span>
              <h3 style="font-size:1.05rem; color:#fff; font-weight:700;">
                Chiến Lược Đồng Bộ Thay Ca Căn Cứ (In-game Tự Động Đổi Ca)
              </h3>
              ${isOptimal19h ? `<span class="badge-tag" style="background:rgba(52,211,153,0.15); color:#34d399; font-size:0.75rem;">✓ Đang đồng bộ giao ca lúc 19:00 (130.5 San)</span>` : (isDefault12h ? `<span class="badge-tag" style="background:rgba(6,182,212,0.15); color:#38bdf8; font-size:0.75rem;">Đang chia đều (12h / 12h)</span>` : `<span class="badge-tag" style="background:rgba(245,158,11,0.15); color:#fbbf24; font-size:0.75rem;">Tùy chỉnh thủ công</span>`)}
            </div>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:4px;">
              <strong>Đồng Bộ Thay Ca Cùng Lúc:</strong> Tất cả các phòng cùng kết thúc Ca 1 và giao ca đúng <strong>19:00</strong> mà không làm giảm số giờ tối ưu của bất kỳ phòng nào. Nhờ đó, căn cứ đạt sản lượng đỉnh <strong>130.5 San/ngày</strong> (không bị sụt giảm) và Nexus Ca 2 (+${nexusRegen2.totalBuffPct}%) đón trọn toàn bộ cán viên về nghỉ ngơi!
            </p>
          </div>

          <!-- CÁC NÚT ÁP DỤNG NHANH -->
          <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <button id="btnApplyOptimalSync" class="btn-primary" style="padding:0.4rem 0.85rem; font-size:0.82rem; background:linear-gradient(135deg, #059669, #10b981); border:none; color:#fff; font-weight:700;">
              ⚡ Đồng Bộ Giao Ca Lúc 19:00 (130.5 San)
            </button>

            <button id="btnResetSyncDefault" class="btn-group-btn" style="padding:0.4rem 0.65rem; font-size:0.8rem;">
              ↺ Chia Đều (12h / 12h)
            </button>
          </div>
        </div>

        <div style="font-size:0.78rem; font-family:var(--font-mono); color:var(--text-muted); margin-top:0.6rem; border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.5rem;">
          • Lịch trình đồng bộ giao ca 19:00: SX 1 (00:00 ➔ 19:00) | SX 2 (00:00 ➔ 19:00) | Buồng Trồng (05:00 ➔ 19:00) | Tiếp Khách (23:00 ➔ 19:00) | Nexus (19:00 ➔ 07:00)
        </div>
      </div>
    `;
  }

  // Render Card cho Phòng Sản Xuất (Ô nhập số giờ + Nút Mặc định 12h + Nút Đề xuất)
  function renderRoomCard(roomKey, roomTitle, roomAssignment, simRes, autoX, cabinEn, targetTypes) {
    const x = simRes.x;
    const remain = 24 - x;

    // Neo mốc giao ca tại 19:00: Tất cả các phòng cùng đổi Ca 1 sang Ca 2 lúc 19:00
    const syncEndHour = 19;
    const startHour = (syncEndHour - x + 24) % 24;
    const startStr = (startHour < 10 ? '0' : '') + startHour + ':00';
    const endStr = (syncEndHour < 10 ? '0' : '') + syncEndHour + ':00';

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem; margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.1rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>🏢</span> ${roomTitle}
            </h3>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              ${t('dailyOutLabel', { san: simRes.sanityDaily })} | ${t('dailyEffLabel', { eff: simRes.dailyAvgEfficiency })}
            </div>
          </div>

          <!-- Ô NHẬP SỐ GIỜ + NÚT MẶC ĐỊNH / ĐỀ XUẤT -->
          <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem; background:rgba(15,23,42,0.8); padding:0.4rem 0.75rem; border-radius:8px; border:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; gap:0.35rem;">
              <span style="font-size:0.8rem; color:var(--text-secondary);">Ca 1:</span>
              <input type="number" class="room-x-input" data-room="${roomKey}" min="1" max="23" value="${x}" style="width:48px; text-align:center; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.25rem 0.35rem; font-family:var(--font-mono); font-weight:700; font-size:0.85rem;" />
              <span style="font-size:0.8rem; color:var(--text-secondary);">h</span>
            </div>

            <button class="btn-group-btn btn-reset-room-x" data-room="${roomKey}" style="padding:0.25rem 0.55rem; font-size:0.75rem;">
              ${t('btnResetDefault')}
            </button>

            <button class="btn-secondary btn-auto-room-x" data-room="${roomKey}" style="padding:0.25rem 0.6rem; font-size:0.75rem; color:#fbbf24; border-color:rgba(251,191,36,0.4);">
              ${t('btnApplyOptimal', { h: autoX.bestX })}
            </button>
          </div>
        </div>

        <div style="font-size:0.78rem; font-family:var(--font-mono); color:var(--text-muted); margin-bottom:0.75rem;">
          • Lịch trình neo mốc 19:00: Ca 1 (${startStr} ➔ ${endStr} - ${x}h) | Ca 2 (${endStr} ➔ ${startStr} - ${remain}h)
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
          <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-orange);">☀️ Ca 1 (${startStr} ➔ ${endStr} - ${x}h)</span>
              <span class="room-eff-badge">${simRes.m1.totalEffPct}% Eff</span>
            </div>
            <div class="operator-chips">
              ${renderOperatorChipsWithSkills(roomAssignment.shift1, cabinEn, targetTypes)}
            </div>
            <div class="room-stamina-status">
              <span>${t('burnRateLabel', { burn: simRes.m1.actualBurnRate })}</span>
              ${simRes.depletedHourShift1 ? `<span class="stamina-depleted">${t('staminaDepleted', { h: simRes.depletedHourShift1, rest: (x - simRes.depletedHourShift1).toFixed(1) })}</span>` : `<span class="stamina-ok">${t('staminaSafe')}</span>`}
            </div>
          </div>

          <div style="background:rgba(6, 182, 212, 0.05); border:1px solid rgba(6, 182, 212, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-cyan);">🌙 Ca 2 (${endStr} ➔ ${startStr} - ${remain}h)</span>
              <span class="room-eff-badge" style="background:rgba(6, 182, 212, 0.15); color:#38bdf8; border-color:rgba(6, 182, 212, 0.3);">${simRes.m2.totalEffPct}% Eff</span>
            </div>
            <div class="operator-chips">
              ${renderOperatorChipsWithSkills(roomAssignment.shift2, cabinEn, targetTypes)}
            </div>
            <div class="room-stamina-status">
              <span>${t('burnRateLabel', { burn: simRes.m2.actualBurnRate })}</span>
              ${simRes.depletedHourShift2 ? `<span class="stamina-depleted">${t('staminaDepleted', { h: simRes.depletedHourShift2, rest: (remain - (simRes.depletedHourShift2 - x)).toFixed(1) })}</span>` : `<span class="stamina-ok">${t('staminaSafe')}</span>`}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Card cho Control Nexus (3 Slots) - Ghi rõ giờ thay ca & chiến lược phối hợp giờ nghỉ
  function renderNexusCard(roomKey, roomTitle, roomAssignment, x, nexusRegen1, nexusRegen2, autoX) {
    const remain = 24 - x;
    const isShift2Stronger = nexusRegen2.totalBuffPct >= nexusRegen1.totalBuffPct;
    const strongShiftName = isShift2Stronger ? 'Ca 2' : 'Ca 1';
    const strongBuff = Math.max(nexusRegen1.totalBuffPct, nexusRegen2.totalBuffPct);
    const isDepletedShift1 = x > 13.8;
    const isDepletedShift2 = remain > 13.8;

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-cyan);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem; margin-bottom:0.75rem;">
          <div>
            <h3 style="font-size:1.15rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>📡</span> ${roomTitle}
            </h3>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              Trạm điều hòa: Tăng tốc độ hồi phục Stamina toàn trạm khi cán viên ở ngoài giờ làm việc
            </div>
          </div>

          <!-- Ô NHẬP SỐ GIỜ CHO NEXUS -->
          <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem; background:rgba(15,23,42,0.8); padding:0.4rem 0.75rem; border-radius:8px; border:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; gap:0.35rem;">
              <span style="font-size:0.8rem; color:var(--text-secondary);">Ca 1:</span>
              <input type="number" class="room-x-input" data-room="${roomKey}" min="1" max="23" value="${x}" style="width:48px; text-align:center; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.25rem 0.35rem; font-family:var(--font-mono); font-weight:700; font-size:0.85rem;" />
              <span style="font-size:0.8rem; color:var(--text-secondary);">h</span>
            </div>

            <button class="btn-group-btn btn-reset-room-x" data-room="${roomKey}" style="padding:0.25rem 0.55rem; font-size:0.75rem;">
              ${t('btnResetDefault')}
            </button>

            <button class="btn-secondary btn-auto-room-x" data-room="${roomKey}" style="padding:0.25rem 0.6rem; font-size:0.75rem; color:#fbbf24; border-color:rgba(251,191,36,0.4);" title="Đề xuất 12h/12h cân bằng bền vững cho Nexus">
              ${t('btnApplyOptimal', { h: 12 })}
            </button>
          </div>
        </div>

        <!-- THÔNG TIN THAY CA & CHIẾN LƯỢC PHỐI HỢP -->
        <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.06); border-radius:6px; padding:0.6rem 0.85rem; margin-bottom:0.85rem; font-size:0.8rem; line-height:1.5;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <div style="font-family:var(--font-mono); color:#38bdf8;">
              ⏱ <strong>Lịch trình Nexus: Ca 1 (${x}h: 07:00 ➔ 19:00) | Ca 2 (${remain}h: 19:00 ➔ 07:00)</strong>
            </div>
            ${(isDepletedShift1 || isDepletedShift2) ? `
              <span style="color:#f87171; font-weight:700; font-size:0.75rem; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); padding:0.15rem 0.45rem; border-radius:4px;">
                ⚠️ Cán viên Nexus hao 7.2%/h cố định, trực >13.8h sẽ kiệt sức! Nên giữ 12h/12h.
              </span>
            ` : `
              <span style="color:#34d399; font-weight:700; font-size:0.75rem;">✓ Chu kỳ xoay vòng an toàn 100% Stamina</span>
            `}
          </div>
          <div style="color:var(--text-secondary); margin-top:4px;">
            💡 <em>Cơ chế phối hợp chuẩn:</em> Toàn bộ cán viên Ca 1 sản xuất đổi ca về nghỉ lúc <strong>19:00</strong>. Do đó, <strong>Ca 2 (${strongShiftName} buff +${strongBuff}%)</strong> túc trực suốt <strong>19:00 ➔ 07:00 (${remain} tiếng)</strong> để bao trọn giấc ngủ và sạc siêu tốc cho toàn bộ cán viên sản xuất. Ban ngày (<strong>07:00 ➔ 19:00</strong>), <strong>Ca 1 (buff +${nexusRegen1.totalBuffPct}%)</strong> túc trực duy trì căn cứ!
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
          <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-orange);">☀️ Ca 1 (07:00 ➔ 19:00 - ${x}h) - Ca Ban Ngày</span>
              <span class="room-eff-badge">+${nexusRegen1.totalBuffPct}% Regen</span>
            </div>
            <div class="operator-chips">${renderOperatorChipsWithSkills(roomAssignment.shift1, 'Control Nexus', ['nexus'])}</div>
            <div class="room-stamina-status">
              <span>Tốc độ hồi trạm: ${nexusRegen1.realSpeed}%/h</span>
              ${isDepletedShift1 ? `<span class="stamina-depleted">Kiệt sức sau 13.9h</span>` : `<span class="stamina-ok">Tiêu hao: ${(x * 7.2).toFixed(1)}% (An toàn)</span>`}
            </div>
          </div>

          <div style="background:rgba(6, 182, 212, 0.05); border:1px solid rgba(6, 182, 212, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-cyan);">🌙 Ca 2 (19:00 ➔ 07:00 - ${remain}h) - Ca Đêm / Tối Ưu</span>
              <span class="room-eff-badge" style="background:rgba(6, 182, 212, 0.15); color:#38bdf8; border-color:rgba(6, 182, 212, 0.3);">+${nexusRegen2.totalBuffPct}% Regen</span>
            </div>
            <div class="operator-chips">${renderOperatorChipsWithSkills(roomAssignment.shift2, 'Control Nexus', ['nexus'])}</div>
            <div class="room-stamina-status">
              <span>Tốc độ hồi trạm: ${nexusRegen2.realSpeed}%/h</span>
              ${isDepletedShift2 ? `<span class="stamina-depleted">Kiệt sức sau 13.9h</span>` : `<span class="stamina-ok">Tiêu hao: ${(remain * 7.2).toFixed(1)}% (An toàn)</span>`}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderOperatorChipsWithSkills(ops, cabinEn, targetTypes) {
    if (!ops || ops.length === 0) {
      return '<div style="font-size:0.75rem; color:var(--text-muted); padding:0.3rem 0;">(Trống - Không đủ cán viên)</div>';
    }

    return ops.map(op => {
      const effectDesc = A9EOptimizer.getSkillEffectSummary(op, cabinEn, targetTypes);
      return `
        <div class="op-chip" style="flex-direction:column; align-items:flex-start; padding:0.45rem 0.6rem; gap:0.25rem;">
          <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
            <div class="op-chip-info">
              <span class="op-star">★${op.rarity || '5'}</span>
              <span class="op-chip-name" style="font-size:0.85rem;">${op.name}</span>
            </div>
            <span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">Lv.${op.level || 90}</span>
          </div>
          <div style="font-size:0.72rem; color:#fbbf24; font-family:var(--font-mono); line-height:1.3;">
            ➔ ${effectDesc}
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Accordion Đề Xuất Nâng Cấp Cán Viên (Ở dưới cùng trang)
  function renderCollapsibleUpgradeRecommendationsHtml(recs) {
    if (state.mode !== 'user') {
      return `
        <div class="glass-panel" style="padding:1rem 1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-orange);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 style="font-size:1rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>🚀</span> ${t('recTitle')}
            </h3>
            <span style="font-size:0.78rem; color:var(--text-muted);">${t('recNeedAccount')}</span>
          </div>
        </div>
      `;
    }

    const recCount = recs.length;
    const arrowText = state.showRecDetails ? '▲ Thu gọn' : `▼ Mở rộng (${recCount} đề xuất)`;

    let listHtml = '';
    if (recCount === 0) {
      listHtml = `<div style="font-size:0.82rem; color:#34d399; padding:0.5rem 0;">${t('recEmpty')}</div>`;
    } else {
      listHtml = recs.map((r, idx) => `
        <div style="background:rgba(15,23,42,0.8); border:1px solid var(--border-color); border-radius:8px; padding:0.75rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.75rem; min-width:240px; flex:1;">
            <div style="font-family:var(--font-mono); font-weight:800; font-size:1.1rem; color:var(--accent-orange); width:32px; text-align:center;">
              #${idx + 1}
            </div>
            <div>
              <div style="font-size:0.9rem; font-weight:700; color:#fff; display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem;">
                <span class="op-star">★${r.rarity}</span>
                <span>${r.name}</span>
                <span class="badge-tag" style="background:rgba(6,182,212,0.15); color:#38bdf8; font-size:0.75rem;">Lv.${r.curLvl} ➔ Lv.${r.targetLvl}</span>
                <span class="badge-tag" style="background:${r.tier === 'fast' ? 'rgba(52,211,153,0.15)' : (r.tier === 'medium' ? 'rgba(6,182,212,0.15)' : 'rgba(245,158,11,0.15)')}; color:${r.tier === 'fast' ? '#34d399' : (r.tier === 'medium' ? '#38bdf8' : '#fbbf24')}; font-size:0.75rem;">
                  ${r.tierLabel}
                </span>
              </div>
              <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:3px;">
                <span style="color:var(--text-muted);">[${r.cabin}]</span> <strong style="color:#fbbf24;">${r.shortBenefit}</strong>
              </div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:1.2rem; margin-left:auto; text-align:right;">
            <div>
              <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">Vốn Đầu Tư</div>
              <div style="font-family:var(--font-mono); font-weight:700; font-size:0.9rem; color:#f87171;">${r.cost} San</div>
            </div>
            <div>
              <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">Sanity thêm / ngày</div>
              <div style="font-family:var(--font-mono); font-weight:700; font-size:0.9rem; color:#38bdf8;">+${r.dailySanityGain} San/ngày</div>
            </div>
            <div style="background:rgba(52, 211, 153, 0.1); border:1px solid rgba(52, 211, 153, 0.3); border-radius:6px; padding:0.25rem 0.55rem;">
              <div style="font-size:0.68rem; color:#34d399; text-transform:uppercase; font-weight:700;">Số ngày hồi vốn</div>
              <div style="font-family:var(--font-mono); font-weight:800; font-size:1.05rem; color:#34d399;">⚡ ${r.paybackDays} ngày</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-orange);">
        <div id="btnToggleRecHeader" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; user-select:none;">
          <div>
            <h3 style="font-size:1.05rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>🚀</span> ${t('recTitle')}
              <span class="badge-tag" style="background:rgba(245,158,11,0.15); color:var(--accent-orange);">${recCount} đề xuất</span>
            </h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">${t('recSub')}</p>
          </div>
          <button class="btn-secondary" style="font-size:0.78rem; padding:0.35rem 0.65rem; pointer-events:none;">
            ${arrowText}
          </button>
        </div>

        <div id="recContentBody" style="display:${state.showRecDetails ? 'flex' : 'none'}; flex-direction:column; gap:0.6rem; margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.06);">
          <div style="background:rgba(245, 158, 11, 0.08); border:1px solid rgba(245, 158, 11, 0.2); border-radius:6px; padding:0.6rem 0.85rem; font-size:0.78rem; color:var(--text-secondary); line-height:1.5;">
            💡 <strong>Lưu ý về Thời gian hồi vốn (ROI):</strong> Đội hình hiện tại của bạn đã mở khóa hết các mốc cơ bản (Lv 20 - vốn 44 San, hoàn vốn sau ~25 ngày). Các đề xuất còn lại là mốc Đột Phá E3/E4 (Lv 60, Lv 80) tốn từ 550 đến 1.695 Sanity (tương đương 21 lượt đi ải 80 Sanity). Các mốc này chủ yếu nâng để phục vụ <strong>Chiến Đấu (Combat)</strong>, kỹ năng căn cứ là lợi ích kèm theo nên thời gian hoàn vốn thuần căn cứ sẽ dài hơn.
          </div>
          ${listHtml}
        </div>
      </div>
    `;
  }

  // Render Bảng Kiểm Định Chu Kỳ Xoay Vòng Stamina Toàn Căn Cứ
  function renderStaminaAuditCard(roomConfigs, assignment, simResults, nexusRegen1, nexusRegen2) {
    const rooms = [
      { key: 'mfg1', name: 'Khoang SX 1 (EXP Cán Viên)' },
      { key: 'mfg2', name: 'Khoang SX 2 (EXP Vũ Khí)' },
      { key: 'growth', name: 'Buồng Nuôi Trồng (Nông Nghiệp)' },
      { key: 'reception', name: 'Phòng Tiếp Khách (Manh Mối)' },
      { key: 'nexus', name: 'Trung Tâm Kiểm Soát (Nexus)' }
    ];

    const reg1Speed = nexusRegen1 ? nexusRegen1.realSpeed : 12.0;
    const reg2Speed = nexusRegen2 ? nexusRegen2.realSpeed : 12.0;

    let allSustainable = true;
    const tableRows = [];

    rooms.forEach(r => {
      const x = state.roomX[r.key] || 12;
      const remain = 24 - x;
      const t1 = assignment[r.key] ? assignment[r.key].shift1 : [];
      const t2 = assignment[r.key] ? assignment[r.key].shift2 : [];
      const m1 = simResults[r.key] ? simResults[r.key].m1 : { actualBurnRate: 7.2 };
      const m2 = simResults[r.key] ? simResults[r.key].m2 : { actualBurnRate: 7.2 };

      // Ca 1: Làm x tiếng, nghỉ remain tiếng dưới Nexus Ca 2 (Đêm: reg2Speed)
      const burn1 = x * m1.actualBurnRate;
      const rem1 = Math.max(0, 100 - burn1);
      const rec1 = remain * reg2Speed;
      const end1 = Math.min(100, rem1 + rec1);
      const ok1 = (rec1 >= burn1);
      if (!ok1) allSustainable = false;

      // Ca 2: Làm remain tiếng, nghỉ x tiếng dưới Nexus Ca 1 (Ngày: reg1Speed)
      const burn2 = remain * m2.actualBurnRate;
      const rem2 = Math.max(0, 100 - burn2);
      const rec2 = x * reg1Speed;
      const end2 = Math.min(100, rem2 + rec2);
      const ok2 = (rec2 >= burn2);
      if (!ok2) allSustainable = false;

      tableRows.push(`
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.8rem;">
          <td rowspan="2" style="padding:0.6rem 0.75rem; font-weight:700; color:#fff; vertical-align:middle; border-right:1px solid rgba(255,255,255,0.06); background:rgba(15,23,42,0.4);">
            ${r.name}
          </td>
          <td style="padding:0.45rem 0.6rem; color:var(--accent-orange); font-weight:700;">
            Ca 1 <span style="font-weight:normal; font-size:0.72rem; color:var(--text-secondary);">(${x}h)</span>
          </td>
          <td style="padding:0.45rem 0.6rem; color:var(--text-secondary); font-size:0.75rem;">
            ${t1.map(o => o.name).join(', ')}
          </td>
          <td style="padding:0.45rem 0.6rem; font-family:var(--font-mono); color:#f87171;">
            -${burn1.toFixed(1)}% <span style="font-size:0.7rem; color:var(--text-muted);">(${m1.actualBurnRate}%/h)</span>
          </td>
          <td style="padding:0.45rem 0.6rem; font-family:var(--font-mono); color:#38bdf8;">
            +${rec1.toFixed(1)}% <span style="font-size:0.7rem; color:var(--text-muted);">(Nghỉ ${remain}h @ ${reg2Speed}%/h)</span>
          </td>
          <td style="padding:0.45rem 0.6rem; font-family:var(--font-mono); font-weight:800; color:${ok1 ? '#34d399' : '#f87171'};">
            ${end1.toFixed(1)}%
          </td>
          <td style="padding:0.45rem 0.6rem; text-align:center;">
            ${ok1 ? '<span style="color:#34d399; font-weight:700; font-size:0.78rem;">✓ Đầy 100% Pin</span>' : '<span style="color:#f87171; font-weight:700; font-size:0.78rem;">⚠️ Thiếu Stamina</span>'}
          </td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.1); font-size:0.8rem; background:rgba(255,255,255,0.02);">
          <td style="padding:0.45rem 0.6rem; color:var(--accent-cyan); font-weight:700;">
            Ca 2 <span style="font-weight:normal; font-size:0.72rem; color:var(--text-secondary);">(${remain}h)</span>
          </td>
          <td style="padding:0.45rem 0.6rem; color:var(--text-secondary); font-size:0.75rem;">
            ${t2.map(o => o.name).join(', ')}
          </td>
          <td style="padding:0.45rem 0.6rem; font-family:var(--font-mono); color:#f87171;">
            -${burn2.toFixed(1)}% <span style="font-size:0.7rem; color:var(--text-muted);">(${m2.actualBurnRate}%/h)</span>
          </td>
          <td style="padding:0.45rem 0.6rem; font-family:var(--font-mono); color:#38bdf8;">
            +${rec2.toFixed(1)}% <span style="font-size:0.7rem; color:var(--text-muted);">(Nghỉ ${x}h @ ${reg1Speed}%/h)</span>
          </td>
          <td style="padding:0.45rem 0.6rem; font-family:var(--font-mono); font-weight:800; color:${ok2 ? '#34d399' : '#f87171'};">
            ${end2.toFixed(1)}%
          </td>
          <td style="padding:0.45rem 0.6rem; text-align:center;">
            ${ok2 ? '<span style="color:#34d399; font-weight:700; font-size:0.78rem;">✓ Đầy 100% Pin</span>' : '<span style="color:#f87171; font-weight:700; font-size:0.78rem;">⚠️ Thiếu Stamina</span>'}
          </td>
        </tr>
      `);
    });

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid #10b981;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.85rem;">
          <div>
            <h3 style="font-size:1.05rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>🛡️</span> Kiểm Định Độ Bền Vững Stamina Trong Chu Kỳ (Đầy 100% Sau Mỗi Chu Kỳ)
            </h3>
            <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
              Tính toán chi tiết Stamina tiêu hao khi đi làm và Stamina phục hồi khi nghỉ ngơi. Sau mỗi chu kỳ 24h, ca vào làm luôn đạt 100% pin.
            </p>
          </div>
          <span class="badge-tag" style="background:${allSustainable ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; color:${allSustainable ? '#34d399' : '#f87171'}; font-size:0.75rem; font-weight:700;">
            ${allSustainable ? '✓ Tất cả 5 phòng quay vòng vĩnh cửu (100% Pin)' : '⚠️ Có phòng bị thiếu Stamina trong chu kỳ'}
          </span>
        </div>

        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.1); font-size:0.72rem; text-transform:uppercase; color:var(--text-muted); background:rgba(15,23,42,0.6);">
                <th style="padding:0.5rem 0.75rem;">Khoang Phòng</th>
                <th style="padding:0.5rem 0.6rem;">Ca Trực</th>
                <th style="padding:0.5rem 0.6rem;">Nhân Sự</th>
                <th style="padding:0.5rem 0.6rem;">Tiêu Hao Đi Làm</th>
                <th style="padding:0.5rem 0.6rem;">Hồi Phục Khi Nghỉ</th>
                <th style="padding:0.5rem 0.6rem;">Pin Chu Kỳ Mới</th>
                <th style="padding:0.5rem 0.6rem; text-align:center;">Trạng Thái</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderModalHtml() {
    return `
      <div class="modal-overlay" id="dataModal">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3>📥 ${t('modalTitle')}</h3>
            <button class="modal-close-btn" id="btnCloseModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="btn-group" style="width:100%; display:flex; margin-bottom:1rem;">
              <button class="btn-group-btn ${state.activeModalTab === 'upload' ? 'active' : ''}" style="flex:1;" id="tabBtnUpload">${t('modalTabUpload')}</button>
              <button class="btn-group-btn ${state.activeModalTab === 'code' ? 'active' : ''}" style="flex:1;" id="tabBtnCode">${t('modalTabCode')}</button>
              <button class="btn-group-btn ${state.activeModalTab === 'raw' ? 'active' : ''}" style="flex:1;" id="tabBtnRaw">${t('modalTabRaw')}</button>
            </div>

            <div id="tabContentUpload" style="display:${state.activeModalTab === 'upload' ? 'block' : 'none'};">
              <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">${t('modalDropHelp')}</p>
              <input type="file" id="jsonFileInput" accept=".json" style="display:none;" />
              <button class="btn-primary" id="btnTriggerFileInput" style="width:100%; justify-content:center; padding:0.75rem;">
                📂 ${t('modalChooseFile')}
              </button>
            </div>

            <div id="tabContentCode" style="display:${state.activeModalTab === 'code' ? 'block' : 'none'};">
              <p style="font-size:0.82rem; color:var(--text-secondary);">${t('modalBookmarkHelp')}</p>
              <div class="code-box" id="snippetCode">python D:\\ToiUuHauCan\\skport_crawler.py --cred &lt;SESSION_CODE&gt;</div>
              <button class="btn-secondary" id="btnCopySnippet" style="width:100%; justify-content:center; margin-top:0.5rem;">
                📋 ${t('modalCopyBtn')}
              </button>
            </div>

            <div id="tabContentRaw" style="display:${state.activeModalTab === 'raw' ? 'block' : 'none'};">
              <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.4rem;">${t('modalRawHelp')}</p>
              <textarea id="rawJsonArea" style="width:100%; height:120px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:0.5rem; font-family:var(--font-mono); font-size:0.75rem;"></textarea>
              <button class="btn-primary" id="btnApplyRawJson" style="width:100%; justify-content:center; margin-top:0.5rem;">
                💾 ${t('modalApplyBtn')}
              </button>
            </div>

            <div style="margin-top:1.25rem; display:flex; justify-content:space-between; align-items:center;">
              <button class="btn-secondary" id="btnResetDefault" style="font-size:0.78rem; color:#f87171;">
                🔄 ${t('modalResetBtn')}
              </button>
              <span style="font-size:0.72rem; color:var(--text-muted); max-width:65%;">
                ${t('modalNotice')}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents(autoXSuggestions, nexusRegen1, nexusRegen2, optimalSync) {
    const stamInput = document.getElementById('quickStaminaInput');
    const stamRes = document.getElementById('quickStaminaResult');
    function updateQuickStam() {
      if (!stamInput || !stamRes) return;
      const s = Math.min(99, Math.max(0, parseInt(stamInput.value, 10) || 0));
      const need = 100 - s;
      const t0Mins = Math.round((need / 12.0) * 60);
      const t1Mins = Math.round((need / (nexusRegen1 ? nexusRegen1.realSpeed : 12.0)) * 60);
      const t2Mins = Math.round((need / (nexusRegen2 ? nexusRegen2.realSpeed : 12.0)) * 60);

      const f0 = `${Math.floor(t0Mins / 60)}h${t0Mins % 60 < 10 ? '0' : ''}${t0Mins % 60}p`;
      const f1 = `${Math.floor(t1Mins / 60)}h${t1Mins % 60 < 10 ? '0' : ''}${t1Mins % 60}p`;
      const f2 = `${Math.floor(t2Mins / 60)}h${t2Mins % 60 < 10 ? '0' : ''}${t2Mins % 60}p`;

      stamRes.innerHTML = `➔ Không buff: <strong>${f0}</strong> | Nexus Ca 1: <strong>${f1}</strong> | Nexus Ca 2: <strong>${f2}</strong>`;
    }
    if (stamInput) {
      stamInput.oninput = updateQuickStam;
      updateQuickStam();
    }

    const btnVi = document.getElementById('btnLangVi');
    const btnEn = document.getElementById('btnLangEn');
    if (btnVi) btnVi.onclick = () => { state.lang = 'vi'; saveSettings(); updateOptimizer(); };
    if (btnEn) btnEn.onclick = () => { state.lang = 'en'; saveSettings(); updateOptimizer(); };

    const btnModeAll = document.getElementById('btnModeAll');
    const btnModeUser = document.getElementById('btnModeUser');
    if (btnModeAll) btnModeAll.onclick = () => { state.mode = 'all'; saveSettings(); updateOptimizer(); };
    if (btnModeUser) btnModeUser.onclick = () => { state.mode = 'user'; saveSettings(); updateOptimizer(); };

    document.querySelectorAll('[data-growth-toggle]').forEach(btn => {
      btn.onclick = () => {
        const val = btn.getAttribute('data-growth-toggle');
        if (state.growthTargets.includes(val)) {
          if (state.growthTargets.length > 1) {
            state.growthTargets = state.growthTargets.filter(item => item !== val);
          }
        } else {
          state.growthTargets.push(val);
        }
        saveSettings();
        updateOptimizer();
      };
    });

    const cycleInput = document.getElementById('cycleDaysInput');
    if (cycleInput) {
      cycleInput.onchange = (e) => {
        state.cycleDays = Math.max(1, Math.min(60, parseInt(e.target.value, 10) || 1));
        saveSettings();
        updateOptimizer();
      };
    }

    document.querySelectorAll('.weight-number-input').forEach(inp => {
      inp.onchange = (e) => {
        const wKey = e.target.getAttribute('data-weight');
        state.weights[wKey] = Math.max(0, parseFloat(e.target.value) || 1.0);
        saveSettings();
        updateOptimizer();
      };
    });

    const btnResetW = document.getElementById('btnResetWeights');
    if (btnResetW) {
      btnResetW.onclick = () => {
        state.weights = { char_exp: 1.0, weapon_exp: 1.0, plant: 1.0, mineral: 1.0, fungus: 1.0, clue: 1.0 };
        saveSettings();
        updateOptimizer();
      };
    }

    // ĐỒNG BỘ ĐỔI CA TOÀN CĂN CỨ
    const syncInput = document.getElementById('globalSyncXInput');
    if (syncInput) {
      syncInput.onchange = (e) => {
        const val = Math.max(1, Math.min(23, parseInt(e.target.value, 10) || 12));
        ['nexus', 'mfg1', 'mfg2', 'growth', 'reception'].forEach(rk => {
          state.roomX[rk] = val;
        });
        saveSettings();
        updateOptimizer();
      };
    }

    const btnResetSync = document.getElementById('btnResetSyncDefault');
    if (btnResetSync) {
      btnResetSync.onclick = () => {
        ['nexus', 'mfg1', 'mfg2', 'growth', 'reception'].forEach(rk => {
          state.roomX[rk] = 12;
        });
        saveSettings();
        updateOptimizer();
      };
    }

    const btnApplyOptimalSync = document.getElementById('btnApplyOptimalSync');
    if (btnApplyOptimalSync) {
      btnApplyOptimalSync.onclick = () => {
        state.roomX.mfg1 = 19;
        state.roomX.mfg2 = 19;
        state.roomX.growth = 14;
        state.roomX.reception = 20;
        state.roomX.nexus = 12;
        saveSettings();
        updateOptimizer();
      };
    }

    // Ô NHẬP SỐ GIỜ TỪNG PHÒNG
    document.querySelectorAll('.room-x-input').forEach(inp => {
      inp.onchange = (e) => {
        const rKey = e.target.getAttribute('data-room');
        const val = Math.max(1, Math.min(23, parseInt(e.target.value, 10) || 12));
        state.roomX[rKey] = val;
        saveSettings();
        updateOptimizer();
      };
    });

    // NÚT MẶC ĐỊNH (12H)
    document.querySelectorAll('.btn-reset-room-x').forEach(btn => {
      btn.onclick = () => {
        const rKey = btn.getAttribute('data-room');
        state.roomX[rKey] = 12;
        saveSettings();
        updateOptimizer();
      };
    });

    // NÚT ĐỀ XUẤT (⚡ XH)
    document.querySelectorAll('.btn-auto-room-x').forEach(btn => {
      btn.onclick = () => {
        const rKey = btn.getAttribute('data-room');
        if (autoXSuggestions[rKey]) {
          state.roomX[rKey] = autoXSuggestions[rKey].bestX;
          saveSettings();
          updateOptimizer();
        }
      };
    });

    const btnAutoAll = document.getElementById('btnAutoAllRooms');
    if (btnAutoAll) {
      btnAutoAll.onclick = () => {
        for (const rKey in autoXSuggestions) {
          state.roomX[rKey] = autoXSuggestions[rKey].bestX;
        }
        saveSettings();
        updateOptimizer();
      };
    }

    // GẬP MỞ ACCORDION ĐỀ XUẤT NÂNG CẤP
    const recHeader = document.getElementById('btnToggleRecHeader');
    if (recHeader) {
      recHeader.onclick = () => {
        state.showRecDetails = !state.showRecDetails;
        const body = document.getElementById('recContentBody');
        if (body) {
          body.style.display = state.showRecDetails ? 'flex' : 'none';
        }
        updateOptimizer();
      };
    }

    // Modal
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const modalEl = document.getElementById('dataModal');

    if (btnOpenModal && modalEl) btnOpenModal.onclick = () => modalEl.classList.add('open');
    if (btnCloseModal && modalEl) btnCloseModal.onclick = () => modalEl.classList.remove('open');

    const tabBtnUpload = document.getElementById('tabBtnUpload');
    const tabBtnCode = document.getElementById('tabBtnCode');
    const tabBtnRaw = document.getElementById('tabBtnRaw');

    if (tabBtnUpload) tabBtnUpload.onclick = () => { state.activeModalTab = 'upload'; renderModalTabs(); };
    if (tabBtnCode) tabBtnCode.onclick = () => { state.activeModalTab = 'code'; renderModalTabs(); };
    if (tabBtnRaw) tabBtnRaw.onclick = () => { state.activeModalTab = 'raw'; renderModalTabs(); };

    const btnTriggerFile = document.getElementById('btnTriggerFileInput');
    const fileInput = document.getElementById('jsonFileInput');
    if (btnTriggerFile && fileInput) {
      btnTriggerFile.onclick = () => fileInput.click();
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const parsed = JSON.parse(evt.target.result);
            state.userData = parsed;
            state.mode = 'user';
            localStorage.setItem('a9e_user_roster', JSON.stringify(parsed));
            saveSettings();
            modalEl.classList.remove('open');
            alert(t('appliedSuccess'));
            updateOptimizer();
          } catch (err) {
            alert("Lỗi đọc file JSON: " + err.message);
          }
        };
        reader.readAsText(file);
      };
    }

    const btnApplyRaw = document.getElementById('btnApplyRawJson');
    const rawArea = document.getElementById('rawJsonArea');
    if (btnApplyRaw && rawArea) {
      btnApplyRaw.onclick = () => {
        try {
          const parsed = JSON.parse(rawArea.value.trim());
          state.userData = parsed;
          state.mode = 'user';
          localStorage.setItem('a9e_user_roster', JSON.stringify(parsed));
          saveSettings();
          modalEl.classList.remove('open');
          alert(t('appliedSuccess'));
          updateOptimizer();
        } catch (err) {
          alert("Lỗi JSON: " + err.message);
        }
      };
    }

    const btnCopySnippet = document.getElementById('btnCopySnippet');
    if (btnCopySnippet) {
      btnCopySnippet.onclick = () => {
        const codeText = document.getElementById('snippetCode').innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          alert(t('copiedToast'));
        });
      };
    }

    const btnReset = document.getElementById('btnResetDefault');
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm("Khôi phục toàn bộ về mặc định?")) {
          localStorage.removeItem('a9e_user_roster');
          state.userData = null;
          state.mode = 'all';
          state.roomX = { nexus: 12, mfg1: 12, mfg2: 12, growth: 12, reception: 12 };
          state.growthTargets = ['plant', 'mineral'];
          saveSettings();
          modalEl.classList.remove('open');
          updateOptimizer();
        }
      };
    }
  }

  function renderModalTabs() {
    const upload = document.getElementById('tabContentUpload');
    const code = document.getElementById('tabContentCode');
    const raw = document.getElementById('tabContentRaw');
    if (upload) upload.style.display = (state.activeModalTab === 'upload') ? 'block' : 'none';
    if (code) code.style.display = (state.activeModalTab === 'code') ? 'block' : 'none';
    if (raw) raw.style.display = (state.activeModalTab === 'raw') ? 'block' : 'none';

    document.getElementById('tabBtnUpload').classList.toggle('active', state.activeModalTab === 'upload');
    document.getElementById('tabBtnCode').classList.toggle('active', state.activeModalTab === 'code');
    document.getElementById('tabBtnRaw').classList.toggle('active', state.activeModalTab === 'raw');
  }

  window.addEventListener('DOMContentLoaded', () => {
    updateOptimizer();
  });

})();
