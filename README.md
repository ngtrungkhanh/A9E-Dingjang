# A9E Dingjang - Trợ Lý Tối Ưu Hậu Cần Trạm Đế Giang (Arknights: Endfield)

> **Live Web Demo:** [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/)  
> **Repository:** [https://github.com/ngtrungkhanh/A9E-Dingjang](https://github.com/ngtrungkhanh/A9E-Dingjang)

Ứng dụng web chạy **100% Client-side Offline**, hỗ trợ game thủ *Arknights: Endfield* tính toán, phân ca độc lập từng phòng và bố trí nhân sự vào các phòng sản xuất trên trạm Dijiang (Đế Giang) nhằm tối đa hóa sản lượng tài nguyên mà không bao giờ bị cháy ca (cạn stamina).

---

## 🌟 Tính Năng Mới Nâng Cấp (v2.0)

1. **Phân Ca Độc Lập Cho Từng Phòng ($x_{\text{room}}$):**
   * Mỗi phòng có thời gian đổi ca riêng ($x \in [1, 23]$ giờ).
   * **Nút "⚡ Gợi ý x cho phòng này":** Tự động tìm mốc giờ $x$ tối ưu riêng của phòng đó dựa trên tốc độ hao và hiệu suất của Ca 1 & Ca 2.
   * **Nút "⚡ Tự Động Tối Ưu Phân Ca Tất Cả Phòng":** Tối ưu toàn bộ 5 phòng cùng 1 lúc chỉ trong 1 click.
2. **Quy Tắc Nghiêm Ngặt: 1 Cán Viên Chỉ Ở Đúng 1 Phòng:**
   * Thuật toán đảm bảo không có bất kỳ sự trùng lặp nhân sự nào giữa các phòng (MFG 1, MFG 2, Buồng Phát Triển, Tiếp Khách, Nexus).
3. **Đa Canh Tác Buồng Phát Triển (Multi-select Toggle):**
   * Cho phép chọn đồng thời 1, 2 hoặc cả 3 loại: *Cây Trồng Hóa Đá*, *Khoáng Sản Quý Hiếm*, *Vật Chất Nấm*.
4. **Tách Biệt Hệ Số Ưu Tiên 7 Tài Nguyên:**
   * EXP Cán Viên, EXP Vũ Khí, Cây Trồng Hóa Đá, Khoáng Sản Quý Hiếm, Vật Chất Nấm, Tốc Độ Manh Mối, Tái Tạo Tâm Trạng (Nexus).
5. **Công Thức Hồi Phục Tâm Trạng Chuẩn Xác Của Control Nexus:**
   * Mặc định khi không có ai: **12%/giờ**.
   * Khi có cán viên trực:
     $$\text{Tốc độ hồi Stamina toàn căn cứ} = 12\%/\text{giờ} \times \left(1 + \sum_{\text{op} \in \text{Nexus}} \text{buff}_{\text{op}}\right)$$
   * Bảng đối chiếu thực nghiệm:
     * 1 người +12%: $12 \times 1.12 = 13.44\%/\text{h} \to$ Ingame hiển thị **13%/h**
     * Thêm 1 người +8% (tổng 20%): $12 \times 1.20 = 14.40\%/\text{h} \to$ Ingame hiển thị **14%/h**
     * Thêm 1 người +16% (tổng 36%): $12 \times 1.36 = 16.32\%/\text{h} \to$ Ingame hiển thị **16%/h**
     * Xếp đủ 5 người Tier $\gamma$ (+80%): $12 \times 1.80 = 21.60\%/\text{h} \to$ Ingame hiển thị **22%/h**!
6. **Bảo Mật Tuyệt Đối (100% LocalStorage):**
   * Dữ liệu tài khoản của bạn chỉ lưu trong trình duyệt cục bộ, không gửi lên bất kỳ server mạng nào.

---

## 🚀 Hướng Dẫn Sử Dụng
Mở file [index.html](file:///D:/ToiUuHauCan/index.html) trực tiếp trong máy hoặc truy cập [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/).
Bấm **"Cập Nhật Data / SKPORT"** và chọn file `roster_summary.json` từ thư mục `D:\ToiUuHauCan` để nạp kho cán viên của bạn!
