# AGENT ARCHITECTURE & SPECIFICATION GUIDE
## A9E Dingjang Logistics Assistant &bull; Arknights: Endfield

Tài liệu này chuẩn hóa toàn bộ cấu trúc dự án, mô hình toán học, thuật toán tối ưu và quy tắc phát triển dành cho các Agent hoặc nhà phát triển tiếp quản dự án **A9E Dingjang**.

---

## 1. Tổng Quan Dự Án & Mục Tiêu

* **Mục tiêu:** Cung cấp công cụ tối ưu hóa phân ca và bố trí nhân sự trạm Dijiang (Đế Giang) trong game *Arknights: Endfield*, quy đổi toàn bộ sản lượng về đơn vị **Sanity (Thể Lực) / ngày** để người chơi đưa ra quyết định có lợi nhất.
* **Môi trường hoạt động:** Chạy **100% Client-side Offline** trên trình duyệt (hỗ trợ lưu trạng thái qua `LocalStorage`), không gửi dữ liệu cá nhân ra máy chủ bên ngoài.
* **Live Deployment:** [GitHub Pages](https://ngtrungkhanh.github.io/A9E-Dingjang/) từ nhánh `main` tại thư mục gốc.

---

## 2. Quy Hoạch Cấu Trúc Thư Mục

```
D:\ToiUuHauCan\
├── index.html                  # Single Page Application entry point
├── style.css                   # Giao diện Glassmorphism responsive
├── app.js                      # Controller & UI Renderer, quản lý state và event
├── optimizer.js                # Core Mathematical Engine: mô phỏng chu kỳ & thuật toán hoán đổi
├── data.js                     # CSDL danh sách cán viên và kỹ năng căn cứ Endfield
├── sanity_costs.js             # Bảng quy đổi Sanity, chi phí nâng cấp cán viên theo level
├── agent.md                    # Tài liệu kiến trúc & đặc tả vận hành dành cho Agent
├── README.md                   # Tài liệu hướng dẫn sử dụng cho người dùng
├── .gitignore                  # Chặn tải lên dữ liệu cá nhân của người dùng
│
├── docs/                       # Tài liệu hướng dẫn chi tiết
│   ├── HUONG_DAN_CAO_DATA_SKPORT.md  # Hướng dẫn cào dữ liệu từ SKPORT
│   ├── SANITY_COSTS_GUIDE.md         # Giải thích công thức chi phí Sanity
│   └── Stamina.md                    # Thực nghiệm & cơ chế Stamina Endfield
│
├── scripts/                    # Scripts tiện ích độc lập
│   └── skport_crawler.py       # Python script cào dữ liệu SKPORT về máy cá nhân
│
├── data/                       # Dữ liệu JSON tĩnh phục vụ tra cứu
│   ├── factory_skills_full_tiers.json # Chi tiết cây kỹ năng toàn bộ cán viên
│   └── sanity_resource_costs.json    # Chi tiết chi phí tài nguyên ải game
│
└── [Local Private Data]        # (Bị chặn bởi .gitignore, KHÔNG commit lên Git)
    ├── roster_summary.json     # Kho nhân vật cá nhân người dùng
    ├── endfield_card_detail.json
    ├── endfield_player_binding.json
    └── endfield_user_game_data.json
```

---

## 3. Các Mô Hình Toán Học Cốt Lõi

### 3.1. Mô Hình Quy Đổi Sản Lượng Ra Sanity / Ngày
Căn cứ dựa trên tỷ lệ tiêu hao ải game tiêu chuẩn (80 Sanity / lượt ải) và sản lượng thu được:
* **Khoang SX 1 (EXP Cán Viên - `mfg1`):** $11.5508\text{ San/ngày}$ tại mốc 100% hiệu suất chuẩn ($0.48128\text{ San/đơn vị giờ}$).
* **Khoang SX 2 (EXP Vũ Khí - `mfg2`):** $11.5508\text{ San/ngày}$ tại mốc 100% hiệu suất chuẩn ($0.48128\text{ San/đơn vị giờ}$).
* **Buồng Phát Triển (Nông Nghiệp - `growth`):** Đạt giá trị bằng $30\%$ Khoang EXP Vũ Khí $\implies 3.4652\text{ San/ngày}$ ($0.14438\text{ San/đơn vị giờ}$).
* **Phòng Tiếp Khách (Manh Mối - `reception`):** Đạt giá trị bằng $50\%$ Khoang EXP Vũ Khí $\implies 5.7754\text{ San/ngày}$ ($0.24064\text{ San/đơn vị giờ}$).
* **Hệ số đội hình:** Đội hình đầy đủ 3 cán viên có hệ số nền chuẩn là **2.2x** (1 cán viên lẻ = 1.0x).

### 3.2. Động Lực Học Stamina & Định Luật Bảo Toàn Năng Lượng
1. **Cơ chế hồi Stamina:** Cán viên **CHỈ HỒI STAMINA KHI NGHỈ NGƠI**. Khi đi làm chỉ hao Stamina theo tốc độ hao (chuẩn $7.2\%/\text{h}$ trừ đi skill giảm hao).
2. **Tốc độ hồi trạm:** Tốc độ nền là $12.0\%/\text{h}$ (đúng 5 phút / 1% Stamina). Khi hưởng buff của Trung Tâm Kiểm Soát (Control Nexus):
   $$\text{Tốc độ hồi} = 12.0\%/\text{h} \times (1 + \sum \text{buff}_{\text{nexus}})$$
3. **Phối hợp chu kỳ 24h:**
   * Ca 1 đi làm $x$ tiếng $\implies$ nghỉ ngơi $24 - x$ tiếng dưới sự sạc siêu tốc của Ca 2 Nexus (Ca Đêm).
   * Ca 2 đi làm $24 - x$ tiếng $\implies$ nghỉ ngơi $x$ tiếng dưới sự sạc của Ca 1 Nexus (Ca Ngày).
4. **Điều kiện quay vòng an toàn 100% Stamina vĩnh viễn:**
   $$(24 - x) \times \text{Regen} \ge x \times \text{Burn} \iff x \le \frac{24 \times \text{Regen}}{\text{Burn} + \text{Regen}}$$
   * Tại MFG 1 ($x = 19\text{h}$): Làm 19h hao 87.6%, nghỉ 5h sạc 88.8% $\implies$ $\Delta S = +1.2\% \implies$ **Đầy 100% pin mỗi chu kỳ.**
5. **Công thức số vòng lặp kiệt sức khi quá tải ($x > x^*$):**
   Nếu $\text{Burned} > \text{Recovered}$, độ hụt mỗi chu kỳ là $L = \text{Burned} - \text{Recovered} > 0$.
   Số chu kỳ trụ vững trước khi gục giữa ca:
   $$k_{\text{safe}} = \left\lfloor \frac{100 - \text{Burned}}{L} \right\rfloor + 1$$
   Sau $k_{\text{safe}}$ chu kỳ, cán viên sẽ cạn sạch pin giữa ca làm việc, dẫn đến hiệu suất rơi về 0% và làm sụt giảm nghiêm trọng sản lượng trung bình.
6. **Cơ chế Khi Cán Viên Cạn 0 Stamina Giữa Ca & Phân Tích Chu Kỳ Dao Động (Oscillating Limit-Cycle):**
   * **Quy tắc khi chạm 0 Stamina:** Khi cán viên cạn sạch 0 Stamina giữa ca, họ **nghỉ ngơi ngay lập tức** và bắt đầu hồi phục Stamina từ thời điểm đó (không phải chờ đến hết ca).
   * **Hiện tượng dao động con lắc 2 ngày (2-Day Limit Cycle):**
     * *Ngày 1 (Lẻ - Bắt đầu 100% pin):* Ca 1 làm việc 21h (hao 96.8%), nghỉ 3h (sạc 53.3%) $\implies$ Kết thúc ngày còn **56.5% pin**. Sản lượng Ngày 1 đạt đỉnh: **99.0**.
     * *Ngày 2 (Chẵn - Bắt đầu 56.5% pin):* Ca 1 chỉ đủ pin làm việc trong $56.5 / 4.608 = \mathbf{12.26\text{ giờ}}$! Khi chạm 0 pin, Ca 1 **nghỉ ngay lập tức**.
       * Ca 1 nghỉ từ 12.26h đến 21.00h (8.74h) và tiếp tục nghỉ trong Ca 2 (3.0h) $\implies$ Tổng giờ nghỉ là 11.74h.
       * Vì nghỉ dài, Ca 1 sạc đầy **100% pin** cho Ngày 3!
       * **NHƯNG:** Trong 8.74h Ca 1 nghỉ sớm (khi Ca 2 chưa đến giờ vào ca), buồng sản xuất bị bỏ trống $\implies$ Sản lượng Ngày 2 tụt dốc thảm hại còn **62.5**!
     * *Sản lượng trung bình:* $(\text{Ngày 1: } 99.0 + \text{Ngày 2: } 62.5) / 2 = \mathbf{80.75\text{ San/ngày}}$ (Tụt mất **17.7%** so với mốc 19h cố định đạt **98.12\text{ San/ngày}**)!
   * **Nguyên nhân toán học cốt lõi (Lãng phí do Cắt ngọn Stamina 100%):**
     * Trong Ngày 2, Ca 1 nghỉ 11.74h. Với tốc độ hồi pin $16-17\%/\text{h}$, Ca 1 chỉ mất **6.1h là đã sạc đầy 100% pin**.
     * Suốt $11.74 - 6.1 = \mathbf{5.64\text{ giờ còn lại}}$, Ca 1 ngồi chơi xơi nước ở mức 100% pin (Stamina bị cắt ngọn kịch trần ở 100%, không thể tích lũy thêm).
     * Số giờ làm việc trung bình của Ca 1 bị kéo tụt từ $19.0\text{h/ngày}$ xuống chỉ còn $\frac{21 + 12.26}{2} = \mathbf{16.63\text{h/ngày}}$!
     * Do đó, chu kỳ dao động quá tải vừa làm lãng phí tiềm năng sạc pin (tràn bình), vừa bỏ trống buồng sản xuất, cho sản lượng thấp hơn đáng kể so với việc giữ **$x = 19\text{h}$ bền vững 100% pin mỗi ngày**.
7. **Ràng buộc an toàn trong Thuật toán Đề xuất (`findOptimalXForRoom`):**
   * Thuật toán chỉ đề xuất các giá trị $x$ thỏa mãn đồng thời:
     * $x \times \text{BurnRate}_1 \le 100$ và $(24 - x) \times \text{RegenRate}_2 \ge x \times \text{BurnRate}_1$ (Ca 1 bền vững 100% pin)
     * $(24 - x) \times \text{BurnRate}_2 \le 100$ và $x \times \text{RegenRate}_1 \ge (24 - x) \times \text{BurnRate}_2$ (Ca 2 bền vững 100% pin)
   * Nhờ đó, nút `⚡ Đề xuất` luôn đồng nhất với huy hiệu `✓ Chu kỳ xoay vòng an toàn 100% Stamina`.

### 3.3. Đồng Bộ Mốc Giao Ca Căn Cứ (`syncHour`)
* Cho phép người dùng nhập tự do mốc giao ca $0 \le \text{syncHour} \le 23$ (mặc định 19:00).
* Tất cả các phòng cùng kết thúc Ca 1 và chuyển giao sang Ca 2 đúng tại $\text{syncHour}:00$.
* Lịch trình từng phòng tự động dịch chuyển:
  * Ca 1: $[(\text{syncHour} - x + 24) \bmod 24]:00 \longrightarrow \text{syncHour}:00$ ($x$ tiếng)
  * Ca 2: $\text{syncHour}:00 \longrightarrow [(\text{syncHour} - x + 24) \bmod 24]:00$ ($24 - x$ tiếng)
* **Bảo toàn sản lượng:** Việc đồng bộ chỉ thay đổi thời điểm bắt đầu trong ngày, hoàn toàn giữ nguyên số giờ tối ưu $x_i$ của từng phòng $\implies$ **Không làm giảm sản lượng (giữ vững đỉnh 130.5 San/ngày).**
* Nexus Ca 2 (Ca tối ưu hồi phục) tự động bắt đầu từ $\text{syncHour}:00$ và kéo dài 12 tiếng để bao trọn thời gian nghỉ ngơi của toàn bộ 12 cán viên Ca 1 sản xuất.

### 3.4. Hệ Số Ưu Tiên Độc Lập Dạng Lưới 3 Cột 2 Hàng
* Bảng nhập hệ số nhân cuối độc lập cho 6 loại tài nguyên:
  * **Hàng 1:** EXP Cán Viên (`char_exp`), EXP Vũ Khí (`weapon_exp`), Manh Mối (`clue`).
  * **Hàng 2:** Cây Trồng (`plant`), Khoáng Sản (`mineral`), Nấm (`fungus`).
* Hệ số nhân tác động trực tiếp lên giá trị Sanity quy đổi cuối cùng:
  $$\text{Sanity Quy Đổi} = \text{Sanity Gốc} \times \text{Hệ Số}$$
* Giúp người chơi định hướng tối ưu hóa căn cứ theo nhu cầu tài nguyên từng giai đoạn (ví dụ cần gấp EXP Vũ khí thì tăng hệ số lên 1.5).

---

## 4. Thuật Toán Tối Ưu Bố Trí Cán Viên (Global Swap Optimizer)

* **Ràng buộc cứng:** Mỗi cán viên chỉ xuất hiện ở đúng 1 vị trí (1 phòng, 1 ca duy nhất).
* **Ràng buộc Control Nexus:** Cán viên phân vào Nexus bắt buộc phải có kỹ năng thuộc cabin `Control Nexus` (không được đưa cán viên sản xuất thuần vào Nexus).
* **Phân bổ 2 giai đoạn:**
  1. *Khởi tạo tham lam (Greedy Initialization):* Xếp các cán viên có chỉ số cao nhất vào các phòng theo thứ tự trọng số.
  2. *Tìm kiếm cục bộ hoán đổi toàn cục (Global 2-Swap Local Search):* Thử nghiệm hoán đổi từng cặp cán viên giữa các phòng và giữa các ca trực để tối đa hóa hàm mục tiêu toàn căn cứ:
     $$\text{Score} = \sum_{\text{room}} \text{Sanity}_{\text{room}} \times w_{\text{room}}$$
* **Đề xuất nâng cấp (ROI Ranking):**
  * Tính vốn đầu tư Sanity mở khóa mốc cấp độ (Lv 20, 40, 60, 80).
  * Tính lượng Sanity thặng dư thu về thêm mỗi ngày $\Delta \text{San}$.
  * Phân tầng khuyến nghị:
    * `[⚡ Hoàn vốn nhanh]`: Hoàn vốn $< 30$ ngày.
    * `[🔷 Hợp lý]`: Hoàn vốn $30 - 90$ ngày.
    * `[🔶 Dài hạn (Đi kèm Combat)]`: Nâng cấp chủ yếu để đi đánh trận, kỹ năng căn cứ là lợi ích kèm theo.

---

## 5. Quy Tắc Phát Triển & Bảo Trì Dành Cho Agent

1. **Bảo mật dữ liệu người dùng:** Tuyệt đối không bao giờ commit hoặc push các file chứa dữ liệu cá nhân (`roster_summary.json`, `endfield_card_detail.json`, `endfield_player_binding.json`, `endfield_user_game_data.json`) lên kho Git công khai.
2. **Tính toàn vẹn của GitHub Pages:** Các file phục vụ web tĩnh (`index.html`, `style.css`, `app.js`, `data.js`, `optimizer.js`, `sanity_costs.js`) phải luôn nằm tại thư mục gốc để GitHub Pages hoạt động chính xác.
3. **Kiểm thử cú pháp trước khi commit:** Luôn chạy `node -c app.js; node -c optimizer.js` để đảm bảo không có lỗi cú pháp JavaScript trước khi đẩy mã nguồn.
4. **Nguyên tắc giao diện:** Giữ giao diện trực quan, hạn chế các đoạn văn bản diễn giải dài dòng, ưu tiên các khối thẻ chỉ số và nhãn trạng thái trực tiếp.
