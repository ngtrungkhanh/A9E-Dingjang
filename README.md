# A9E Dingjang - Trợ Lý Tối Ưu Hậu Cần Trạm Đế Giang (Arknights: Endfield)

> **Live Web Demo:** [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/)  
> **Repository:** [https://github.com/ngtrungkhanh/A9E-Dingjang](https://github.com/ngtrungkhanh/A9E-Dingjang)  
> **Kiến Trúc Kỹ Thuật:** [agent.md](file:///D:/ToiUuHauCan/agent.md)

Ứng dụng web chạy **100% Client-side Offline**, hỗ trợ game thủ *Arknights: Endfield* tính toán, phân ca độc lập từng phòng và bố trí nhân sự vào các phòng sản xuất trên trạm Dijiang (Đế Giang) nhằm tối đa hóa sản lượng tài nguyên mà không bao giờ bị cháy ca (cạn stamina).

---

## 🌟 Tính Năng Nổi Bật (v2.5)

1. **Quy Đổi Toàn Bộ Về Sanity (Thể Lực) / Ngày:**
   * Chuẩn hóa thống nhất 100% sản lượng ra đơn vị Sanity: Khoang SX 1 (11.55 San), Khoang SX 2 (11.55 San), Buồng Nuôi Trồng (3.47 San), Phòng Tiếp Khách (5.78 San).
   * Đạt đỉnh sản lượng căn cứ chuẩn: **130.5 Sanity/ngày**.

2. **Đồng Bộ Giao Ca Tự Động (Nhập Giờ Tùy Ý - Không Giảm Sản Lượng):**
   * Cho phép nhập tự do mốc giờ giao ca (ví dụ: `19:00`, `20:00`, `12:00`...).
   * Tất cả 4 khoang sản xuất và Control Nexus cùng chuyển giao ca đúng vào mốc giờ đã chọn.
   * Giữ nguyên số giờ làm việc tối ưu ($x_i$) của từng phòng $\implies$ **Bảo toàn 100% sản lượng, không làm giảm dù chỉ 0.1 Sanity.**

3. **Kiểm Định Chu Kỳ Bền Vững Stamina Trực Tiếp Từng Phòng:**
   * Tích hợp nhãn trạng thái xoay vòng ngay trên thẻ phòng: `✓ Chu kỳ xoay vòng an toàn 100% Stamina`.
   * Nếu người chơi cấu hình ca làm việc quá tải, hệ thống tự động tính toán chính xác số chu kỳ chịu đựng: `⚠️ Sau XX vòng lặp sẽ không đủ Stamina!`.
   * Chi tiết tiêu hao khi đi làm, pin sạc khi nghỉ ngơi và mức pin vào ca chu kỳ mới hiển thị chi tiết trong từng ca trực.

4. **Hệ Số Ưu Tiên Tài Nguyên Dạng Lưới 3 Cột 2 Hàng:**
   * **Hàng 1:** EXP Cán Viên, EXP Vũ Khí, Manh Mối.
   * **Hàng 2:** Cây Trồng, Khoáng Sản, Nấm.
   * Đóng vai trò là hệ số nhân cuối độc lập, cho phép người dùng ưu tiên loại tài nguyên đang thiếu.

5. **Đề Xuất Nâng Cấp Cán Viên Tối Ưu Chi Phí (ROI Ranking):**
   * Xếp hạng nâng cấp nhân vật để mở thêm kỹ năng căn cứ (Lv 20, 40, 60, 80).
   * Phân tầng trực quan: `[⚡ Hoàn vốn nhanh]`, `[🔷 Hợp lý]`, `[🔶 Dài hạn (Đi kèm Combat)]`.
   * Hiển thị số ngày hồi vốn và lượng Sanity tăng thêm mỗi ngày.

6. **100% Offline & Bảo Mật Tuyệt Đối:**
   * Toàn bộ dữ liệu cá nhân chỉ lưu trong LocalStorage của trình duyệt, không gửi ra ngoài.

---

## 📁 Cấu Trúc Thư Mục Dự Án

* `index.html`, `style.css`, `app.js`, `optimizer.js`, `data.js`, `sanity_costs.js`: Ứng dụng web chạy trực tiếp.
* `agent.md`: Đặc tả kiến trúc, công thức toán học và tài liệu phát triển dành cho Agent / Developers.
* `docs/`: Tài liệu chi tiết hướng dẫn cào dữ liệu SKPORT, bảng chi phí Sanity và cơ chế Stamina.
* `scripts/`: Tool Python cào dữ liệu `scripts/skport_crawler.py`.
* `data/`: Bộ dữ liệu JSON tĩnh về kỹ năng căn cứ và tài nguyên ải.

---

## 🚀 Hướng Dẫn Sử Dụng
1. Mở file [index.html](file:///D:/ToiUuHauCan/index.html) trực tiếp trong máy hoặc truy cập [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/).
2. Bấm **"📂 Cập Nhật Data / SKPORT"** và chọn file `roster_summary.json` từ thư mục `D:\ToiUuHauCan` để nạp kho cán viên của bạn!
