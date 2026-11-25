#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SKPORT Data Crawler for Arknights: Endfield (100% Offline / Local Execution)
Author: DeepMind / Antigravity
Usage:
    python skport_crawler.py
    hoặc:
    python skport_crawler.py --cred <YOUR_SESSION_CODE>
"""

import sys
import os
import time
import json
import hmac
import hashlib
import urllib.request
import urllib.error
import argparse

DEFAULT_OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

class SkportCrawler:
    BASE_URL = "https://zonai.skport.com"
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

    def __init__(self, cred: str, output_dir: str = DEFAULT_OUTPUT_DIR):
        self.cred = cred.strip()
        self.output_dir = output_dir
        self.token = None
        self.role_id = None
        self.server_id = None
        self.user_info = {}

    def refresh_token(self) -> str:
        """
        Đổi 'cred' (Session Code) lấy 'sign_token' để ký các request API tiếp theo.
        Endpoint: /web/v1/auth/refresh
        """
        url = f"{self.BASE_URL}/web/v1/auth/refresh"
        headers = {
            "User-Agent": self.USER_AGENT,
            "cred": self.cred,
            "Origin": "https://www.skport.com",
            "Referer": "https://www.skport.com/",
            "Accept": "application/json, text/plain, */*"
        }
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                if res.get("code") != 0:
                    raise RuntimeError(f"Lỗi refresh token: {res.get('message')} (code: {res.get('code')})")
                self.token = res["data"]["token"]
                return self.token
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"HTTP {e.code} khi refresh token: {err_body}")

    def _generate_headers(self, path: str, query_str: str = "", body_str: str = "") -> dict:
        """
        Tạo chữ ký 'sign' chuẩn của hệ sinh thái Skland / SKPORT:
        sign_str = path + query_string + body + timestamp + json(header_ca)
        sign = MD5(HMAC-SHA256(secret=token, message=sign_str))
        """
        timestamp = str(int(time.time()))
        header_ca = {
            "platform": "3",   # 3: Web client
            "timestamp": timestamp,
            "dId": "",
            "vName": "1.0.0"
        }
        header_ca_str = json.dumps(header_ca, separators=(',', ':'))
        sign_str = f"{path}{query_str}{body_str}{timestamp}{header_ca_str}"

        secret = self.token.encode("utf-8")
        hmac_digest = hmac.new(secret, sign_str.encode("utf-8"), hashlib.sha256).hexdigest()
        final_sign = hashlib.md5(hmac_digest.encode("utf-8")).hexdigest()

        headers = {
            "User-Agent": self.USER_AGENT,
            "cred": self.cred,
            "sign": final_sign,
            "platform": header_ca["platform"],
            "timestamp": timestamp,
            "dId": header_ca["dId"],
            "vName": header_ca["vName"],
            "Origin": "https://www.skport.com",
            "Referer": "https://www.skport.com/",
            "Accept": "application/json, text/plain, */*"
        }
        if self.role_id and self.server_id:
            headers["sk-game-role"] = f"{self.role_id},{self.server_id}"
        return headers

    def api_get(self, path: str, query_params: dict = None) -> dict:
        """Gọi API GET kèm chữ ký số"""
        if not self.token:
            self.refresh_token()

        query_str = ""
        if query_params:
            # Query string cho chữ ký không chứa dấu '?'
            query_str = "&".join(f"{k}={v}" for k, v in query_params.items())

        headers = self._generate_headers(path, query_str=query_str)
        full_url = f"{self.BASE_URL}{path}" + (f"?{query_str}" if query_str else "")

        req = urllib.request.Request(full_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("code") != 0:
                raise RuntimeError(f"API Error [{path}]: {data.get('message')} (code: {data.get('code')})")
            return data

    def crawl_all(self):
        print("[1/5] Đang kết nối SKPORT và làm mới token...")
        self.refresh_token()
        print(f"      -> Token session: {self.token[:8]}***")

        print("[2/5] Đang lấy thông tin liên kết tài khoản (Player Binding)...")
        binding_data = self.api_get("/api/v1/game/player/binding")
        
        # Tìm nhân vật game Endfield
        found_endfield = False
        for game in binding_data.get("data", {}).get("list", []):
            if game.get("appCode") == "endfield":
                for binding in game.get("bindingList", []):
                    default_role = binding.get("defaultRole") or (binding.get("roles", [{}])[0])
                    self.role_id = default_role.get("roleId")
                    self.server_id = default_role.get("serverId")
                    self.user_info = {
                        "uid": binding.get("uid"),
                        "nickname": default_role.get("nickname"),
                        "level": default_role.get("level"),
                        "serverName": default_role.get("serverName"),
                        "serverId": self.server_id,
                        "roleId": self.role_id
                    }
                    found_endfield = True
                    break
        
        if not found_endfield:
            raise RuntimeError("Không tìm thấy dữ liệu game Arknights: Endfield liên kết với tài khoản này!")

        print(f"      -> Tài khoản: {self.user_info['nickname']} (Lv.{self.user_info['level']}) | Server: {self.user_info['serverName']} (ID: {self.user_info['roleId']})")

        print("[3/5] Đang tải chi tiết hồ sơ nhân vật & căn cứ (Card Detail)...")
        card_detail = self.api_get("/api/v1/game/endfield/card/detail", {
            "roleId": self.role_id,
            "serverId": self.server_id
        })

        print("[4/5] Đang tải dữ liệu trang bị & vũ khí (User Game Data)...")
        user_game_data = self.api_get("/web/v1/game/endfield/team/user-game-data", {
            "roleId": self.role_id,
            "serverId": self.server_id
        })

        print("[5/5] Đang trích xuất & lưu file kết quả vào thư mục...")
        # 1. File raw binding
        path_binding = os.path.join(self.output_dir, "endfield_player_binding.json")
        with open(path_binding, "w", encoding="utf-8") as f:
            json.dump(binding_data, f, ensure_ascii=False, indent=2)

        # 2. File raw card detail
        path_card = os.path.join(self.output_dir, "endfield_card_detail.json")
        with open(path_card, "w", encoding="utf-8") as f:
            json.dump(card_detail, f, ensure_ascii=False, indent=2)

        # 3. File raw user game data
        path_ugd = os.path.join(self.output_dir, "endfield_user_game_data.json")
        with open(path_ugd, "w", encoding="utf-8") as f:
            json.dump(user_game_data, f, ensure_ascii=False, indent=2)

        # 4. File summary tối ưu cho Hậu Cần
        chars_raw = card_detail.get("data", {}).get("detail", {}).get("chars", [])
        roster_summary = []
        for c in chars_raw:
            cdata = c.get("charData", {})
            rarity_obj = cdata.get("rarity", {})
            rarity_val = rarity_obj.get("value") if isinstance(rarity_obj, dict) else rarity_obj
            prof_obj = cdata.get("profession", {})
            prof_val = prof_obj.get("value") if isinstance(prof_obj, dict) else prof_obj
            prop_obj = cdata.get("property", {})
            prop_val = prop_obj.get("value") if isinstance(prop_obj, dict) else prop_obj
            weapon_obj = c.get("weapon", {})
            weapon_data = weapon_obj.get("weaponData", {}) if isinstance(weapon_obj, dict) else {}
            talent_obj = c.get("talent", {})

            roster_summary.append({
                "name": cdata.get("name"),
                "id": cdata.get("id"),
                "rarity": rarity_val,
                "profession": prof_val,
                "property": prop_val,
                "level": c.get("level"),
                "evolvePhase": c.get("evolvePhase"),
                "potentialLevel": c.get("potentialLevel"),
                "weapon": {
                    "name": weapon_data.get("name"),
                    "level": weapon_obj.get("level") if isinstance(weapon_obj, dict) else None,
                    "rarity": weapon_data.get("rarity", {}).get("value") if isinstance(weapon_data.get("rarity"), dict) else None
                },
                "factorySkills": talent_obj.get("latestFactorySkillNodes", []),
                "spaceshipSkills": talent_obj.get("latestSpaceshipSkillNodes", []),
                "passiveSkills": talent_obj.get("latestPassiveSkillNodes", [])
            })

        roster_summary.sort(key=lambda x: (int(x['rarity'] or 0), int(x['level'] or 0)), reverse=True)

        summary_data = {
            "account": self.user_info,
            "totalOperators": len(roster_summary),
            "spaceShipRooms": card_detail.get("data", {}).get("detail", {}).get("spaceShip", {}).get("rooms", []),
            "operators": roster_summary
        }
        path_summary = os.path.join(self.output_dir, "roster_summary.json")
        with open(path_summary, "w", encoding="utf-8") as f:
            json.dump(summary_data, f, ensure_ascii=False, indent=2)

        print("\n=== HOÀN TẤT THÀNH CÔNG (100% OFFLINE) ===")
        print(f"1. Chi tiết thẻ game (Card Detail)  : {path_card}")
        print(f"2. Tóm tắt Hậu Cần (Roster Summary) : {path_summary}")
        print(f"3. Dữ liệu tài khoản (User Game)    : {path_ugd}")
        print(f"4. Liên kết nhân vật (Binding)      : {path_binding}")
        print(f"Tổng số Operator: {len(roster_summary)} nhân vật.")


def main():
    parser = argparse.ArgumentParser(description="Tool cào dữ liệu Arknights: Endfield từ SKPORT chạy offline.")
    parser.add_argument("--cred", type=str, help="Session code (cred) lấy từ SKPORT", default=None)
    parser.add_argument("--output", type=str, help="Thư mục lưu file JSON", default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()

    cred = args.cred
    if not cred:
        # Nếu không truyền argument, kiểm tra biến môi trường hoặc hỏi trực tiếp
        cred = os.getenv("SKPORT_CRED")
    
    if not cred:
        print("=== SKPORT OFFLINE DATA CRAWLER ===")
        print("Chưa có Session Code (cred).")
        cred = input("Nhập Session Code của bạn (hoặc nhấn Enter để thoát): ").strip()

    if not cred:
        print("Đã hủy thao tác.")
        sys.exit(1)

    crawler = SkportCrawler(cred=cred, output_dir=args.output)
    try:
        crawler.crawl_all()
    except Exception as e:
        print(f"\n[X] ĐÃ XẢY RA LỖI: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
