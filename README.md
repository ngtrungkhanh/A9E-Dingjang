# A9E Dingjang - Trợ Lý Tối Ưu Hậu Cần Trạm Đế Giang (Arknights: Endfield)

> **Live Web Demo:** [https://ngtrungkhanh.github.io/A9E-Dingjang/](https://ngtrungkhanh.github.io/A9E-Dingjang/)  
> **Repository:** [https://github.com/ngtrungkhanh/A9E-Dingjang](https://github.com/ngtrungkhanh/A9E-Dingjang)

Ứng dụng web chạy **100% Client-side Offline**, hỗ trợ game thủ *Arknights: Endfield* tính toán, phân ca và sắp xếp cán viên vào các phòng sản xuất trên trạm vũ trụ Dijiang (Đế Giang) nhằm tối đa hóa sản lượng tài nguyên mà không bao giờ bị cháy ca (cạn stamina).

---

## 🌟 Tính Năng Nổi Bật

1. **Phân Ca Thông Minh (2 Ca Làm Việc $0 \to x$ và $x \to 24$):**
   * Cho phép tùy chỉnh mốc giờ chia ca $x$ ($1 \to 23$ giờ).
   * **Nút "⚡ Gợi Ý X Tối Ưu Tự Động":** Thuật toán quét toán học tìm mốc $x$ đem lại sản lượng trung bình ngày cao nhất mà không bị kiệt sức.
2. **Mô Phỏng Chu Kỳ Bền Vững (1 Ngày, 3 Ngày, 7 Ngày):**
   * Tính toán chính xác quá trình tiêu hao stamina trong ca làm và quá trình hồi phục ($12\%/\text{giờ}$ cơ bản + buff từ Trung Tâm Kiểm Soát Nexus).
   * Cảnh báo chính xác giờ cạn stamina nếu có.
3. **Song Ngữ Anh - Việt (i18n):**
   * Chuyển đổi ngôn ngữ tức thì Tiếng Việt / English bằng nút chọn tiện lợi.
4. **Hỗ Trợ 2 Chế Độ Dữ Liệu:**
   * **Toàn Bộ Cán Viên (Max Lv):** Dành cho việc thử nghiệm đội hình lý tưởng nhất của game.
   * **Tài Khoản Của Tôi:** Đồng bộ chính xác danh sách cán viên và cấp độ kỹ năng thực tế đang sở hữu qua SKPORT.
5. **Bảo Mật & Offline Cache (100% LocalStorage):**
   * Không lưu dữ liệu lên bất kỳ server bên ngoài nào.
   * Cung cấp tool cào dữ liệu offline `skport_crawler.py` kết nối trực tiếp với API Gryphline.

---

## 📐 Công Thức Tính Toán Chuẩn

* **Hiệu suất tổng của phòng:**
  $$\text{Hiệu suất} = [100\% + (40\% \times \text{Số người})] \times [100\% + \sum \% \text{buff sản lượng}]$$
* **Tốc độ tiêu hao Stamina:**
  $$\text{Tốc độ hao} = 7.2\%/\text{giờ} \times (100\% - \sum \% \text{giảm hao})$$
* **Tốc độ hồi phục khi nghỉ ngơi:**
  $$\text{Tốc độ hồi} = 12\%/\text{giờ} \times (100\% + \sum \% \text{Nexus buff})$$
* **Sản lượng trung bình ngày:**
  $$\bar{P} = \text{Sản lượng Ca 1} + \text{Sản lượng Ca 2}$$
* **Hiệu suất trung bình ngày:**
  $$\bar{E} = \frac{\bar{P}}{24} \quad (\%)$$

---

## 🚀 Hướng Dẫn Cập Nhật Dữ Liệu SKPORT Bằng Python

Khi bạn có thêm nhân vật mới hoặc lên cấp kỹ năng trong game:
```powershell
python skport_crawler.py --cred "SESSION_CODE_CUA_BAN"
```
Sau đó mở trang web, chọn **"Cập Nhật Data / SKPORT"** và nạp file `roster_summary.json` vừa tạo!
