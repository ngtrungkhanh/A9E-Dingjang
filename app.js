/**
 * A9E Dingjang Logistics Optimizer - Frontend Controller & i18n
 * Author: Antigravity
 */

(function () {
  'use strict';

  // Từ điển đa ngôn ngữ (i18n)
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
      accountGuest: "Chưa nạp tài khoản cá nhân (Đang hiển thị mẫu)",
      uidLabel: "UID",
      serverLabel: "Server",
      levelLabel: "Cấp",
      opsCountLabel: "Cán viên",
      settingsTitle: "Cấu Hình Ưu Tiên & Phân Ca",
      resourceWeights: "Hệ số ưu tiên tài nguyên",
      wCharExp: "EXP Cán Viên",
      wWeaponExp: "EXP Vũ Khí",
      wGrowth: "Nông Nghiệp / Khoáng Sản",
      wClue: "Tốc Độ Manh Mối",
      wNexus: "Tái Tạo Tâm Trạng",
      growthTargetTitle: "Mặt hàng Buồng Phát Triển",
      plantTarget: "Cây Trồng Hóa Đá",
      mineralTarget: "Khoáng Sản Quý Hiếm",
      fungusTarget: "Vật Chất Nấm",
      cycleTitle: "Chu kỳ mô phỏng bền vững",
      cycle1: "1 Ngày (24h)",
      cycle3: "3 Ngày",
      cycle7: "7 Ngày (1 Tuần)",
      shiftSliderTitle: "Thời gian phân 2 ca",
      shift1TimeDesc: "Ca 1: 0h ➔ {x}h ({x} tiếng)",
      shift2TimeDesc: "Ca 2: {x}h ➔ 24h ({remain} tiếng)",
      btnAutoOptimal: "⚡ Gợi Ý X Tối Ưu Tự Động",
      autoOptimalDesc: "Thuật toán đề xuất x = {x} ({reason})",
      metricsTitle: "Chỉ Số Trung Bình Hàng Ngày Toàn Căn Cứ",
      metricAvgEff: "HIỆU SUẤT TRUNG BÌNH",
      metricDailyOut: "TỔNG SẢN LƯỢNG ĐỔI / NGÀY",
      metricCharExp: "EXP CÁN VIÊN / NGÀY",
      metricWeaponExp: "EXP VŨ KHÍ / NGÀY",
      metricGrowth: "NÔNG SẢN - KHOÁNG / NGÀY",
      metricClue: "TỐC ĐỘ MANH MỐI / NGÀY",
      btnShowDetails: "▼ Bấm để xem chi tiết tính toán từng phòng & timeline 24h",
      btnHideDetails: "▲ Thu gọn bảng chi tiết",
      shift1RowTitle: "DÒNG 1: CA 1 (0h ➔ {x}h) - {x} TIẾNG LÀM VIỆC",
      shift2RowTitle: "DÒNG 2: CA 2 ({x}h ➔ 24h) - {remain} TIẾNG LÀM VIỆC",
      mfg1Name: "Khoang SX 1 (EXP Cán Viên)",
      mfg2Name: "Khoang SX 2 (EXP Vũ Khí)",
      growthName: "Buồng Phát Triển",
      receptionName: "Phòng Tiếp Khách (Manh Mối)",
      nexusName: "Trung Tâm Kiểm Soát (Nexus)",
      staminaSafe: "✓ Trụ hết ca an toàn",
      staminaDepleted: "⚠ Cạn lúc {h}h (nghỉ {rest}h)",
      burnRateLabel: "Hao: {burn}%/h",
      effLabel: "Hiệu suất: {eff}%",
      modalTitle: "Cập Nhật Dữ Liệu Nhân Vật (100% Offline & Cache Local)",
      modalTabUpload: "1. Tải File JSON",
      modalTabCode: "2. Cào Nhanh SKPORT",
      modalTabRaw: "3. Dán JSON Trực Tiếp",
      modalDropHelp: "Kéo thả hoặc chọn file 'roster_summary.json' từ máy của bạn:",
      modalChooseFile: "Chọn File JSON",
      modalBookmarkHelp: "Đoạn mã JavaScript trích xuất nhanh dữ liệu trực tiếp tại trang SKPORT:",
      modalCopyBtn: "Sao Chép Mã JS",
      modalRawHelp: "Dán chuỗi nội dung JSON của roster_summary.json vào ô bên dưới:",
      modalApplyBtn: "Lưu & Áp Dụng",
      modalResetBtn: "Khôi Phục Mặc Định",
      modalNotice: "Cam kết bảo mật: Mọi dữ liệu chỉ lưu trong LocalStorage của trình duyệt này, hoàn toàn không gửi lên bất kỳ server mạng nào.",
      copiedToast: "Đã sao chép mã vào Clipboard!",
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
      accountGuest: "No custom account loaded (Using sample data)",
      uidLabel: "UID",
      serverLabel: "Server",
      levelLabel: "Level",
      opsCountLabel: "Operators",
      settingsTitle: "Resource Priority & Shift Configuration",
      resourceWeights: "Resource Priority Weights",
      wCharExp: "Operator EXP",
      wWeaponExp: "Weapon EXP",
      wGrowth: "Agriculture / Minerals",
      wClue: "Clue Gathering Speed",
      wNexus: "Mood Regeneration",
      growthTargetTitle: "Growth Chamber Product",
      plantTarget: "Petrified Plants",
      mineralTarget: "Rare Minerals",
      fungusTarget: "Fungus Materials",
      cycleTitle: "Sustainable Simulation Cycle",
      cycle1: "1 Day (24h)",
      cycle3: "3 Days",
      cycle7: "7 Days (1 Week)",
      shiftSliderTitle: "2-Shift Division (Hours)",
      shift1TimeDesc: "Shift 1: 0h ➔ {x}h ({x} hours)",
      shift2TimeDesc: "Shift 2: {x}h ➔ 24h ({remain} hours)",
      btnAutoOptimal: "⚡ Auto Optimal X",
      autoOptimalDesc: "Algorithm recommends x = {x} ({reason})",
      metricsTitle: "Daily Base-Wide Average Metrics",
      metricAvgEff: "DAILY AVG EFFICIENCY",
      metricDailyOut: "DAILY TOTAL OUTPUT",
      metricCharExp: "OPERATOR EXP / DAY",
      metricWeaponExp: "WEAPON EXP / DAY",
      metricGrowth: "AGRICULTURE-MINERAL / DAY",
      metricClue: "CLUE GATHERING / DAY",
      btnShowDetails: "▼ Click to expand room calculations & 24h timeline",
      btnHideDetails: "▲ Collapse details",
      shift1RowTitle: "ROW 1: SHIFT 1 (0h ➔ {x}h) - {x} HOURS WORK",
      shift2RowTitle: "ROW 2: SHIFT 2 ({x}h ➔ 24h) - {remain} HOURS WORK",
      mfg1Name: "MFG Cabin 1 (Operator EXP)",
      mfg2Name: "MFG Cabin 2 (Weapon EXP)",
      growthName: "Growth Chamber",
      receptionName: "Reception Room (Clues)",
      nexusName: "Control Nexus (Regen)",
      staminaSafe: "✓ Sustainable Shift",
      staminaDepleted: "⚠ Depleted at {h}h ({rest}h idle)",
      burnRateLabel: "Burn: {burn}%/h",
      effLabel: "Eff: {eff}%",
      modalTitle: "Update Operator Data (100% Offline & Local Cache)",
      modalTabUpload: "1. Upload JSON File",
      modalTabCode: "2. SKPORT Fast Snippet",
      modalTabRaw: "3. Paste Raw JSON",
      modalDropHelp: "Drag & drop or select 'roster_summary.json' from your computer:",
      modalChooseFile: "Choose JSON File",
      modalBookmarkHelp: "JavaScript snippet to extract roster data directly on SKPORT:",
      modalCopyBtn: "Copy JS Snippet",
      modalRawHelp: "Paste raw JSON content of roster_summary.json below:",
      modalApplyBtn: "Save & Apply",
      modalResetBtn: "Reset to Default",
      modalNotice: "Privacy Notice: All data is strictly saved in your browser's LocalStorage and never sent to external servers.",
      copiedToast: "Code copied to clipboard!",
      appliedSuccess: "Data updated successfully!"
    }
  };

  // State Management
  const state = {
    lang: localStorage.getItem('a9e_lang') || 'vi',
    mode: localStorage.getItem('a9e_mode') || 'all', // 'all' or 'user'
    growthTarget: localStorage.getItem('a9e_growth_target') || 'plant',
    cycleDays: parseInt(localStorage.getItem('a9e_cycle_days') || '1', 10),
    x: parseInt(localStorage.getItem('a9e_x') || '12', 10),
    weights: JSON.parse(localStorage.getItem('a9e_weights') || '{"char_exp":1.0,"weapon_exp":1.0,"growth":1.0,"clue":1.0,"nexus":1.0}'),
    userData: null,
    showDetails: false,
    activeModalTab: 'upload'
  };

  // Khởi tạo User Data từ localStorage hoặc data.js mặc định
  try {
    const savedUserData = localStorage.getItem('a9e_user_roster');
    if (savedUserData) {
      state.userData = JSON.parse(savedUserData);
    } else if (typeof DEFAULT_USER_DATA !== 'undefined') {
      state.userData = DEFAULT_USER_DATA;
    }
  } catch (e) {
    console.error("Lỗi đọc cache user data:", e);
    state.userData = typeof DEFAULT_USER_DATA !== 'undefined' ? DEFAULT_USER_DATA : null;
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
    localStorage.setItem('a9e_growth_target', state.growthTarget);
    localStorage.setItem('a9e_cycle_days', state.cycleDays.toString());
    localStorage.setItem('a9e_x', state.x.toString());
    localStorage.setItem('a9e_weights', JSON.stringify(state.weights));
  }

  // Chạy tối ưu hóa và render lại toàn bộ UI
  function updateOptimizer() {
    if (typeof A9EOptimizer === 'undefined' || typeof FULL_SKILLS_DATA === 'undefined') {
      console.warn("Chưa tải xong module Optimizer hoặc dữ liệu!");
      return;
    }

    const useUserRoster = (state.mode === 'user');
    const ops = A9EOptimizer.parseAllOperators(FULL_SKILLS_DATA, state.userData, useUserRoster);

    const roomConfigs = {
      mfg1: { cabin: 'MFG Cabin', type: 'char_exp' },
      mfg2: { cabin: 'MFG Cabin', type: 'weapon_exp' },
      growth: { cabin: 'Growth Chamber', type: state.growthTarget },
      reception: { cabin: 'Reception Room', type: 'clue' },
      nexus: { cabin: 'Control Nexus', type: 'regen' }
    };

    // Bước 1: Xếp đội hình cho Ca 1
    const shift1Res = A9EOptimizer.assignShiftTeams(ops, roomConfigs, state.weights);

    // Bước 2: Lọc các cán viên còn lại cho Ca 2
    const remainingOps = ops.filter(op => !shift1Res.usedOps.has(op.name));
    const shift2Res = A9EOptimizer.assignShiftTeams(remainingOps, roomConfigs, state.weights);

    // Bước 3: Mô phỏng chu kỳ và tính sản lượng
    const simResult = A9EOptimizer.simulateCycle(
      shift1Res.assignment,
      shift2Res.assignment,
      roomConfigs,
      state.x,
      state.cycleDays,
      7.2,
      12.0
    );

    // Bước 4: Tự động tính toán x tối ưu để hiển thị gợi ý
    const autoOpt = A9EOptimizer.findOptimalX(
      shift1Res.assignment,
      shift2Res.assignment,
      roomConfigs,
      state.weights,
      state.cycleDays,
      7.2,
      12.0
    );

    renderUI(ops, shift1Res.assignment, shift2Res.assignment, simResult, autoOpt);
  }

  // Render toàn bộ giao diện HTML
  function renderUI(allOps, shift1Teams, shift2Teams, simResult, autoOpt) {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const remainHours = 24 - state.x;

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
          <!-- Button Group Chọn Chế Độ Dữ Liệu -->
          <div class="btn-group">
            <button class="btn-group-btn ${state.mode === 'all' ? 'active' : ''}" id="btnModeAll">${t('btnModeAll')}</button>
            <button class="btn-group-btn ${state.mode === 'user' ? 'active' : ''}" id="btnModeUser">${t('btnModeUser')}</button>
          </div>

          <!-- Button Group Chọn Ngôn Ngữ -->
          <div class="btn-group">
            <button class="btn-group-btn ${state.lang === 'vi' ? 'active' : ''}" id="btnLangVi">${t('btnLangVi')}</button>
            <button class="btn-group-btn ${state.lang === 'en' ? 'active' : ''}" id="btnLangEn">${t('btnLangEn')}</button>
          </div>
        </div>
      </header>

      ${accountHtml}

      <!-- Settings & Controls Grid -->
      <div class="controls-grid">
        <!-- Card 1: Phân ca theo giờ (x) -->
        <div class="control-card glass-panel">
          <div class="control-card-header">⏰ ${t('shiftSliderTitle')}</div>
          
          <div class="slider-group">
            <div class="slider-label">
              <span>${t('shift1TimeDesc', { x: state.x })}</span>
              <span class="slider-value">x = ${state.x}h</span>
            </div>
            <input type="range" id="shiftXSlider" min="1" max="23" value="${state.x}" />
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
              ${t('shift2TimeDesc', { x: state.x, remain: remainHours })}
            </div>
          </div>

          <div class="auto-optimal-box">
            <div class="auto-optimal-text">
              <strong>${t('btnAutoOptimal')}:</strong> ${t('autoOptimalDesc', { x: autoOpt.bestX, reason: `Max ${autoOpt.maxWeightedOutput} pts` })}
            </div>
            <button class="btn-primary" id="btnApplyAutoX" style="padding:0.35rem 0.75rem; font-size:0.78rem;">
              Áp Dụng x=${autoOpt.bestX}
            </button>
          </div>

          <!-- Chu kỳ mô phỏng -->
          <div style="margin-top:1rem;">
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.4rem;">${t('cycleTitle')}:</div>
            <div class="btn-group" style="width:100%; display:flex;">
              <button class="btn-group-btn ${state.cycleDays === 1 ? 'active' : ''}" style="flex:1;" data-cycle="1">${t('cycle1')}</button>
              <button class="btn-group-btn ${state.cycleDays === 3 ? 'active' : ''}" style="flex:1;" data-cycle="3">${t('cycle3')}</button>
              <button class="btn-group-btn ${state.cycleDays === 7 ? 'active' : ''}" style="flex:1;" data-cycle="7">${t('cycle7')}</button>
            </div>
          </div>
        </div>

        <!-- Card 2: Cấu hình sản phẩm Buồng Phát Triển & Trọng số -->
        <div class="control-card glass-panel">
          <div class="control-card-header">🌱 ${t('growthTargetTitle')}</div>
          <div class="btn-group" style="width:100%; display:flex; margin-bottom:1rem;">
            <button class="btn-group-btn ${state.growthTarget === 'plant' ? 'active' : ''}" style="flex:1;" data-growth="plant">${t('plantTarget')}</button>
            <button class="btn-group-btn ${state.growthTarget === 'mineral' ? 'active' : ''}" style="flex:1;" data-growth="mineral">${t('mineralTarget')}</button>
            <button class="btn-group-btn ${state.growthTarget === 'fungus' ? 'active' : ''}" style="flex:1;" data-growth="fungus">${t('fungusTarget')}</button>
          </div>

          <div class="control-card-header" style="color:var(--accent-cyan); font-size:0.85rem;">⚖ ${t('resourceWeights')}</div>
          
          <div class="slider-group">
            <div class="slider-label"><span>${t('wCharExp')}</span><span class="slider-value">${state.weights.char_exp.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="char_exp" min="0" max="3" step="0.2" value="${state.weights.char_exp}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wWeaponExp')}</span><span class="slider-value">${state.weights.weapon_exp.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="weapon_exp" min="0" max="3" step="0.2" value="${state.weights.weapon_exp}" />
          </div>

          <div class="slider-group">
            <div class="slider-label"><span>${t('wGrowth')}</span><span class="slider-value">${state.weights.growth.toFixed(1)}</span></div>
            <input type="range" class="weight-slider" data-weight="growth" min="0" max="3" step="0.2" value="${state.weights.growth}" />
          </div>
        </div>
      </div>

      <!-- Metrics Section (Thông Số Trung Bình Hàng Ngày) -->
      <div class="metrics-section glass-panel">
        <div class="metrics-header">
          <h2>📊 ${t('metricsTitle')} (${state.cycleDays}D Avg)</h2>
        </div>
        <div class="metrics-grid">
          <div class="metric-box">
            <div class="metric-title">${t('metricAvgEff')}</div>
            <div class="metric-num">${simResult.overallAvgEfficiency}%</div>
            <div class="metric-desc">Toàn bộ 4 phòng / 24h</div>
          </div>
          <div class="metric-box cyan">
            <div class="metric-title">${t('metricCharExp')}</div>
            <div class="metric-num">${simResult.results.mfg1.dailyTotalOutputAvg}</div>
            <div class="metric-desc">Hiệu suất TB: ${simResult.results.mfg1.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box cyan">
            <div class="metric-title">${t('metricWeaponExp')}</div>
            <div class="metric-num">${simResult.results.mfg2.dailyTotalOutputAvg}</div>
            <div class="metric-desc">Hiệu suất TB: ${simResult.results.mfg2.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box green">
            <div class="metric-title">${t('metricGrowth')}</div>
            <div class="metric-num">${simResult.results.growth.dailyTotalOutputAvg}</div>
            <div class="metric-desc">Hiệu suất TB: ${simResult.results.growth.dailyAvgEfficiency}%</div>
          </div>
          <div class="metric-box purple">
            <div class="metric-title">${t('metricClue')}</div>
            <div class="metric-num">${simResult.results.reception.dailyTotalOutputAvg}</div>
            <div class="metric-desc">Hiệu suất TB: ${simResult.results.reception.dailyAvgEfficiency}%</div>
          </div>
        </div>

        <button class="collapsible-trigger" id="btnToggleDetails">
          ${state.showDetails ? t('btnHideDetails') : t('btnShowDetails')}
        </button>

        <div class="collapsible-content ${state.showDetails ? 'open' : ''}" id="detailsContent">
          <div style="font-size:0.85rem; line-height:1.6; color:var(--text-secondary);">
            <p><strong>Cơ chế hồi phục Stamina:</strong> Tốc độ hồi cơ bản 12%/h. Nexus Ca 1 buff <strong>+${simResult.nexusShift1.totalRegenPct}%</strong> (tốc độ hồi ${simResult.regenSpeedShift1}%/h); Nexus Ca 2 buff <strong>+${simResult.nexusShift2.totalRegenPct}%</strong> (tốc độ hồi ${simResult.regenSpeedShift2}%/h).</p>
            <p><strong>Công thức tính:</strong> Sản lượng ngày = [Thời gian làm có stamina] × [100% + 40% × số người] × [100% + tổng % buff].</p>
          </div>
        </div>
      </div>

      <!-- 2 ROWS OUTPUT GỢI Ý TEAM & PHÂN CA -->
      <div class="shift-rows-section">
        <!-- DÒNG 1: CA 1 -->
        ${renderShiftRowCard(1, state.x, shift1Teams, simResult, 'mfg1', 'mfg2', 'growth', 'reception', 'nexus')}

        <!-- DÒNG 2: CA 2 -->
        ${renderShiftRowCard(2, remainHours, shift2Teams, simResult, 'mfg1', 'mfg2', 'growth', 'reception', 'nexus')}
      </div>

      <!-- Modal Cập nhật Data -->
      ${renderModalHtml()}

      <!-- Footer -->
      <footer>
        <p>A9E Dingjang Logistics Assistant &bull; Arknights: Endfield Fan-made Utility</p>
        <p style="margin-top:4px;">Project Source: <a href="https://github.com/ngtrungkhanh/A9E-Dingjang" target="_blank">github.com/ngtrungkhanh/A9E-Dingjang</a></p>
      </footer>
    `;

    bindEvents();
  }

  // Render Card của 1 Ca làm việc
  function renderShiftRowCard(shiftNum, durationHours, teams, simResult, ...roomKeys) {
    const isShift1 = (shiftNum === 1);
    const shiftClass = isShift1 ? '' : 'shift-2';
    const tagClass = isShift1 ? '' : 'shift-2-tag';
    const shiftKey = isShift1 ? 'shift1' : 'shift2';

    const titleText = isShift1
      ? t('shift1RowTitle', { x: durationHours })
      : t('shift2RowTitle', { x: state.x, remain: durationHours });

    const roomNames = {
      mfg1: t('mfg1Name'),
      mfg2: t('mfg2Name'),
      growth: `${t('growthName')} (${t(state.growthTarget + 'Target')})`,
      reception: t('receptionName'),
      nexus: t('nexusName')
    };

    let roomsHtml = '';
    for (const rKey of roomKeys) {
      const ops = teams[rKey] || [];
      const m = (rKey === 'nexus')
        ? (isShift1 ? simResult.nexusShift1 : simResult.nexusShift2)
        : simResult.results[rKey][shiftKey].metrics;

      const depletedHour = (rKey !== 'nexus') ? simResult.results[rKey][shiftKey].depletedHour : null;

      let chipsHtml = '';
      ops.forEach(op => {
        chipsHtml += `
          <div class="op-chip">
            <div class="op-chip-info">
              <span class="op-star">★${op.rarity || '5'}</span>
              <span class="op-chip-name">${op.name}</span>
            </div>
            <span class="op-chip-skills">Lv.${op.level || 90}</span>
          </div>
        `;
      });

      const staminaStatusHtml = depletedHour
        ? `<span class="stamina-depleted">${t('staminaDepleted', { h: depletedHour, rest: (durationHours - depletedHour).toFixed(1) })}</span>`
        : `<span class="stamina-ok">${t('staminaSafe')}</span>`;

      roomsHtml += `
        <div class="room-box">
          <div class="room-header">
            <span class="room-name">${roomNames[rKey]}</span>
            <span class="room-eff-badge">${rKey === 'nexus' ? `+${m.totalRegenPct}% Regen` : `${m.totalEffPct}% Eff`}</span>
          </div>
          <div class="operator-chips">${chipsHtml}</div>
          <div class="room-stamina-status">
            <span>${rKey === 'nexus' ? `${ops.length} Cán viên` : t('burnRateLabel', { burn: m.actualBurnRate })}</span>
            ${rKey === 'nexus' ? '<span class="stamina-ok">✓ Active</span>' : staminaStatusHtml}
          </div>
        </div>
      `;
    }

    return `
      <div class="shift-row-card glass-panel ${shiftClass}">
        <div class="shift-title-bar">
          <div class="shift-badge-title">
            <span class="shift-tag ${tagClass}">CA ${shiftNum}</span>
            <span class="shift-name">${titleText}</span>
          </div>
          <div class="shift-time-range">${isShift1 ? `00:00 ➔ ${state.x}:00` : `${state.x}:00 ➔ 24:00`} (${durationHours}h)</div>
        </div>
        <div class="shift-rooms-grid">
          ${roomsHtml}
        </div>
      </div>
    `;
  }

  // Render Modal Upload / Snippet
  function renderModalHtml() {
    return `
      <div class="modal-overlay" id="dataModal">
        <div class="modal-dialog">
          <div class="modal-header">
            <h3>📥 ${t('modalTitle')}</h3>
            <button class="modal-close-btn" id="btnCloseModal">&times;</button>
          </div>
          <div class="modal-body">
            <!-- Tabs Modal -->
            <div class="btn-group" style="width:100%; display:flex; margin-bottom:1rem;">
              <button class="btn-group-btn ${state.activeModalTab === 'upload' ? 'active' : ''}" style="flex:1;" id="tabBtnUpload">${t('modalTabUpload')}</button>
              <button class="btn-group-btn ${state.activeModalTab === 'code' ? 'active' : ''}" style="flex:1;" id="tabBtnCode">${t('modalTabCode')}</button>
              <button class="btn-group-btn ${state.activeModalTab === 'raw' ? 'active' : ''}" style="flex:1;" id="tabBtnRaw">${t('modalTabRaw')}</button>
            </div>

            <!-- Tab 1: Upload File -->
            <div id="tabContentUpload" style="display:${state.activeModalTab === 'upload' ? 'block' : 'none'};">
              <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">${t('modalDropHelp')}</p>
              <input type="file" id="jsonFileInput" accept=".json" style="display:none;" />
              <button class="btn-primary" id="btnTriggerFileInput" style="width:100%; justify-content:center; padding:0.75rem;">
                📂 ${t('modalChooseFile')}
              </button>
            </div>

            <!-- Tab 2: Fast Snippet -->
            <div id="tabContentCode" style="display:${state.activeModalTab === 'code' ? 'block' : 'none'};">
              <p style="font-size:0.82rem; color:var(--text-secondary);">${t('modalBookmarkHelp')}</p>
              <div class="code-box" id="snippetCode">python D:\\ToiUuHauCan\\skport_crawler.py --cred &lt;SESSION_CODE&gt;</div>
              <button class="btn-secondary" id="btnCopySnippet" style="width:100%; justify-content:center; margin-top:0.5rem;">
                📋 ${t('modalCopyBtn')}
              </button>
            </div>

            <!-- Tab 3: Raw JSON -->
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

  // Gán sự kiện tương tác
  function bindEvents() {
    // Ngôn ngữ
    const btnVi = document.getElementById('btnLangVi');
    const btnEn = document.getElementById('btnLangEn');
    if (btnVi) btnVi.onclick = () => { state.lang = 'vi'; saveSettings(); updateOptimizer(); };
    if (btnEn) btnEn.onclick = () => { state.lang = 'en'; saveSettings(); updateOptimizer(); };

    // Chế độ dữ liệu
    const btnModeAll = document.getElementById('btnModeAll');
    const btnModeUser = document.getElementById('btnModeUser');
    if (btnModeAll) btnModeAll.onclick = () => { state.mode = 'all'; saveSettings(); updateOptimizer(); };
    if (btnModeUser) btnModeUser.onclick = () => { state.mode = 'user'; saveSettings(); updateOptimizer(); };

    // Slider phân ca x
    const shiftSlider = document.getElementById('shiftXSlider');
    if (shiftSlider) {
      shiftSlider.oninput = (e) => {
        state.x = parseInt(e.target.value, 10);
        saveSettings();
        updateOptimizer();
      };
    }

    // Nút áp dụng x tối ưu tự động
    const btnAutoX = document.getElementById('btnApplyAutoX');
    if (btnAutoX) {
      btnAutoX.onclick = () => {
        const autoOpt = A9EOptimizer.findOptimalX(
          A9EOptimizer.assignShiftTeams(A9EOptimizer.parseAllOperators(FULL_SKILLS_DATA, state.userData, state.mode === 'user'), {
            mfg1: { cabin: 'MFG Cabin', type: 'char_exp' },
            mfg2: { cabin: 'MFG Cabin', type: 'weapon_exp' },
            growth: { cabin: 'Growth Chamber', type: state.growthTarget },
            reception: { cabin: 'Reception Room', type: 'clue' },
            nexus: { cabin: 'Control Nexus', type: 'regen' }
          }, state.weights).assignment,
          A9EOptimizer.assignShiftTeams(A9EOptimizer.parseAllOperators(FULL_SKILLS_DATA, state.userData, state.mode === 'user'), {
            mfg1: { cabin: 'MFG Cabin', type: 'char_exp' },
            mfg2: { cabin: 'MFG Cabin', type: 'weapon_exp' },
            growth: { cabin: 'Growth Chamber', type: state.growthTarget },
            reception: { cabin: 'Reception Room', type: 'clue' },
            nexus: { cabin: 'Control Nexus', type: 'regen' }
          }, state.weights).assignment,
          {
            mfg1: { cabin: 'MFG Cabin', type: 'char_exp' },
            mfg2: { cabin: 'MFG Cabin', type: 'weapon_exp' },
            growth: { cabin: 'Growth Chamber', type: state.growthTarget },
            reception: { cabin: 'Reception Room', type: 'clue' },
            nexus: { cabin: 'Control Nexus', type: 'regen' }
          },
          state.weights,
          state.cycleDays,
          7.2,
          12.0
        );
        state.x = autoOpt.bestX;
        saveSettings();
        updateOptimizer();
      };
    }

    // Nút chọn Buồng Phát Triển
    document.querySelectorAll('[data-growth]').forEach(btn => {
      btn.onclick = () => {
        state.growthTarget = btn.getAttribute('data-growth');
        saveSettings();
        updateOptimizer();
      };
    });

    // Nút chọn Chu Kỳ
    document.querySelectorAll('[data-cycle]').forEach(btn => {
      btn.onclick = () => {
        state.cycleDays = parseInt(btn.getAttribute('data-cycle'), 10);
        saveSettings();
        updateOptimizer();
      };
    });

    // Sliders Trọng số
    document.querySelectorAll('.weight-slider').forEach(sl => {
      sl.oninput = (e) => {
        const wKey = e.target.getAttribute('data-weight');
        state.weights[wKey] = parseFloat(e.target.value);
        saveSettings();
        updateOptimizer();
      };
    });

    // Gập mở chi tiết
    const btnToggleDetails = document.getElementById('btnToggleDetails');
    if (btnToggleDetails) {
      btnToggleDetails.onclick = () => {
        state.showDetails = !state.showDetails;
        const detailsEl = document.getElementById('detailsContent');
        if (detailsEl) {
          detailsEl.classList.toggle('open', state.showDetails);
          btnToggleDetails.innerText = state.showDetails ? t('btnHideDetails') : t('btnShowDetails');
        }
      };
    }

    // Modal
    const btnOpenModal = document.getElementById('btnOpenModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const modalEl = document.getElementById('dataModal');

    if (btnOpenModal && modalEl) btnOpenModal.onclick = () => modalEl.classList.add('open');
    if (btnCloseModal && modalEl) btnCloseModal.onclick = () => modalEl.classList.remove('open');

    // Tab modal
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
          state.userData = typeof DEFAULT_USER_DATA !== 'undefined' ? DEFAULT_USER_DATA : null;
          state.mode = 'all';
          state.x = 12;
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

  // Khởi động khi tải xong trang
  window.addEventListener('DOMContentLoaded', () => {
    updateOptimizer();
  });

})();
