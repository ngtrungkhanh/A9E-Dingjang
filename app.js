/**
 * A9E Dingjang Logistics Optimizer - Frontend Controller (v2.1)
 * Author: Antigravity
 * Nexus 3 slots, Nút bấm chọn giờ, Đề xuất nâng cấp ROI, Chi tiết kỹ năng từng cán viên
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
      wPlant: "Cây Trồng Hóa Đá (Nông nghiệp)",
      wMineral: "Khoáng Sản Quý Hiếm",
      wFungus: "Vật Chất Nấm",
      wClue: "Tốc Độ Manh Mối",
      growthTargetTitle: "Mặt hàng Buồng Phát Triển (Có thể chọn 1, 2 hoặc cả 3 loại)",
      plantTarget: "Cây Trồng Hóa Đá",
      mineralTarget: "Khoáng Sản Quý Hiếm",
      fungusTarget: "Vật Chất Nấm",
      cycleTitle: "Chu kỳ mô phỏng bền vững (Nhập số ngày)",
      cycleDaysLabel: "ngày",
      btnAutoAllX: "⚡ Tự Động Tối Ưu Phân Ca Cho Tất Cả Phòng",
      metricsTitle: "Sản Lượng Trung Bình Hàng Ngày Toàn Căn Cứ",
      metricDailyOut: "TỔNG SẢN LƯỢNG QUY ĐỔI / NGÀY",
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
      dailyOutLabel: "Sản lượng TB/ngày: <strong>{out}</strong>",
      dailyEffLabel: "Hiệu suất TB/ngày: <strong>{eff}%</strong>",
      nexusFormulaTitle: "Cơ Chế Phục Hồi Stamina Khi Nghỉ Ngơi (Control Nexus):",
      nexusFormulaDesc: "Mặc định không có ai: 12%/giờ (đúng 5 phút / 1% Stamina). Tốc độ hồi thực tế = 12% × (1 + Tổng % buff Nexus).",
      nexusShift1Regen: "Ca 1 buff +{buff}% ➔ Tốc độ hồi: {real}%/h (Ingame hiển thị: {ingame}%/h)",
      nexusShift2Regen: "Ca 2 buff +{buff}% ➔ Tốc độ hồi: {real}%/h (Ingame hiển thị: {ingame}%/h)",
      recTitle: "🚀 Đề Xuất Nâng Cấp Cán Viên Mở Thêm Skill (Xếp Theo ROI / Chi Phí Vốn)",
      recSub: "Tiền vốn tính theo mốc level: 1-10=1, 11-20=2, 20-30=4, 30-40=8, 40-60=16, 60-80=32",
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
      wPlant: "Petrified Plants (Agriculture)",
      wMineral: "Rare Minerals",
      wFungus: "Fungus Materials",
      wClue: "Clue Gathering Speed",
      growthTargetTitle: "Growth Chamber Products (Select 1, 2 or all 3)",
      plantTarget: "Petrified Plants",
      mineralTarget: "Rare Minerals",
      fungusTarget: "Fungus Materials",
      cycleTitle: "Simulation Cycle (Enter Days)",
      cycleDaysLabel: "days",
      btnAutoAllX: "⚡ Auto-Optimize Shift Hours for All Rooms",
      metricsTitle: "Daily Base-Wide Average Production",
      metricDailyOut: "DAILY TOTAL OUTPUT",
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
      dailyOutLabel: "Daily Avg Out: <strong>{out}</strong>",
      dailyEffLabel: "Daily Avg Eff: <strong>{eff}%</strong>",
      nexusFormulaTitle: "Stamina Recovery Mechanism When Idle (Control Nexus):",
      nexusFormulaDesc: "Base rest speed: 12%/h (exactly 5 mins / 1% Stamina). Actual regen speed = 12% × (1 + sum of Nexus buffs).",
      nexusShift1Regen: "Shift 1 buff +{buff}% ➔ Regen speed: {real}%/h (Ingame: {ingame}%/h)",
      nexusShift2Regen: "Shift 2 buff +{buff}% ➔ Regen speed: {real}%/h (Ingame: {ingame}%/h)",
      recTitle: "🚀 Operator Level Up Recommendations (Ranked by Cost-to-Efficiency ROI)",
      recSub: "Level up costs: 1-10=1, 11-20=2, 20-30=4, 30-40=8, 40-60=16, 60-80=32",
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

    // Thứ tự phòng: Control Nexus (3 slots) ĐẦU TIÊN
    const roomConfigs = {
      nexus: { cabin: 'Control Nexus', types: ['nexus'], cap: 3 }, // 3 SLOTS
      mfg1: { cabin: 'MFG Cabin', types: ['char_exp'], cap: 3 },
      mfg2: { cabin: 'MFG Cabin', types: ['weapon_exp'], cap: 3 },
      growth: { cabin: 'Growth Chamber', types: state.growthTargets.length > 0 ? state.growthTargets : ['plant'], cap: 3 },
      reception: { cabin: 'Reception Room', types: ['clue'], cap: 3 }
    };

    const assignment = A9EOptimizer.assignDistinctRooms(ops, roomConfigs, state.weights);

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

    // Đề xuất nâng cấp nhân vật
    const upgradeRecs = (state.userData && state.userData.operators)
      ? A9EOptimizer.getUpgradeRecommendations(state.userData.operators, FULL_SKILLS_DATA)
      : [];

    renderUI(ops, assignment, roomConfigs, simResults, autoXSuggestions, nexusRegen1, nexusRegen2, upgradeRecs);
  }

  function renderUI(allOps, assignment, roomConfigs, simResults, autoXSuggestions, nexusRegen1, nexusRegen2, upgradeRecs) {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let totalBaseDailyOutput = 0;
    const prodRooms = ['mfg1', 'mfg2', 'growth', 'reception'];
    prodRooms.forEach(r => { totalBaseDailyOutput += simResults[r].dailyOutputAvg; });

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
        <!-- Card 1: Multi-select Buồng Phát Triển & Chu kỳ nhập số -->
        <div class="control-card glass-panel">
          <div class="control-card-header">🌱 ${t('growthTargetTitle')}</div>
          <div class="btn-group" style="width:100%; display:flex; margin-bottom:1rem;">
            <button class="btn-group-btn ${state.growthTargets.includes('plant') ? 'active' : ''}" style="flex:1;" data-growth-toggle="plant">${t('plantTarget')}</button>
            <button class="btn-group-btn ${state.growthTargets.includes('mineral') ? 'active' : ''}" style="flex:1;" data-growth-toggle="mineral">${t('mineralTarget')}</button>
            <button class="btn-group-btn ${state.growthTargets.includes('fungus') ? 'active' : ''}" style="flex:1;" data-growth-toggle="fungus">${t('fungusTarget')}</button>
          </div>

          <!-- Chu kỳ nhập số ngày -->
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

        <!-- Card 2: 6 Hệ số ưu tiên tài nguyên (Đã bỏ w_nexus) -->
        <div class="control-card glass-panel">
          <div class="control-card-header">⚖ ${t('resourceWeights')}</div>
          
          <div class="slider-group">
            <div class="slider-label"><span>${t('wCharExp')}</span><span class="slider-value">${state.weights.char_exp.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="char_exp" min="0" max="3" step="0.1" value="${state.weights.char_exp}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wWeaponExp')}</span><span class="slider-value">${state.weights.weapon_exp.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="weapon_exp" min="0" max="3" step="0.1" value="${state.weights.weapon_exp}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wPlant')}</span><span class="slider-value">${state.weights.plant.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="plant" min="0" max="3" step="0.1" value="${state.weights.plant}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wMineral')}</span><span class="slider-value">${state.weights.mineral.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="mineral" min="0" max="3" step="0.1" value="${state.weights.mineral}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wFungus')}</span><span class="slider-value">${state.weights.fungus.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="fungus" min="0" max="3" step="0.1" value="${state.weights.fungus}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wClue')}</span><span class="slider-value">${state.weights.clue.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="clue" min="0" max="3" step="0.1" value="${state.weights.clue}" />
          </div>
        </div>
      </div>

      <!-- Metrics Section (Đã bỏ % hiệu suất trung bình căn cứ) -->
      <div class="metrics-section glass-panel">
        <div class="metrics-header">
          <h2>📊 ${t('metricsTitle')} (${state.cycleDays}D Avg)</h2>
        </div>
        <div class="metrics-grid">
          <div class="metric-box cyan">
            <div class="metric-title">${t('wCharExp')}</div>
            <div class="metric-num">${simResults.mfg1.dailyOutputAvg}</div>
            <div class="metric-desc">Sản lượng TB/ngày</div>
          </div>
          <div class="metric-box cyan">
            <div class="metric-title">${t('wWeaponExp')}</div>
            <div class="metric-num">${simResults.mfg2.dailyOutputAvg}</div>
            <div class="metric-desc">Sản lượng TB/ngày</div>
          </div>
          <div class="metric-box green">
            <div class="metric-title">${t('growthName')}</div>
            <div class="metric-num">${simResults.growth.dailyOutputAvg}</div>
            <div class="metric-desc">Sản lượng TB/ngày</div>
          </div>
          <div class="metric-box purple">
            <div class="metric-title">${t('wClue')}</div>
            <div class="metric-num">${simResults.reception.dailyOutputAvg}</div>
            <div class="metric-desc">Tốc độ TB/ngày</div>
          </div>
          <div class="metric-box">
            <div class="metric-title">${t('metricDailyOut')}</div>
            <div class="metric-num">${parseFloat(totalBaseDailyOutput.toFixed(1))}</div>
            <div class="metric-desc">Quy đổi 4 phòng</div>
          </div>
        </div>

        <!-- Banner giải thích công thức Control Nexus -->
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

      <!-- BẢNG ĐỀ XUẤT NÂNG CẤP CÁN VIÊN (ROI RANKING) -->
      ${renderUpgradeRecommendationsHtml(upgradeRecs)}

      <!-- DANH SÁCH 5 PHÒNG (NEXUS ĐỨNG ĐẦU, BẤM NÚT CHỌN GIỜ) -->
      <div class="rooms-container">
        <!-- 1. CONTROL NEXUS (ĐẦU TIÊN) -->
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

      ${renderModalHtml()}

      <footer>
        <p>A9E Dingjang Logistics Assistant &bull; Arknights: Endfield Fan-made Utility</p>
        <p style="margin-top:4px;">Project Source: <a href="https://github.com/ngtrungkhanh/A9E-Dingjang" target="_blank">github.com/ngtrungkhanh/A9E-Dingjang</a></p>
      </footer>
    `;

    bindEvents(autoXSuggestions, nexusRegen1, nexusRegen2);
  }

  // Render Card cho Phòng Sản Xuất với cụm nút bấm chọn giờ
  function renderRoomCard(roomKey, roomTitle, roomAssignment, simRes, autoX, cabinEn, targetTypes) {
    const x = simRes.x;
    const remain = 24 - x;

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem; margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.1rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>🏢</span> ${roomTitle}
            </h3>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              ${t('dailyOutLabel', { out: simRes.dailyOutputAvg })} | ${t('dailyEffLabel', { eff: simRes.dailyAvgEfficiency })}
            </div>
          </div>

          <!-- CỤM NÚT BẤM CHỌN GIỜ (KHÔNG DÙNG THANH KÉO) -->
          <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem; background:rgba(15,23,42,0.8); padding:0.4rem 0.6rem; border-radius:8px; border:1px solid var(--border-color);">
            <span style="font-size:0.8rem; font-family:var(--font-mono); color:var(--accent-orange); font-weight:700; margin-right:4px;">Ca 1: ${x}h</span>
            
            <button class="btn-group-btn btn-hour-step" data-room="${roomKey}" data-step="-1" style="padding:0.2rem 0.5rem; font-weight:700;">-1h</button>
            
            <div class="btn-group" style="padding:1px;">
              ${[8, 10, 12, 14, 16].map(h => `
                <button class="btn-group-btn btn-hour-preset ${x === h ? 'active' : ''}" data-room="${roomKey}" data-hour="${h}" style="padding:0.25rem 0.5rem; font-size:0.75rem;">
                  ${h}h
                </button>
              `).join('')}
            </div>

            <button class="btn-group-btn btn-hour-step" data-room="${roomKey}" data-step="1" style="padding:0.2rem 0.5rem; font-weight:700;">+1h</button>

            <button class="btn-secondary btn-auto-room-x" data-room="${roomKey}" style="padding:0.25rem 0.55rem; font-size:0.75rem; color:#fbbf24; border-color:rgba(251,191,36,0.4);" title="Tự động tối ưu cho phòng này: x = ${autoX.bestX}">
              ⚡ x=${autoX.bestX}
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
          <!-- Ca 1 -->
          <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-orange);">☀️ ${t('shift1Label', { x })}</span>
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

          <!-- Ca 2 -->
          <div style="background:rgba(6, 182, 212, 0.05); border:1px solid rgba(6, 182, 212, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-cyan);">🌙 ${t('shift2Label', { x, remain })}</span>
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

  // Render Card cho Control Nexus (3 Slots)
  function renderNexusCard(roomKey, roomTitle, roomAssignment, x, nexusRegen1, nexusRegen2, autoX) {
    const remain = 24 - x;
    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-cyan);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem; margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.1rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>📡</span> ${roomTitle}
            </h3>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              Tăng tốc độ hồi phục Stamina toàn trạm khi cán viên ở ngoài giờ làm việc
            </div>
          </div>

          <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.4rem; background:rgba(15,23,42,0.8); padding:0.4rem 0.6rem; border-radius:8px; border:1px solid var(--border-color);">
            <span style="font-size:0.8rem; font-family:var(--font-mono); color:var(--accent-orange); font-weight:700; margin-right:4px;">Ca 1: ${x}h</span>
            <button class="btn-group-btn btn-hour-step" data-room="${roomKey}" data-step="-1" style="padding:0.2rem 0.5rem; font-weight:700;">-1h</button>
            <div class="btn-group" style="padding:1px;">
              ${[8, 10, 12, 14, 16].map(h => `
                <button class="btn-group-btn btn-hour-preset ${x === h ? 'active' : ''}" data-room="${roomKey}" data-hour="${h}" style="padding:0.25rem 0.5rem; font-size:0.75rem;">
                  ${h}h
                </button>
              `).join('')}
            </div>
            <button class="btn-group-btn btn-hour-step" data-room="${roomKey}" data-step="1" style="padding:0.2rem 0.5rem; font-weight:700;">+1h</button>
            <button class="btn-secondary btn-auto-room-x" data-room="${roomKey}" style="padding:0.25rem 0.55rem; font-size:0.75rem; color:#fbbf24; border-color:rgba(251,191,36,0.4);" title="Tự động tối ưu: x = ${autoX.bestX}">
              ⚡ x=${autoX.bestX}
            </button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1rem;">
          <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-orange);">☀️ Ca 1 (${x}h) - 3 Slots</span>
              <span class="room-eff-badge">+${nexusRegen1.totalBuffPct}% Regen</span>
            </div>
            <div class="operator-chips">${renderOperatorChipsWithSkills(roomAssignment.shift1, 'Control Nexus', ['nexus'])}</div>
            <div class="room-stamina-status">
              <span>${roomAssignment.shift1.length}/3 Cán viên trực</span>
              <span class="stamina-ok">Tốc độ hồi: ${nexusRegen1.realSpeed}%/h</span>
            </div>
          </div>

          <div style="background:rgba(6, 182, 212, 0.05); border:1px solid rgba(6, 182, 212, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-cyan);">🌙 Ca 2 (${remain}h) - 3 Slots</span>
              <span class="room-eff-badge" style="background:rgba(6, 182, 212, 0.15); color:#38bdf8; border-color:rgba(6, 182, 212, 0.3);">+${nexusRegen2.totalBuffPct}% Regen</span>
            </div>
            <div class="operator-chips">${renderOperatorChipsWithSkills(roomAssignment.shift2, 'Control Nexus', ['nexus'])}</div>
            <div class="room-stamina-status">
              <span>${roomAssignment.shift2.length}/3 Cán viên trực</span>
              <span class="stamina-ok">Tốc độ hồi: ${nexusRegen2.realSpeed}%/h</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render chip cán viên hiển thị TÊN KỸ NĂNG & HIỆU ỨNG CỤ THỂ ẢNH HƯỞNG TỚI PHÒNG
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

  // Render khu vực Đề Xuất Nâng Cấp Cán Viên (ROI Ranking)
  function renderUpgradeRecommendationsHtml(recs) {
    if (state.mode !== 'user') {
      return `
        <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-orange);">
          <h3 style="font-size:1.05rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
            <span>🚀</span> ${t('recTitle')}
          </h3>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${t('recSub')}</p>
          <div style="margin-top:0.75rem; font-size:0.82rem; color:var(--text-muted);">
            ${t('recNeedAccount')}
          </div>
        </div>
      `;
    }

    if (!recs || recs.length === 0) {
      return `
        <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-green);">
          <h3 style="font-size:1.05rem; color:#fff;">🚀 ${t('recTitle')}</h3>
          <p style="font-size:0.82rem; color:#34d399; margin-top:0.5rem;">${t('recEmpty')}</p>
        </div>
      `;
    }

    const itemsHtml = recs.map((r, idx) => `
      <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); border-radius:8px; padding:0.75rem 1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="font-family:var(--font-mono); font-weight:800; font-size:1.1rem; color:var(--accent-orange); width:28px;">
            #${idx + 1}
          </div>
          <div>
            <div style="font-size:0.92rem; font-weight:700; color:#fff;">
              <span class="op-star">★${r.rarity}</span> ${r.name} 
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan); margin-left:6px;">
                Lv.${r.curLvl} ➔ Lv.${r.targetLvl}
              </span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
              ${r.gainDesc}
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:1.25rem;">
          <div style="text-align:right;">
            <div style="font-size:0.72rem; color:var(--text-muted);">TIỀN VỐN</div>
            <div style="font-family:var(--font-mono); font-weight:700; font-size:1rem; color:#f87171;">${r.cost}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.72rem; color:var(--text-muted);">HIỆU QUẢ ROI</div>
            <div style="font-family:var(--font-mono); font-weight:800; font-size:1.15rem; color:#34d399;">${r.roi}</div>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-orange);">
        <h3 style="font-size:1.05rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
          <span>🚀</span> ${t('recTitle')}
        </h3>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${t('recSub')}</p>
        <div style="display:flex; flex-direction:column; gap:0.6rem; margin-top:1rem;">
          ${itemsHtml}
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

  function bindEvents(autoXSuggestions, nexusRegen1, nexusRegen2) {
    // Quick Stamina Calculator
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

    // Multi-select toggle Buồng Phát Triển
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

    // Chu kỳ mô phỏng (Input Number)
    const cycleInput = document.getElementById('cycleDaysInput');
    if (cycleInput) {
      cycleInput.onchange = (e) => {
        state.cycleDays = Math.max(1, Math.min(60, parseInt(e.target.value, 10) || 1));
        saveSettings();
        updateOptimizer();
      };
    }

    // Sliders Trọng số (6 loại)
    document.querySelectorAll('.weight-slider').forEach(sl => {
      sl.oninput = (e) => {
        const wKey = e.target.getAttribute('data-weight');
        state.weights[wKey] = parseFloat(e.target.value);
        saveSettings();
        updateOptimizer();
      };
    });

    // Nút chọn giờ nhanh (Presets: 8h, 10h, 12h, 14h, 16h)
    document.querySelectorAll('.btn-hour-preset').forEach(btn => {
      btn.onclick = () => {
        const rKey = btn.getAttribute('data-room');
        const h = parseInt(btn.getAttribute('data-hour'), 10);
        state.roomX[rKey] = h;
        saveSettings();
        updateOptimizer();
      };
    });

    // Nút tăng/giảm từng giờ (+1h, -1h)
    document.querySelectorAll('.btn-hour-step').forEach(btn => {
      btn.onclick = () => {
        const rKey = btn.getAttribute('data-room');
        const step = parseInt(btn.getAttribute('data-step'), 10);
        const cur = state.roomX[rKey] || 12;
        state.roomX[rKey] = Math.max(1, Math.min(23, cur + step));
        saveSettings();
        updateOptimizer();
      };
    });

    // Nút tối ưu x cho riêng 1 phòng
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

    // Nút tối ưu x cho TẤT CẢ các phòng
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
