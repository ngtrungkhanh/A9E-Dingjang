# TỔNG HỢP CƠ CHẾ TÍNH HIỆU SUẤT & STAMINA

Tài liệu này tổng hợp quy tắc hoạt động thực tế của hệ thống nhân sự, giúp bạn dễ dàng tính toán sản lượng và thời gian trụ ca của từng đội hình.

---

## 1. Các thông số cơ bản (Mặc định)

* **Hiệu suất gốc của công việc:** 100%
* **Hiệu suất cộng thêm cho mỗi người làm việc:** +40% / người
* **Stamina (Tâm trạng) ban đầu:** 100%
* **Tốc độ tiêu hao Stamina mặc định:** 7.2% mỗi giờ (tương đương 0.12% mỗi phút)
* **Thời gian làm việc chuẩn (từ 100% về 0% Stamina):** 13 giờ 53 phút 20 giây (hiển thị làm tròn trong game là **13h53p**)

---

## 2. Quy tắc và Công thức tính

### A. Cách tính Hiệu suất làm việc (Sản lượng)
Hệ thống chia chỉ số hiệu suất làm **2 nhóm**, cộng dồn trong từng nhóm rồi mới nhân 2 nhóm với nhau:
* **Nhóm 1 (Theo số lượng người):** Lấy 100% + (40% x Số người trong team).
  * 1 người = 140%
  * 2 người = 180%
  * 3 người = 220%
* **Nhóm 2 (Theo kỹ năng nhân viên):** Cộng dồn tất cả chỉ số `% tăng hiệu suất` của mọi người trong team lại, sau đó cộng thêm 100%.

> **Công thức:**  
> **Hiệu suất tổng = [100% + (40% x Số người)] x [100% + Tổng % buff hiệu suất của cả team]**

*Ví dụ minh họa (Team gồm A + A + C):*
* Nhóm 1 (3 người): 100% + (40% x 3) = **220%**
* Nhóm 2 (2 nhân viên A, mỗi người +30%): 100% + 30% + 30% = **160%**
* Hiệu suất tổng = 220% x 160% = **352%**

---

### B. Cách tính Thời gian làm việc (Giảm hao Stamina)
Tất cả kỹ năng làm chậm mức giảm tâm trạng/stamina của cả team được **cộng dồn trực tiếp** với nhau.

> **Công thức:**  
> **Tốc độ hao thực tế = 7.2% x (100% - Tổng % giảm hao của cả team)**  
> **Thời gian làm việc = 100% / Tốc độ hao thực tế**  
> *(Hoặc tính nhanh: **Thời gian làm việc = 13h 53p 20s / (100% - Tổng % giảm hao)**)*

*Ví dụ minh họa (Team gồm A + B + A):*
* Tổng % giảm hao = 18% (A) + 14% (B) + 18% (A) = **50%**
* Mức tiêu hao còn lại = 100% - 50% = **50%** (tức tốc độ hao giảm một nửa, chỉ còn 3.6%/giờ)
* Thời gian làm việc = 13h 53p 20s / 50% = **27h 46p 40s** (game hiển thị **27h46p**)

---

## 3. Bảng tra cứu nhanh các đội hình phổ biến

**Thông tin nhân viên mẫu:**
* **Nhân viên A:** Giảm 18% tốc độ tụt tâm trạng toàn team, tăng 30% hiệu suất.
* **Nhân viên B:** Giảm 14% tốc độ tụt tâm trạng toàn team.
* **Nhân viên C:** Không có hiệu ứng đặc biệt.

| Đội hình | Số người | Hiệu suất tổng | Tổng giảm hao | Tốc độ hao / giờ | Thời gian làm việc chuẩn |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **1 người (C)** | 1 | 140% | 0% | 7.200% | 13h 53p |
| **2 người (2C)** | 2 | 180% | 0% | 7.200% | 13h 53p |
| **3 người (3C)** | 3 | 220% | 0% | 7.200% | 13h 53p |
| **A + C** | 2 | 234% | 18% | 5.904% | 16h 56p |
| **A + C + C** | 3 | 286% | 18% | 5.904% | 16h 56p |
| **A + B + C** | 3 | 286% | 32% | 4.896% | 20h 25p |
| **A + A + C** | 3 | 352% | 36% | 4.608% | 21h 42p |
| **A + B + A** | 3 | 352% | 50% | 3.600% | 27h 46p |
| **A + A + A** | 3 | 418% | 54% | 3.312% | 30h 11p |

---

## 4. Mẹo tối ưu đội hình

1. **Dồn hiệu ứng giảm hao vào cùng một ca:** Vì tổng giảm hao nằm ở phép chia (mẫu số), chỉ số này càng cao thì thời gian tăng thêm càng lớn theo cấp số nhân. 
   * *Ví dụ:* Giảm từ 0% lên 18% chỉ giúp làm thêm được khoảng **3 tiếng**, nhưng tăng từ 36% lên 54% (cùng là cộng thêm 18%) lại giúp làm thêm được tới **8 tiếng rưỡi**.
2. **Dồn hiệu ứng tăng sản lượng vào team đủ 3 người:** Do hiệu suất nhân viên nhân trực tiếp với sản lượng nền của số người, việc đặt nhân viên buff hiệu suất vào team đủ 3 người (nền 220%) sẽ cho ra lượng sản phẩm tối đa.