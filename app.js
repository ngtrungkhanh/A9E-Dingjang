/**
 * A9E Dingjang Logistics Optimizer - Frontend Controller (v2.0)
 * Author: Antigravity
 * Thời gian phân ca riêng cho từng phòng, 1 cán viên chỉ ở 1 phòng, công thức Nexus chuẩn xác
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
      accountTitle: "Tài khoản liên kết SKPORT",
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
      wNexus: "Tái Tạo Tâm Trạng (Nexus)",
      growthTargetTitle: "Mặt hàng Buồng Phát Triển (Có thể chọn 1, 2 hoặc cả 3 loại)",
      plantTarget: "Cây Trồng Hóa Đá",
      mineralTarget: "Khoáng Sản Quý Hiếm",
      fungusTarget: "Vật Chất Nấm",
      cycleTitle: "Chu kỳ mô phỏng bền vững",
      cycle1: "1 Ngày (24h)",
      cycle3: "3 Ngày",
      cycle7: "7 Ngày (1 Tuần)",
      btnAutoAllX: "⚡ Tự Động Tối Ưu Phân Ca Tất Cả Phòng",
      btnAutoRoomX: "⚡ Gợi ý x cho phòng này",
      metricsTitle: "Chỉ Số Trung Bình Hàng Ngày Toàn Căn Cứ",
      metricAvgEff: "HIỆU SUẤT TRUNG BÌNH CĂN CỨ",
      metricDailyOut: "TỔNG SẢN LƯỢNG ĐỔI / NGÀY",
      mfg1Name: "Khoang Sản Xuất 1 (EXP Cán Viên)",
      mfg2Name: "Khoang Sản Xuất 2 (EXP Vũ Khí)",
      growthName: "Buồng Phát Triển (Đa canh tác)",
      receptionName: "Phòng Tiếp Khách (Thu Thập Manh Mối)",
      nexusName: "Trung Tâm Kiểm Soát (Trạm Điều Hòa Tâm Trạng)",
      shift1Label: "Ca 1 (0h ➔ {x}h) - {x} tiếng",
      shift2Label: "Ca 2 ({x}h ➔ 24h) - {remain} tiếng",
      staminaSafe: "✓ Trụ hết ca an toàn",
      staminaDepleted: "⚠ Cạn lúc {h}h (nghỉ {rest}h)",
      burnRateLabel: "Hao: {burn}%/h",
      effLabel: "Hiệu suất: {eff}%",
      dailyOutLabel: "Sản lượng TB/ngày: <strong>{out}</strong>",
      dailyEffLabel: "Hiệu suất TB/ngày: <strong>{eff}%</strong>",
      nexusFormulaTitle: "Cơ Chế Phục Hồi Tâm Trạng (Control Nexus):",
      nexusFormulaDesc: "Mặc định không có ai: 12%/giờ. Tốc độ hồi thực tế = 12% × (1 + Tổng % buff Nexus).",
      nexusShift1Regen: "Ca 1 buff +{buff}% ➔ Tốc độ hồi: {real}%/h (Ingame: {ingame}%/h)",
      nexusShift2Regen: "Ca 2 buff +{buff}% ➔ Tốc độ hồi: {real}%/h (Ingame: {ingame}%/h)",
      btnShowDetails: "▼ Bấm để xem chi tiết tính toán từng phòng & timeline 24h",
      btnHideDetails: "▲ Thu gọn bảng chi tiết",
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
      accountTitle: "SKPORT Linked Account",
      accountGuest: "No custom account loaded (Click Update Data to load roster_summary.json)",
      uidLabel: "UID",
      serverLabel: "Server",
      levelLabel: "Level",
      opsCountLabel: "Available Operators",
      settingsTitle: "Resource Priorities & Growth Chamber Settings",
      resourceWeights: "Individual Resource Priority Weights",
      wCharExp: "Operator EXP",
      wWeaponExp: "Weapon EXP",
      wPlant: "Petrified Plants (Agriculture)",
      wMineral: "Rare Minerals",
      wFungus: "Fungus Materials",
      wClue: "Clue Gathering Speed",
      wNexus: "Mood Regeneration (Nexus)",
      growthTargetTitle: "Growth Chamber Products (Select 1, 2 or all 3)",
      plantTarget: "Petrified Plants",
      mineralTarget: "Rare Minerals",
      fungusTarget: "Fungus Materials",
      cycleTitle: "Sustainable Simulation Cycle",
      cycle1: "1 Day (24h)",
      cycle3: "3 Days",
      cycle7: "7 Days (1 Week)",
      btnAutoAllX: "⚡ Auto-Optimize Shift Hours for All Rooms",
      btnAutoRoomX: "⚡ Auto-Optimal X for this Room",
      metricsTitle: "Daily Base-Wide Average Metrics",
      metricAvgEff: "DAILY BASE AVG EFFICIENCY",
      metricDailyOut: "DAILY TOTAL OUTPUT",
      mfg1Name: "MFG Cabin 1 (Operator EXP)",
      mfg2Name: "MFG Cabin 2 (Weapon EXP)",
      growthName: "Growth Chamber (Multi-cultivation)",
      receptionName: "Reception Room (Clues)",
      nexusName: "Control Nexus (Mood Regeneration)",
      shift1Label: "Shift 1 (0h ➔ {x}h) - {x} hrs",
      shift2Label: "Shift 2 ({x}h ➔ 24h) - {remain} hrs",
      staminaSafe: "✓ Sustainable Shift",
      staminaDepleted: "⚠ Depleted at {h}h ({rest}h idle)",
      burnRateLabel: "Burn: {burn}%/h",
      effLabel: "Eff: {eff}%",
      dailyOutLabel: "Daily Avg Out: <strong>{out}</strong>",
      dailyEffLabel: "Daily Avg Eff: <strong>{eff}%</strong>",
      nexusFormulaTitle: "Mood Regeneration Mechanism (Control Nexus):",
      nexusFormulaDesc: "Base rest speed: 12%/h. Actual regen speed = 12% × (1 + sum of Nexus buffs).",
      nexusShift1Regen: "Shift 1 buff +{buff}% ➔ Regen speed: {real}%/h (Ingame: {ingame}%/h)",
      nexusShift2Regen: "Shift 2 buff +{buff}% ➔ Regen speed: {real}%/h (Ingame: {ingame}%/h)",
      btnShowDetails: "▼ Click to expand room calculations & 24h timeline",
      btnHideDetails: "▲ Collapse details",
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

  // State Management
  const state = {
    lang: localStorage.getItem('a9e_lang') || 'vi',
    mode: localStorage.getItem('a9e_mode') || 'all',
    // Multi-select cho Buồng Phát Triển (mặc định chọn cả 3)
    growthTargets: JSON.parse(localStorage.getItem('a9e_growth_targets') || '["plant", "mineral"]'),
    cycleDays: parseInt(localStorage.getItem('a9e_cycle_days') || '1', 10),
    // Thời gian phân ca độc lập cho từng phòng
    roomX: JSON.parse(localStorage.getItem('a9e_room_x') || '{"mfg1":12,"mfg2":12,"growth":12,"reception":12,"nexus":12}'),
    // Hệ số ưu tiên tài nguyên tách bạch hoàn toàn
    weights: JSON.parse(localStorage.getItem('a9e_weights_v2') || JSON.stringify({
      char_exp: 1.0,
      weapon_exp: 1.0,
      plant: 1.0,
      mineral: 1.0,
      fungus: 1.0,
      clue: 1.0,
      nexus: 1.0
    })),
    userData: null,
    showDetails: false,
    activeModalTab: 'upload'
  };

  // Khởi tạo User Data từ localStorage
  try {
    const savedUserData = localStorage.getItem('a9e_user_roster');
    if (savedUserData) {
      state.userData = JSON.parse(savedUserData);
    }
  } catch (e) {
    console.error("Lỗi đọc cache user data:", e);
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
    localStorage.setItem('a9e_weights_v2', JSON.stringify(state.weights));
  }

  // Chạy tối ưu hóa và cập nhật giao diện
  function updateOptimizer() {
    if (typeof A9EOptimizer === 'undefined' || typeof FULL_SKILLS_DATA === 'undefined') {
      console.warn("Chưa tải xong dữ liệu hoặc module Optimizer!");
      return;
    }

    const useUserRoster = (state.mode === 'user');
    const ops = A9EOptimizer.parseAllOperators(FULL_SKILLS_DATA, state.userData, useUserRoster);

    const roomConfigs = {
      mfg1: { cabin: 'MFG Cabin', types: ['char_exp'], cap: 3 },
      mfg2: { cabin: 'MFG Cabin', types: ['weapon_exp'], cap: 3 },
      growth: { cabin: 'Growth Chamber', types: state.growthTargets.length > 0 ? state.growthTargets : ['plant'], cap: 3 },
      reception: { cabin: 'Reception Room', types: ['clue'], cap: 3 },
      nexus: { cabin: 'Control Nexus', types: ['nexus'], cap: 5 }
    };

    // 1. Phân bổ cán viên vào 5 phòng: 1 CÁN VIÊN CHỈ Ở ĐÚNG 1 PHÒNG
    const assignment = A9EOptimizer.assignDistinctRooms(ops, roomConfigs, state.weights);

    // 2. Tính toán tốc độ hồi phục của Control Nexus
    const nexusRegen1 = A9EOptimizer.calculateNexusRegenSpeed(assignment.nexus.shift1);
    const nexusRegen2 = A9EOptimizer.calculateNexusRegenSpeed(assignment.nexus.shift2);

    // 3. Mô phỏng độc lập từng phòng với giá trị x của riêng phòng đó
    const simResults = {};
    const autoXSuggestions = {};

    const roomKeys = ['mfg1', 'mfg2', 'growth', 'reception', 'nexus'];
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

      // Tìm x tối ưu cho phòng này
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

    renderUI(ops, assignment, roomConfigs, simResults, autoXSuggestions, nexusRegen1, nexusRegen2);
  }

  // Render toàn bộ giao diện HTML
  function renderUI(allOps, assignment, roomConfigs, simResults, autoXSuggestions, nexusRegen1, nexusRegen2) {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    // Tính chỉ số trung bình căn cứ
    let totalBaseDailyOutput = 0;
    let totalBaseDailyEffSum = 0;
    const prodRooms = ['mfg1', 'mfg2', 'growth', 'reception'];
    prodRooms.forEach(r => {
      totalBaseDailyOutput += simResults[r].dailyOutputAvg;
      totalBaseDailyEffSum += simResults[r].dailyAvgEfficiency;
    });
    const baseAvgEfficiency = Math.round(totalBaseDailyEffSum / prodRooms.length);

    // Account Banner
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
      <!-- Header -->
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

      <!-- Settings & Controls Grid -->
      <div class="controls-grid">
        <!-- Card 1: Chọn mặt hàng Buồng Phát Triển (Multi-select) & Chu kỳ -->
        <div class="control-card glass-panel">
          <div class="control-card-header">🌱 ${t('growthTargetTitle')}</div>
          <div class="btn-group" style="width:100%; display:flex; margin-bottom:1rem;">
            <button class="btn-group-btn ${state.growthTargets.includes('plant') ? 'active' : ''}" style="flex:1;" data-growth-toggle="plant">${t('plantTarget')}</button>
            <button class="btn-group-btn ${state.growthTargets.includes('mineral') ? 'active' : ''}" style="flex:1;" data-growth-toggle="mineral">${t('mineralTarget')}</button>
            <button class="btn-group-btn ${state.growthTargets.includes('fungus') ? 'active' : ''}" style="flex:1;" data-growth-toggle="fungus">${t('fungusTarget')}</button>
          </div>

          <div style="margin-top:1rem;">
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.4rem;">${t('cycleTitle')}:</div>
            <div class="btn-group" style="width:100%; display:flex;">
              <button class="btn-group-btn ${state.cycleDays === 1 ? 'active' : ''}" style="flex:1;" data-cycle="1">${t('cycle1')}</button>
              <button class="btn-group-btn ${state.cycleDays === 3 ? 'active' : ''}" style="flex:1;" data-cycle="3">${t('cycle3')}</button>
              <button class="btn-group-btn ${state.cycleDays === 7 ? 'active' : ''}" style="flex:1;" data-cycle="7">${t('cycle7')}</button>
            </div>
          </div>

          <!-- Nút Tối ưu tự động toàn bộ 5 phòng -->
          <div style="margin-top:1.25rem;">
            <button class="btn-primary" id="btnAutoAllRooms" style="width:100%; justify-content:center; padding:0.65rem;">
              ${t('btnAutoAllX')}
            </button>
          </div>
        </div>

        <!-- Card 2: Hệ số ưu tiên từng tài nguyên riêng biệt -->
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

          <div class="slider-group">
            <div class="slider-label"><span>${t('wNexus')}</span><span class="slider-value">${state.weights.nexus.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="nexus" min="0" max="3" step="0.1" value="${state.weights.nexus}" />
          </div>
        </div>
      </div>

      <!-- Metrics Section -->
      <div class="metrics-section glass-panel">
        <div class="metrics-header">
          <h2>📊 ${t('metricsTitle')} (${state.cycleDays}D Avg)</h2>
        </div>
        <div class="metrics-grid">
          <div class="metric-box">
            <div class="metric-title">${t('metricAvgEff')}</div>
            <div class="metric-num">${baseAvgEfficiency}%</div>
            <div class="metric-desc">Trung bình 4 phòng sản xuất</div>
          </div>
          <div class="metric-box cyan">
            <div class="metric-title">${t('wCharExp')}</div>
            <div class="metric-num">${simResults.mfg1.dailyOutputAvg}</div>
            <div class="metric-desc">Hiệu suất: ${simResults.mfg1.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box cyan">
            <div class="metric-title">${t('wWeaponExp')}</div>
            <div class="metric-num">${simResults.mfg2.dailyOutputAvg}</div>
            <div class="metric-desc">Hiệu suất: ${simResults.mfg2.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box green">
            <div class="metric-title">${t('growthName')}</div>
            <div class="metric-num">${simResults.growth.dailyOutputAvg}</div>
            <div class="metric-desc">Hiệu suất: ${simResults.growth.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box purple">
            <div class="metric-title">${t('wClue')}</div>
            <div class="metric-num">${simResults.reception.dailyOutputAvg}</div>
            <div class="metric-desc">Hiệu suất: ${simResults.reception.dailyAvgEfficiency}%</div>
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

          <!-- Máy tính tra cứu thời gian hồi Stamina nhanh -->
          <div style="margin-top:0.75rem; padding-top:0.6rem; border-top:1px dashed rgba(6,182,212,0.2); display:flex; align-items:center; flex-wrap:wrap; gap:0.75rem;">
            <span style="font-size:0.8rem; color:var(--text-primary); font-weight:600;">Tra cứu nhanh thời gian hồi phục:</span>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <span style="font-size:0.78rem; color:var(--text-secondary);">Stamina hiện tại:</span>
              <input type="number" id="quickStaminaInput" min="0" max="99" value="37" style="width:55px; background:#0b0e14; color:#38bdf8; border:1px solid rgba(255,255,255,0.15); border-radius:4px; padding:0.2rem 0.4rem; font-family:var(--font-mono); font-size:0.8rem; text-align:center;" />
              <span style="font-size:0.78rem; color:var(--text-secondary);">%</span>
            </div>
            <div id="quickStaminaResult" style="font-size:0.8rem; font-family:var(--font-mono); color:#fbbf24;">
              <!-- Sẽ render tự động -->
            </div>
          </div>
        </div>
      </div>

      <!-- DANH SÁCH 5 PHÒNG (MỖI PHÒNG CÓ THANH CHỈNH X RIÊNG & 2 DÒNG CA 1, CA 2) -->
      <div class="rooms-container">
        ${renderRoomCard('mfg1', t('mfg1Name'), assignment.mfg1, simResults.mfg1, autoXSuggestions.mfg1)}
        ${renderRoomCard('mfg2', t('mfg2Name'), assignment.mfg2, simResults.mfg2, autoXSuggestions.mfg2)}
        ${renderRoomCard('growth', t('growthName'), assignment.growth, simResults.growth, autoXSuggestions.growth)}
        ${renderRoomCard('reception', t('receptionName'), assignment.reception, simResults.reception, autoXSuggestions.reception)}
        ${renderNexusCard('nexus', t('nexusName'), assignment.nexus, state.roomX.nexus || 12, nexusRegen1, nexusRegen2)}
      </div>

      <!-- Modal Cập nhật Data -->
      ${renderModalHtml()}

      <footer>
        <p>A9E Dingjang Logistics Assistant &bull; Arknights: Endfield Fan-made Utility</p>
        <p style="margin-top:4px;">Project Source: <a href="https://github.com/ngtrungkhanh/A9E-Dingjang" target="_blank">github.com/ngtrungkhanh/A9E-Dingjang</a></p>
      </footer>
    `;

    bindEvents(autoXSuggestions, nexusRegen1, nexusRegen2);
  }

  // Render Card cho từng phòng sản xuất
  function renderRoomCard(roomKey, roomTitle, roomAssignment, simRes, autoX) {
    const x = simRes.x;
    const remain = 24 - x;

    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem; margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.1rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>🏢</span> ${roomTitle}
            </h3>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              ${t('dailyOutLabel', { out: simRes.dailyOutputAvg })} | ${t('dailyEffLabel', { eff: simRes.dailyAvgEfficiency })}
            </div>
          </div>

          <!-- Thanh chỉnh x độc lập của phòng này -->
          <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(15,23,42,0.6); padding:0.4rem 0.85rem; border-radius:8px; border:1px solid var(--border-color);">
            <div style="font-size:0.82rem; font-family:var(--font-mono);">
              <span style="color:var(--accent-orange); font-weight:700;">Ca 1: ${x}h</span> / <span style="color:var(--accent-cyan); font-weight:700;">Ca 2: ${remain}h</span>
            </div>
            <input type="range" class="room-x-slider" data-room="${roomKey}" min="1" max="23" value="${x}" style="width:110px;" />
            <button class="btn-secondary btn-auto-room-x" data-room="${roomKey}" style="padding:0.25rem 0.5rem; font-size:0.75rem; color:#fbbf24;" title="Đề xuất: x = ${autoX.bestX}">
              ⚡ x=${autoX.bestX}
            </button>
          </div>
        </div>

        <!-- 2 DÒNG CA 1 VÀ CA 2 -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
          <!-- Ca 1 -->
          <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-orange);">☀️ ${t('shift1Label', { x })}</span>
              <span class="room-eff-badge">${simRes.m1.totalEffPct}% Eff</span>
            </div>
            <div class="operator-chips">
              ${renderOperatorChips(roomAssignment.shift1)}
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
              ${renderOperatorChips(roomAssignment.shift2)}
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

  // Render Card cho Trung Tâm Kiểm Soát Nexus
  function renderNexusCard(roomKey, roomTitle, roomAssignment, x, nexusRegen1, nexusRegen2) {
    const remain = 24 - x;
    return `
      <div class="glass-panel" style="padding:1.25rem; margin-bottom:1.5rem; border-left:4px solid var(--accent-cyan);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.75rem; margin-bottom:1rem;">
          <div>
            <h3 style="font-size:1.1rem; color:#fff; display:flex; align-items:center; gap:0.5rem;">
              <span>📡</span> ${roomTitle}
            </h3>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">
              Nhà đặc biệt: Tăng tốc độ hồi phục Stamina toàn căn cứ khi nghỉ ngơi
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(15,23,42,0.6); padding:0.4rem 0.85rem; border-radius:8px; border:1px solid var(--border-color);">
            <div style="font-size:0.82rem; font-family:var(--font-mono);">
              <span style="color:var(--accent-orange); font-weight:700;">Ca 1: ${x}h</span> / <span style="color:var(--accent-cyan); font-weight:700;">Ca 2: ${remain}h</span>
            </div>
            <input type="range" class="room-x-slider" data-room="${roomKey}" min="1" max="23" value="${x}" style="width:110px;" />
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1rem;">
          <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-orange);">☀️ Ca 1 (${x}h)</span>
              <span class="room-eff-badge">+${nexusRegen1.totalBuffPct}% Regen</span>
            </div>
            <div class="operator-chips">${renderOperatorChips(roomAssignment.shift1)}</div>
            <div class="room-stamina-status">
              <span>${roomAssignment.shift1.length} Cán viên trực</span>
              <span class="stamina-ok">Tốc độ hồi: ${nexusRegen1.realSpeed}%/h</span>
            </div>
          </div>

          <div style="background:rgba(6, 182, 212, 0.05); border:1px solid rgba(6, 182, 212, 0.2); border-radius:8px; padding:0.85rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <span style="font-size:0.82rem; font-weight:700; color:var(--accent-cyan);">🌙 Ca 2 (${remain}h)</span>
              <span class="room-eff-badge" style="background:rgba(6, 182, 212, 0.15); color:#38bdf8; border-color:rgba(6, 182, 212, 0.3);">+${nexusRegen2.totalBuffPct}% Regen</span>
            </div>
            <div class="operator-chips">${renderOperatorChips(roomAssignment.shift2)}</div>
            <div class="room-stamina-status">
              <span>${roomAssignment.shift2.length} Cán viên trực</span>
              <span class="stamina-ok">Tốc độ hồi: ${nexusRegen2.realSpeed}%/h</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderOperatorChips(ops) {
    if (!ops || ops.length === 0) {
      return '<div style="font-size:0.75rem; color:var(--text-muted); padding:0.3rem 0;">(Trống - Không đủ cán viên chuyên trách)</div>';
    }
    return ops.map(op => `
      <div class="op-chip">
        <div class="op-chip-info">
          <span class="op-star">★${op.rarity || '5'}</span>
          <span class="op-chip-name">${op.name}</span>
        </div>
        <span class="op-chip-skills">Lv.${op.level || 90}</span>
      </div>
    `).join('');
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
          // Chỉ cho phép bỏ chọn nếu còn ít nhất 1 loại
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

    // Chu kỳ
    document.querySelectorAll('[data-cycle]').forEach(btn => {
      btn.onclick = () => {
        state.cycleDays = parseInt(btn.getAttribute('data-cycle'), 10);
        saveSettings();
        updateOptimizer();
      };
    });

    // Sliders Trọng số riêng từng tài nguyên
    document.querySelectorAll('.weight-slider').forEach(sl => {
      sl.oninput = (e) => {
        const wKey = e.target.getAttribute('data-weight');
        state.weights[wKey] = parseFloat(e.target.value);
        saveSettings();
        updateOptimizer();
      };
    });

    // Sliders phân ca x riêng cho từng phòng
    document.querySelectorAll('.room-x-slider').forEach(sl => {
      sl.oninput = (e) => {
        const rKey = e.target.getAttribute('data-room');
        state.roomX[rKey] = parseInt(e.target.value, 10);
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

    // Chọn file JSON
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

    // Áp dụng raw JSON
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

    // Sao chép code
    const btnCopySnippet = document.getElementById('btnCopySnippet');
    if (btnCopySnippet) {
      btnCopySnippet.onclick = () => {
        const codeText = document.getElementById('snippetCode').innerText;
        navigator.clipboard.writeText(codeText).then(() => {
          alert(t('copiedToast'));
        });
      };
    }

    // Khôi phục mặc định
    const btnReset = document.getElementById('btnResetDefault');
    if (btnReset) {
      btnReset.onclick = () => {
        if (confirm("Khôi phục toàn bộ về mặc định?")) {
          localStorage.removeItem('a9e_user_roster');
          state.userData = null;
          state.mode = 'all';
          state.roomX = { mfg1: 12, mfg2: 12, growth: 12, reception: 12, nexus: 12 };
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
