# Hướng Dẫn Kỹ Thuật: Trích Xuất & Cào Dữ Liệu SKPORT (Arknights: Endfield) Chạy 100% Offline

> **Dành cho:** Dự án Tối Ưu Hậu Cần (`D:\ToiUuHauCan`) và các dự án phân tích dữ liệu Arknights: Endfield độc lập.  
> **Nguyên tắc bảo mật:** Không gửi session token / cred qua bất kỳ server web bên thứ ba nào; toàn bộ quá trình xác thực và tải dữ liệu chạy trực tiếp giữa máy cá nhân và API chính thức của Gryphline (`zonai.skport.com`).

---

## 1. Bản Chất Đoạn Mã Lấy Session Code

Đoạn mã JavaScript trích xuất Session Code mà các công cụ cộng đồng (như EndfieldTools, Goyfield) sử dụng:

```javascript
(()=>{
  const s = t => {
    for (let i = 0; i < t.length; i++) {
      const k = t.key(i), v = t.getItem(k);
      if (!v) continue;
      if (/cred/i.test(k) && v.length >= 8 && v[0] !== '{') return v;
      if (v[0] === '{') try {
        const o = JSON.parse(v);
        if (o && typeof o.cred === 'string') return o.cred;
      } catch (e) {}
    }
    return null;
  };
  const ck = (document.cookie.match(/SK_OAUTH_CRED_KEY=([^;]+)/) || document.cookie.match(/(?:^|;\s*)cred=([^;]+)/) || [])[1];
  let c = localStorage.getItem('SK_OAUTH_CRED_KEY') || s(localStorage) || s(sessionStorage) || ck;
  if (c) {
    copy(c);
    console.log("%cSession code copied: paste it on EndfieldTools.", 'color:#7CFC00;font-size:14px');
  } else {
    console.log("%cYour session code was not found. Check that you are signed in on SKPORT.", 'color:#ff5555;font-size:14px');
  }
})();
```

### Cơ chế hoạt động:
1. Khi đăng nhập vào `https://www.skport.com` (hoặc `https://game.skport.com`), hệ thống Gryphline lưu trữ mã xác thực dưới tên cookie/khóa lưu trữ là `cred` hoặc `SK_OAUTH_CRED_KEY` trong `localStorage`, `sessionStorage`, hoặc `document.cookie`.
2. Đoạn mã trên duyệt qua các bộ nhớ này, tìm chuỗi có độ dài $\ge 8$ chứa định danh `cred` và tự động sao chép vào Clipboard của bạn.
3. **Lưu ý bảo mật:** Chuỗi `cred` này có quyền truy cập trực tiếp vào hồ sơ và thông tin ingame của tài khoản SKPORT. Do đó, việc tự chạy script offline trên máy tính giúp ngăn ngừa nguy cơ rò rỉ token ra ngoài.

---

## 2. Quy Trình Xác Thực & Ký Số (API Reverse Engineering)

Hệ thống API SKPORT (`zonai.skport.com`) được bảo vệ nghiêm ngặt bằng **chữ ký động (`sign`)** và kiểm tra phiên làm việc. Một request hợp lệ bắt buộc trải qua 2 bước:

```
[Session Code / cred]
        │
        ▼ (POST /web/v1/auth/refresh)
[Sign Token]
        │
        ▼ (Tính toán MD5 + HMAC-SHA256)
[Header 'sign' + 'timestamp' + 'platform' + 'sk-game-role']
        │
        ▼
[Truy vấn dữ liệu: /api/v1/game/endfield/card/detail]
```

### Bước 1: Đổi `cred` lấy `token`
Gửi request GET/POST đến:
* **URL:** `https://zonai.skport.com/web/v1/auth/refresh`
* **Header bắt buộc:**
  * `cred: <SESSION_CODE>`
  * `User-Agent: Mozilla/5.0...`
* **Phản hồi:** Trả về JSON chứa `data.token`. Token này đóng vai trò là `secret_key` dùng để ký các request tiếp theo.

### Bước 2: Thuật toán tạo chữ ký `sign`
Mỗi request gửi đến các endpoint nghiệp vụ đều phải kèm theo 5 header bảo mật:
1. `platform`: Định danh nền tảng (`3` đại diện cho Web).
2. `timestamp`: Unix timestamp (tính bằng giây, dạng chuỗi).
3. `dId`: Device ID (để trống `""` đối với client web).
4. `vName`: Phiên bản client (`"1.0.0"`).
5. `sign`: Chuỗi băm 32 ký tự theo công thức:

$$\text{header\_ca} = \text{JSON}(\{ \text{"platform"}: "3", \text{"timestamp"}: t, \text{"dId"}: "", \text{"vName"}: "1.0.0" \})$$
$$\text{sign\_str} = \text{path} + \text{query\_params} + \text{body} + t + \text{header\_ca}$$
$$\text{hmac\_sha256} = \text{HMAC-SHA256}(\text{key}=\text{token}, \text{msg}=\text{sign\_str})$$
$$\text{sign} = \text{MD5}(\text{hmac\_sha256})$$

*Lưu ý quan trọng:* Chuỗi `query_params` khi đưa vào `sign_str` không bao gồm dấu hỏi chấm `?` (ví dụ: `roleId=4000131578&serverId=2`).

---

## 3. Danh Sách Các Endpoint API Quan Trọng

| Endpoint | Method | Chức năng | Header đặc thù |
|---|---|---|---|
| `/web/v1/auth/refresh` | GET | Lấy `token` dùng để ký chữ ký số | `cred` |
| `/api/v1/game/player/binding` | GET | Lấy danh sách UID, Nickname, RoleId, ServerId | `cred`, `sign` |
| `/api/v1/game/endfield/card/detail` | GET | **Dữ liệu cốt lõi:** Operator, level, kỹ năng, vũ khí, phòng căn cứ trạm vũ trụ, thành tựu | `cred`, `sign`, `sk-game-role` |
| `/web/v1/game/endfield/team/user-game-data` | GET | Toàn bộ túi đồ: Danh sách vũ khí, trang bị, vật phẩm chiến thuật | `cred`, `sign`, `sk-game-role` |

---

## 4. Cấu Trúc Các Tệp Dữ Liệu Đã Cào

Tại thư mục `D:\ToiUuHauCan`, dữ liệu đã được cào và phân loại thành các file:

### 1. `roster_summary.json` (Khuyên dùng cho Tối Ưu Hậu Cần)
Tệp đã được làm sạch và chuẩn hóa, sẵn sàng đưa vào thuật toán phân công nhân sự:
* `account`: Thông tin tài khoản (`uid`, `nickname`, `level`, `serverId`, `roleId`).
* `totalOperators`: Tổng số Operator sở hữu (hiện tại: **32** nhân vật).
* `spaceShipRooms`: Danh sách các phòng chức năng trong trạm Dijiang và trang thái phòng.
* `operators`: Danh sách 32 nhân vật được sắp xếp theo phẩm cấp và level giảm dần:
  * `name`, `rarity` (4★, 5★, 6★), `profession`, `level`, `evolvePhase` (cấp tinh anh / đột phá), `potentialLevel`.
  * `weapon`: Vũ khí đang trang bị, cấp độ vũ khí.
  * `factorySkills`: Mảng chứa các node kỹ năng nhà máy sản xuất (ví dụ: `["fac_chr_0029_pograni_0_2", ...]`).
  * `spaceshipSkills`: Mảng chứa các node kỹ năng trạm vũ trụ Dijiang (ví dụ: `["spaceship_skill_chr_0029_pograni_1_2", ...]`).

### 2. `endfield_card_detail.json`
Toàn bộ dữ liệu gốc từ API Card Detail (~1.55 MB):
* Chứa đầy đủ mô tả chi tiết từng kỹ năng, chỉ số tấn công, phòng thủ, thuộc tính ngọc (Gem/Essence) trên vũ khí, tiến độ nhiệm vụ và thám hiểm map.

### 3. `endfield_user_game_data.json`
Dữ liệu raw kho đồ game:
* `userChars`: 32 nhân vật và trạng thái mở khóa.
* `userWeapons`: 61 vũ khí hiện có trong kho.
* `userEquips`: Danh sách trang bị gear/armor.

---

## 5. Hướng Dẫn Sử Dụng Script Cào `skport_crawler.py`

Khi tài khoản của bạn có nhân vật mới, lên cấp, hoặc đổi vũ khí, bạn chỉ cần chạy lại script:

### Chạy trực tiếp qua Command Prompt / PowerShell:
```powershell
cd "D:\ToiUuHauCan"
python skport_crawler.py --cred "eJRlW89t7BuV9UfS046W0ySbooBcayDf"
```

Hoặc chạy tương tác (script sẽ tự hỏi bạn dán Session Code nếu không truyền tham số):
```powershell
python skport_crawler.py
```

Sau khi chạy xong, script sẽ tự động cập nhật lại toàn bộ 4 file JSON trong thư mục `D:\ToiUuHauCan` mà không phụ thuộc vào bất kỳ dịch vụ online nào.
