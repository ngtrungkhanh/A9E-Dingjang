# A9E Dingjang - Trợ Lý Tối Ưu Hậu Cần Trạm Đế Giang (Arknights: Endfield)

> **Live Web Demo:** [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/)  
> **Repository:** [https://github.com/ngtrungkhanh/A9E-Dingjang](https://github.com/ngtrungkhanh/A9E-Dingjang)

Ứng dụng web chạy **100% Client-side Offline**, hỗ trợ game thủ *Arknights: Endfield* tính toán, phân ca độc lập từng phòng và bố trí nhân sự vào các phòng sản xuất trên trạm Dijiang (Đế Giang) nhằm tối đa hóa sản lượng tài nguyên mà không bao giờ bị cháy ca (cạn stamina).

---

## 🌟 Tính Năng Mới Nâng Cấp (v2.2)

1. **Trung Tâm Kiểm Soát (Control Nexus - 3 Slots) Đứng Đầu Tiên:**
   * Chuẩn hóa sức chứa: **3 cán viên Ca 1, 3 cán viên Ca 2**.
   * Hệ số tái tạo tâm trạng không còn là tài nguyên độc lập mà là biến điều phối tự động giúp toàn bộ 4 phòng còn lại hồi stamina siêu tốc khi nghỉ ngơi.
2. **Cơ Chế Phục Hồi Chuẩn Xác 100% Khớp Thực Nghiệm:**
   * Cán viên **CHỈ HỒI STAMINA KHI NGHỈ NGƠI** (khi làm việc chỉ hao stamina).
   * Tốc độ hồi: $12\%/\text{giờ} \times (1 + \sum \% \text{Nexus buff})$.
   * Mặc định (0 buff): **12%/giờ** (đúng 5 phút / 1% Stamina).
   * Có tích hợp **Widget Tra cứu nhanh thời gian hồi phục**: Nhập số % Stamina hiện tại để xem ngay thời gian hồi đầy.
3. **Phân Ca Độc Lập Bằng Nút Bấm Chọn (Không Dùng Thanh Kéo):**
   * Mỗi phòng có cụm nút bấm chọn giờ độc lập: `[-1h]`, `[8h]`, `[10h]`, `[12h]`, `[14h]`, `[16h]`, `[+1h]`.
   * Nút **"⚡ x=..."** đề xuất riêng cho phòng đó.
   * Nút **"⚡ Tự Động Tối Ưu Phân Ca Cho Tất Cả Phòng"** quét toán học toàn bộ trạm chỉ trong 1 click.
4. **Hiển Thị Chi Tiết Kỹ Năng Tác Động Tới Phòng:**
   * Từng cán viên trong phòng hiển thị rõ: Tên, Level, Số sao, và **Kỹ năng tác động** (Ví dụ: `+30% EXP Cán Viên, -18% Giảm hao`, `+16% Tái tạo tâm trạng`...).
5. **Đề Xuất Nâng Cấp Cán Viên Tối Ưu Chi Phí (ROI Ranking):**
   * Xếp hạng nâng cấp nhân vật để mở thêm kỹ năng căn cứ (mốc Lv 40, 60, 80).
   * Chi phí tiền vốn tính chuẩn xác theo mốc level:
     * 1-10: **1**
     * 11-20: **2**
     * 20-30: **4**
     * 30-40: **8**
     * 40-60: **16**
     * 60-80: **32**
   * Tự động tính chỉ số $\text{ROI} = \frac{\Delta \text{Hiệu Suất}}{\text{Tiền Vốn}}$ để gợi ý nâng ai hời nhất.
6. **Chu Kỳ Mô Phỏng Nhập Số Ngày Tùy Ý:**
   * Cho phép nhập tự do số ngày mô phỏng (ví dụ: 1 ngày, 3 ngày, 7 ngày, 14 ngày...).
7. **Đa Canh Tác Buồng Phát Triển & 6 Sliders Hệ Số:**
   * Chọn 1, 2 hoặc cả 3 loại: *Cây Trồng Hóa Đá*, *Khoáng Sản Quý Hiếm*, *Vật Chất Nấm*.
   * Tách bạch 6 sliders tài nguyên (EXP cán viên, EXP vũ khí, Cây trồng, Khoáng sản, Nấm, Manh mối).
8. **100% Offline & Bảo Mật:**
   * Toàn bộ dữ liệu cá nhân chỉ lưu trong LocalStorage của máy bạn, không lưu online.

---

## 🚀 Hướng Dẫn Sử Dụng
Mở file [index.html](file:///D:/ToiUuHauCan/index.html) trực tiếp trong máy hoặc truy cập [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/).
Bấm **"Cập Nhật Data / SKPORT"** và chọn file `roster_summary.json` từ thư mục `D:\ToiUuHauCan` để nạp kho cán viên của bạn!
