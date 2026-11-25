# TÀI LIỆU QUY ĐỔI SANITY & CHI PHÍ TÀI NGUYÊN NÂNG CẤP CÁN VIÊN
## (A9E Dingjang - Arknights: Endfield)

> **File dữ liệu kèm theo:**
> * `sanity_resource_costs.json`: Dữ liệu gốc chuẩn định dạng JSON, phân tách chi tiết từng ải, vật phẩm và mốc cấp độ.
> * `sanity_costs.js`: Thư viện tính toán Client-side 100% Offline (chứa `window.A9E_SANITY_DATA`), tích hợp trực tiếp vào ứng dụng web để tính ROI / Stamina nâng cấp cán viên.

---

## 1. Tỷ Lệ Quy Đổi Stamina / Sanity Trên Mỗi Đơn Vị Tài Nguyên
*(Dựa trên Protocol Space cấp cao nhất - 80 Sanity/lượt chạy)*

| Loại Tài Nguyên | Nguồn Thu Nhập (Ải 80 Sanity) | Tỷ Lệ Drop | Sanity / Đơn Vị | Hiệu Suất / 1 Sanity |
| :--- | :--- | :--- | :--- | :--- |
| **T-Creds** | Nhiệm vụ / Protocol Space tiền | 34,000 TC / 80 San | **0.002353 San** | **425 T-Creds / Sanity** |
| **Operator EXP (1-60)** | *Manifested Nightmares* (Set A) | 17 Adv Combat Record (170k EXP) | **0.000471 San** | **2,125 EXP / Sanity** |
| **Operator EXP (61-80)** | *Manifested Nightmares* (Set B) | 6 Adv + 8 Elem Cog Carrier (68k EXP) | **0.001176 San** | **850 EXP / Sanity** |
| **Protodisk** (Item 107) | *Tacit Maelstrom* (Set A) | 34 đĩa / 80 San | **2.3529 San** | ~0.425 đĩa / Sanity |
| **Protoset** (Item 108) | *Tacit Maelstrom* (Set B) | 14 bộ / 80 San | **5.7143 San** | ~0.175 bộ / Sanity |
| **Protoprism** (Item 109) | *Mirage of the Tower* (Set A) | 85 lăng kính / 80 San | **0.9412 San** | ~1.06 lăng kính / Sanity |
| **Protohedron** (Item 110) | *Mirage of the Tower* (Set B) | 17 khối đa diện / 80 San | **4.7059 San** | ~0.21 khối / Sanity |
| **Rare Progression Mat** | Hazardous Material | 1 item / 13.33 San | **13.3333 San** | ~0.075 item / Sanity |
| **Weapon EXP** | *Gunsmith's Mound* | 16 Set + 10 Kit (170,000 W-EXP) | **0.000471 San** | **2,125 W-EXP / Sanity** |
| **Cast Die** | *Forge Trials Lv.5* (Set A) | 34 khuôn / 80 San | **2.3529 San** | ~0.425 khuôn / Sanity |
| **Heavy Cast Die** | *Forge Trials Lv.5* (Set B) | 14 khuôn nặng / 80 San | **5.7143 San** | ~0.175 khuôn / Sanity |
| **Nấm & Cây Trồng** | Buồng phát triển (Growth Chamber) | Tự trồng / Nhặt dã ngoại | **0 San** | Miễn phí |

---

## 2. Chi Phí Tài Nguyên Trọn Gói Theo 4 Mốc Skill Base

Mỗi cán viên cần nâng qua 4 mốc để mở khóa và tối đa hóa toàn bộ kỹ năng căn cứ (trạm Đế Giang):

```
[Level 1 -> Lv 20] ──> [Đột phá E1] ──> [Mở Node Skill 1-1] ──> MỐC 1:  44.7 Sanity
        │
[Level 20 -> Lv 40] ─> [Đột phá E2] ──> [Mở Node Skill 2-1] ──> MỐC 2: +243.2 Sanity (Tích lũy:  287.9 San)
        │
[Level 40 -> Lv 60] ─> [Đột phá E3] ──> [Mở Node Skill 1-2] ──> MỐC 3: +550.2 Sanity (Tích lũy:  838.0 San)
        │
[Level 60 -> Lv 80] ─> [Đột phá E4] ──> [Mở Node Skill 2-2] ──> MỐC 4: +1,695.4 Sanity (Tích lũy: 2,533.5 San)
```

### Chi tiết từng mốc:

#### Mốc 1: Base Skill 1 (Cấp 1 - α/β) | Yêu cầu: Lv.20 & Đột phá E1
* **Cày cấp (Lv 1 $\to$ 20):** 22,860 EXP (10.76 San) + 820 TC (1.93 San)
* **Đột phá Promotion I:** 8 Protodisk (18.82 San) + 1,600 TC (3.76 San)
* **Node Skill:** 6 Protoprism (5.65 San) + 1,600 TC (3.76 San)
* 👉 **Chi phí riêng mốc này:** **44.69 Sanity**
* 👉 **Xếp hạng ROI:** **S+++ (Siêu Hời)** - Chưa tới 1 bình thể lực ngày đã mở được kỹ năng đầu tiên.

#### Mốc 2: Base Skill 2 (Cấp 1 - α/β) | Yêu cầu: Lv.40 & Đột phá E2
* **Cày cấp (Lv 20 $\to$ 40):** 248,540 EXP (116.96 San) + 12,540 TC (29.51 San)
* **Outfitting I (Blue):** 1,800 TC (4.24 San)
* **Đột phá Promotion II:** 25 Protodisk (58.82 San) + 6,500 TC (15.29 San)
* **Node Skill:** 12 Protoprism (11.29 San) + 3,000 TC (7.06 San)
* 👉 **Chi phí tăng thêm:** **243.17 Sanity**
* 👉 **Tích lũy từ đầu (Mốc 1 + 2):** **287.86 Sanity** (~1.2 ngày stamina)
* 👉 **Xếp hạng ROI:** **S+ (Rất Hời)** - Chỉ tốn thêm ~1 ngày stamina để sở hữu trọn vẹn 2 kỹ năng làm việc.

#### Mốc 3: Base Skill 1 (Cấp 2 - β/γ) | Yêu cầu: Lv.60 & Đột phá E3
* **Cày cấp (Lv 40 $\to$ 60):** 475,710 EXP (223.86 San) + 23,900 TC (56.24 San)
* **Outfitting II (Purple):** 6,500 TC (15.29 San)
* **Đột phá Promotion III:** 24 Protoset (137.14 San) + 18,000 TC (42.35 San)
* **Node Skill:** 12 Protohedron (56.47 San) + 8,000 TC (18.82 San)
* 👉 **Chi phí tăng thêm:** **550.18 Sanity**
* 👉 **Tích lũy từ đầu (Mốc 1 + 2 + 3):** **838.04 Sanity** (~3.5 ngày stamina)
* 👉 **Xếp hạng ROI:** **A (Khá Tốt)** - Tốn thêm ~2.3 ngày stamina để max kỹ năng nhánh 1 (ưu tiên cho các vị trí Control Nexus hoặc Sản xuất cốt lõi).

#### Mốc 4: Base Skill 2 (Cấp 2 - β/γ) | Yêu cầu: Lv.80 & Đột phá E4
* **Cày cấp (Lv 60 $\to$ 80):** 465,230 EXP Cognitive Carriers (547.33 San) + 109,180 TC (256.89 San)
* **Outfitting III (Gold):** 18,000 TC (42.35 San)
* **Đột phá Promotion IV:** 36 Protoset (205.71 San) + 100,000 TC (235.29 San) + 20 Rare Materials (266.67 San)
* **Node Skill:** 20 Protohedron (94.12 San) + 20,000 TC (47.06 San)
* 👉 **Chi phí tăng thêm:** **1,695.43 Sanity**
* 👉 **Tích lũy từ đầu (Mốc 1 + 2 + 3 + 4):** **2,533.47 Sanity** (~10.5 ngày stamina)
* 👉 **Xếp hạng ROI:** **B/C (Rất Đắt)** - Tốn thêm ~7 ngày stamina cày cuốc, chỉ nên nâng cho cán viên có kỹ năng buff toàn trạm.

---

## 3. Cách Sử Dụng Trong Web App (`index.html` / `app.js` / `optimizer.js`)

Thêm thẻ script vào `index.html` trước `optimizer.js` và `app.js`:

```html
<script src="sanity_costs.js"></script>
<script src="optimizer.js"></script>
<script src="app.js"></script>
```

Sau đó trong `optimizer.js`, thay thế hàm tính vốn cũ bằng hàm tính chính xác theo Sanity:

```javascript
// Thay vì hàm cũ trả về hệ số 1, 2, 4, 8, 16, 32:
function calculateLevelUpCost(curLvl, targetLvl) {
  if (window.A9E_SANITY_DATA) {
    var targetMilestone = 1;
    if (targetLvl >= 80) targetMilestone = 4;
    else if (targetLvl >= 60) targetMilestone = 3;
    else if (targetLvl >= 40) targetMilestone = 2;
    return window.A9E_SANITY_DATA.calculateSanityToMilestone(curLvl, targetMilestone);
  }
  // fallback nếu chưa nạp file
  return 1;
}
```
Công thức này sẽ biến bảng xếp hạng ROI nâng cấp cán viên thành:
$$\text{ROI} = \frac{\Delta \text{Hiệu Suất Đầu Ra}}{\text{Tổng Sanity Tiêu Hao}}$$
Giúp người chơi nhìn thấy chính xác: **Bỏ ra bao nhiêu Stamina cày thì thu về bao nhiêu % sản lượng trên trạm Đế Giang!**
