// Dữ liệu bách khoa kỹ năng cán viên (Wiki / Game Data)
// Hoàn toàn không chứa thông tin tài khoản người dùng
var FULL_SKILLS_DATA, DEFAULT_USER_DATA;

window.FULL_SKILLS_DATA = [
  {
    "id": "akekuri",
    "name": "Akekuri",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/akekuri/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0019_karin_1_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Coffee or Tea α",
            "name_vi": "Cà Phê hay Trà α",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0019_karin_1_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Coffee or Tea β",
            "name_vi": "Cà Phê hay Trà β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0019_karin_2_1",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Icebreaker β",
            "name_vi": "Người Mở Lời β",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả các cán viên trong đó đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0019_karin_2_2",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Icebreaker γ",
            "name_vi": "Người Mở Lời γ",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả các cán viên trong đó đi 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "alesh",
    "name": "Alesh",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/alesh/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0024_deepfin_1_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Casual Angling α",
            "name_vi": "Câu Cá Thư Giãn α",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +8%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 8%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0024_deepfin_1_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Casual Angling β",
            "name_vi": "Câu Cá Thư Giãn β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0024_deepfin_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Anglers' Intel Network α",
            "name_vi": "Mạng Lưới Thông Tin Ngư Dân α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 1 Rate-UP: UWST (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 1: Công Đoàn (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0024_deepfin_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Anglers' Intel Network β",
            "name_vi": "Mạng Lưới Thông Tin Ngư Dân β",
            "desc_en": "Assign to Reception Room to grant operators Clue 1 Rate-UP: UWST (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 1: Công Đoàn (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "antal",
    "name": "Antal",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/antal/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0023_antal_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Experimental Arts Unit α",
            "name_vi": "Đơn Vị Thuật Pháp Thử Nghiệm α",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0023_antal_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Experimental Arts Unit β",
            "name_vi": "Đơn Vị Thuật Pháp Thử Nghiệm β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0023_antal_2_1",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Pun-isher Studies β",
            "name_vi": "Nghiên Cứu Pun-isher β",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0023_antal_2_2",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Pun-isher Studies γ",
            "name_vi": "Nghiên Cứu Pun-isher γ",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "arcane",
    "name": "Arcane",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/arcane/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0032_lizhiyan_1_1",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Pluck the Mountain, Boil the Sea β",
            "name_vi": "Bạt Sơn Chử Hải β",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0032_lizhiyan_1_2",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Pluck the Mountain, Boil the Sea γ",
            "name_vi": "Bạt Sơn Chử Hải γ",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0032_lizhiyan_2_1",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "Botanophile β",
            "name_vi": "Người Yêu Cây Cỏ β",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0032_lizhiyan_2_2",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "Botanophile γ",
            "name_vi": "Người Yêu Cây Cỏ γ",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 30%"
          }
        ]
      }
    ]
  },
  {
    "id": "arclight",
    "name": "Arclight",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/arclight/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0007_ikut_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Blade of the Wildlands α",
            "name_vi": "Kiếm Hoang Địa α",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0007_ikut_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Blade of the Wildlands β",
            "name_vi": "Kiếm Hoang Địa β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0007_ikut_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Hanna Traditions α",
            "name_vi": "Truyền Thống Ca Dao α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 6 Rate-UP: Hannabit Circuit (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 6: Trường Địa Hannabit (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0007_ikut_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Hanna Traditions β",
            "name_vi": "Truyền Thống Ca Dao β",
            "desc_en": "Assign to Reception Room to grant operators Clue 6 Rate-UP: Hannabit Circuit (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 6: Trường Địa Hannabit (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "ardelia",
    "name": "Ardelia",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/ardelia/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0025_ardelia_1_1",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Tales of the Land β",
            "name_vi": "Giai Thoại Vùng Đất β",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +20%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0025_ardelia_1_2",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Tales of the Land γ",
            "name_vi": "Giai Thoại Vùng Đất γ",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +30%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0025_ardelia_2_1",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Mr. Dolly's Game β",
            "name_vi": "Trò Chơi Của Ngài Dolly β",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả các cán viên trong đó đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0025_ardelia_2_2",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Mr. Dolly's Game γ",
            "name_vi": "Trò Chơi Của Ngài Dolly γ",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "argent-flow",
    "name": "Argent Flow",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/argent-flow/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0037_minghe_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Axiom of Combat β",
            "name_vi": "Yếu Lý Chiến Đấu β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0037_minghe_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Axiom of Combat γ",
            "name_vi": "Yếu Lý Chiến Đấu γ",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0037_minghe_2_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Tools of Momentum β",
            "name_vi": "Công Cụ Động Lực β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0037_minghe_2_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Tools of Momentum γ",
            "name_vi": "Công Cụ Động Lực γ",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "avywenna",
    "name": "Avywenna",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/avywenna/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0012_avywen_1_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Residence Advisor α",
            "name_vi": "Cố Vấn Nơi Cư Trú α",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +8%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 8%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0012_avywen_1_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Residence Advisor β",
            "name_vi": "Cố Vấn Nơi Cư Trú β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0012_avywen_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Messenger's Secret α",
            "name_vi": "Bí Mật Liên Lạc Viên α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 2 Rate-UP: TGCC (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 2: Phòng Thương Mại Tổng Hợp Talos-II (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0012_avywen_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Messenger's Secret β",
            "name_vi": "Bí Mật Liên Lạc Viên β",
            "desc_en": "Assign to Reception Room to grant operators Clue 2 Rate-UP: TGCC (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 2: Phòng Thương Mại Tổng Hợp Talos-II (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "camille",
    "name": "Camille",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/camille/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0033_camille_1_1",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "Hemo-Vitreography β",
            "name_vi": "Huyết Tinh Đồ Ký β",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0033_camille_1_2",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "Hemo-Vitreography γ",
            "name_vi": "Huyết Tinh Đồ Ký γ",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0033_camille_2_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "AgaÅ¡'mekanaz's Manual β",
            "name_vi": "Sổ Tay Agaš'mekanaz β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0033_camille_2_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "AgaÅ¡'mekanaz's Manual γ",
            "name_vi": "Sổ Tay Agaš'mekanaz γ",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +30%"
          }
        ]
      }
    ]
  },
  {
    "id": "catcher",
    "name": "Catcher",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/catcher/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0020_meurs_1_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Silent Caretaker α",
            "name_vi": "Giám Hộ Thầm Lặng α",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +8%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 8%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0020_meurs_1_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Silent Caretaker β",
            "name_vi": "Giám Hộ Thầm Lặng β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0020_meurs_2_1",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Grounded Approach β",
            "name_vi": "Tiếp Cận Thực Tế β",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0020_meurs_2_2",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Grounded Approach γ",
            "name_vi": "Tiếp Cận Thực Tế γ",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "chen-qianyu",
    "name": "Chen Qianyu",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/chen-qianyu/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0005_chen_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Blade Critique α",
            "name_vi": "Phê Bình Lưỡi Kiếm α",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0005_chen_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Blade Critique β",
            "name_vi": "Phê Bình Lưỡi Kiếm β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0005_chen_2_1",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Jadeworking β",
            "name_vi": "Khảm Ngọc β",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0005_chen_2_2",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Jadeworking γ",
            "name_vi": "Khảm Ngọc γ",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 30%"
          }
        ]
      }
    ]
  },
  {
    "id": "da-pan",
    "name": "Da Pan",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/da-pan/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0018_dapan_1_1",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Chef of Forage and Game α",
            "name_vi": "Đầu Bếp Săn Bắn và Lượm Lặt α",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +10%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0018_dapan_1_2",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Chef of Forage and Game β",
            "name_vi": "Đầu Bếp Săn Bắn và Lượm Lặt β",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0018_dapan_2_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Worldly Wisdom β",
            "name_vi": "Trí Tuệ Thế Gian β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0018_dapan_2_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Worldly Wisdom γ",
            "name_vi": "Trí Tuệ Thế Gian γ",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +16%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 16%"
          }
        ]
      }
    ]
  },
  {
    "id": "ember",
    "name": "Ember",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/ember/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0009_azrila_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Special Northern Training β",
            "name_vi": "Huấn Luyện Đặc Biệt Phương Bắc β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0009_azrila_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Special Northern Training γ",
            "name_vi": "Huấn Luyện Đặc Biệt Phương Bắc γ",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0009_azrila_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Keepers of the Banner α",
            "name_vi": "Người Giữ Biểu Ngữ α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 4 Rate-UP: Order of Steel Oath (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 4: Hội Lời Thề Thép (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0009_azrila_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Keepers of the Banner β",
            "name_vi": "Người Giữ Biểu Ngữ β",
            "desc_en": "Assign to Reception Room to grant operators Clue 4 Rate-UP: Order of Steel Oath (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 4: Hội Lời Thề Thép (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "endministrator",
    "name": "Endministrator",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/endministrator/",
    "slots": []
  },
  {
    "id": "estella",
    "name": "Estella",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/estella/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0021_whiten_1_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Fragmented Rest α",
            "name_vi": "Nghỉ Ngơi Tản Mạn α",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +8%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 8%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0021_whiten_1_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Fragmented Rest β",
            "name_vi": "Nghỉ Ngơi Tản Mạn β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0021_whiten_2_1",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Frequency Monitoring β",
            "name_vi": "Giám Sát Tần Suất β",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +20%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0021_whiten_2_2",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Frequency Monitoring γ",
            "name_vi": "Giám Sát Tần Suất γ",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +30%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +30%"
          }
        ]
      }
    ]
  },
  {
    "id": "fluorite",
    "name": "Fluorite",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/fluorite/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0022_bounda_1_1",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Wildlands Trekker α",
            "name_vi": "Người Du Hành Hoang Địa α",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +10%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0022_bounda_1_2",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Wildlands Trekker β",
            "name_vi": "Người Du Hành Hoang Địa β",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0022_bounda_2_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Reader of Emotions β",
            "name_vi": "Đọc Vị Cảm Xúc β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0022_bounda_2_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Reader of Emotions γ",
            "name_vi": "Đọc Vị Cảm Xúc γ",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +16%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 16%"
          }
        ]
      }
    ]
  },
  {
    "id": "gilberta",
    "name": "Gilberta",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/gilberta/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0013_aglina_1_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Messengerial Processing β",
            "name_vi": "Bí Quyết của LLV β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0013_aglina_1_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Messengerial Processing γ",
            "name_vi": "Bí Quyết của LLV γ",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 18%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0013_aglina_2_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Messengerial Arms Mastery β",
            "name_vi": "Thông Thạo Trang Bị Liên Lạc Viên β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0013_aglina_2_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Messengerial Arms Mastery γ",
            "name_vi": "Thông Thạo Trang Bị Liên Lạc Viên γ",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +30%"
          }
        ]
      }
    ]
  },
  {
    "id": "kay",
    "name": "Kay",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/kay/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0040_sweetpie_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Truly Wild Smithing β",
            "name_vi": "Truly Wild Smithing β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0040_sweetpie_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Truly Wild Smithing γ",
            "name_vi": "Truly Wild Smithing γ",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0040_sweetpie_2_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Honey Waffle Break β",
            "name_vi": "Honey Waffle Break β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0040_sweetpie_2_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Honey Waffle Break γ",
            "name_vi": "Honey Waffle Break γ",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "laevatain",
    "name": "Laevatain",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/laevatain/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0016_laevat_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Memory Crucible β",
            "name_vi": "Lò Luyện Ký Ức β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0016_laevat_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Memory Crucible γ",
            "name_vi": "Lò Luyện Ký Ức γ",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0016_laevat_2_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Undying Flames β",
            "name_vi": "Ngọn Lửa Bất Diệt β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0016_laevat_2_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Undying Flames γ",
            "name_vi": "Ngọn Lửa Bất Diệt γ",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "last-rite",
    "name": "Last Rite",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/last-rite/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0026_lastrite_1_1",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "Cemetery Gardening β",
            "name_vi": "Trồng Cây Nghĩa Trang β",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0026_lastrite_1_2",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "Cemetery Gardening γ",
            "name_vi": "Trồng Cây Nghĩa Trang γ",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0026_lastrite_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Fame of the Royal Courts α",
            "name_vi": "Danh Tiếng Vương Triều α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 7 Rate-UP: SeÅ¡'qa (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 7: Seš'qa (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0026_lastrite_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Fame of the Royal Courts β",
            "name_vi": "Danh Tiếng Vương Triều β",
            "desc_en": "Assign to Reception Room to grant operators Clue 7 Rate-UP: SeÅ¡'qa (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho cán viên một lượng Tăng Xác Suất Manh Mối 7: Seš'qa (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "lifeng",
    "name": "Lifeng",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/lifeng/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0015_lifeng_1_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Youthful Ambition β",
            "name_vi": "Khát Vọng Tuổi Trẻ β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0015_lifeng_1_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Youthful Ambition γ",
            "name_vi": "Khát Vọng Tuổi Trẻ γ",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +16%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 16%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0015_lifeng_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Laddie Reliable α",
            "name_vi": "Anh Chàng Đáng Tin Cậy α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 3 Rate-UP: HAS (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 3: Học Viện (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0015_lifeng_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Laddie Reliable β",
            "name_vi": "Anh Chàng Đáng Tin Cậy β",
            "desc_en": "Assign to Reception Room to grant operators Clue 3 Rate-UP: HAS (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 3: Học Viện (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "liino",
    "name": "Liino",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/liino/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0035_liino_1_1",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Idol Passion β",
            "name_vi": "Nhiệt Huyết Thần Tượng β",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0035_liino_1_2",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Idol Passion γ",
            "name_vi": "Nhiệt Huyết Thần Tượng γ",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 18%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0035_liino_2_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Stage Vibe That Lingers β",
            "name_vi": "Dư Âm Sân Khấu Vấn Vương β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0035_liino_2_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Stage Vibe That Lingers γ",
            "name_vi": "Dư Âm Sân Khấu Vấn Vương γ",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +16%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 16%"
          }
        ]
      }
    ]
  },
  {
    "id": "m3",
    "name": "M3",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/m3/",
    "slots": []
  },
  {
    "id": "mifu",
    "name": "Mifu",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/mifu/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0031_mifu_1_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Secret Informants α",
            "name_vi": "Người Chỉ Điểm Bí Mật α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 3 Rate-UP: HAS (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 3: Học Viện (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0031_mifu_1_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Secret Informants β",
            "name_vi": "Người Chỉ Điểm Bí Mật β",
            "desc_en": "Assign to Reception Room to grant operators Clue 3 Rate-UP: HAS (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 3: Học Viện (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0031_mifu_2_1",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Esoteric Tisane β",
            "name_vi": "Thảo Dược Tăng Trưởng β",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0031_mifu_2_2",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Esoteric Tisane γ",
            "name_vi": "Thảo Dược Tăng Trưởng γ",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 30%"
          }
        ]
      }
    ]
  },
  {
    "id": "mimino",
    "name": "Mimino",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/mimino/",
    "slots": []
  },
  {
    "id": "perlica",
    "name": "Perlica",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/perlica/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0004_pelica_1_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Supervisor α",
            "name_vi": "Giám Sát Viên α",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +8%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 8%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0004_pelica_1_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Supervisor β",
            "name_vi": "Giám Sát Viên β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0004_pelica_2_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Protocol Redistribution β",
            "name_vi": "Điều Phối Giao Thức β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0004_pelica_2_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Protocol Redistribution γ",
            "name_vi": "Điều Phối Giao Thức γ",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +30%"
          }
        ]
      }
    ]
  },
  {
    "id": "pogranichnik",
    "name": "Pogranichnik",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/pogranichnik/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0029_pograni_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Hone the Weapons β",
            "name_vi": "Rèn Giũa Vũ Khí β",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0029_pograni_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Hone the Weapons γ",
            "name_vi": "Rèn Giũa Vũ Khí γ",
            "desc_en": "Assign to Manufacturing Cabin to grant weapon EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP vũ khí +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0029_pograni_2_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Morale Boost β",
            "name_vi": "Khích Lệ Sĩ Khí β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0029_pograni_2_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Morale Boost γ",
            "name_vi": "Khích Lệ Sĩ Khí γ",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "purrchena",
    "name": "Purrchena",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/purrchena/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0038_purrche_1_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Brand Ambassador α",
            "name_vi": "Đại Sứ Thương Hiệu α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 2 Rate-UP: TGCC (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Tỷ Lệ Manh Mối 2: Phòng Thương Mại Tổng Hợp Talos-II (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0038_purrche_1_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Brand Ambassador β",
            "name_vi": "Đại Sứ Thương Hiệu β",
            "desc_en": "Assign to Reception Room to grant operators Clue 2 Rate-UP: TGCC (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Tỷ Lệ Manh Mối 2: Phòng Thương Mại Tổng Hợp Talos-II (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0038_purrche_2_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Desserts for the Debrief β",
            "name_vi": "Món Tráng Miệng Sau Buổi Tổng Kết β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0038_purrche_2_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Desserts for the Debrief γ",
            "name_vi": "Món Tráng Miệng Sau Buổi Tổng Kết γ",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +30%"
          }
        ]
      }
    ]
  },
  {
    "id": "rossi",
    "name": "Rossi",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/rossi/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0028_wulfa_1_1",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Clan Etiquette β",
            "name_vi": "Lễ Nghi Bộ Tộc β",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả các cán viên trong đó đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0028_wulfa_1_2",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Clan Etiquette γ",
            "name_vi": "Lễ Nghi Bộ Tộc γ",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 18%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0028_wulfa_2_1",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Scent of the Hunt β",
            "name_vi": "Mùi Săn β",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +20%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0028_wulfa_2_2",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Scent of the Hunt γ",
            "name_vi": "Mùi Săn γ",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +30%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +30%"
          }
        ]
      }
    ]
  },
  {
    "id": "si",
    "name": "Si",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/si/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0036_jsspsi_1_1",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Ware is the Geist β",
            "name_vi": "Mặc Linh Đâu Rồi β",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +20%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0036_jsspsi_1_2",
            "icon": "facskill_spaceship_guestroom_efficiency",
            "name_en": "Ware is the Geist γ",
            "name_vi": "Mặc Linh Đâu Rồi γ",
            "desc_en": "Assign to Reception Room to grant operator clue collecting efficiency +30%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, hiệu suất thu thập manh mối của cán viên +30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0036_jsspsi_2_1",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Ink Spirit Aide β",
            "name_vi": "Trợ Thủ Vong Linh Mực β",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả cán viên đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0036_jsspsi_2_2",
            "icon": "facskill_spaceship_guestroom_power_consume",
            "name_en": "Ink Spirit Aide γ",
            "name_vi": "Trợ Thủ Vong Linh Mực γ",
            "desc_en": "Assign to Reception Room to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, làm chậm mức Giảm Tâm Trạng của tất cả cán viên đi 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "snowshine",
    "name": "Snowshine",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/snowshine/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0014_aurora_1_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Rescuer's Perseverance α",
            "name_vi": "Nghị Lực Người Cứu Hộ α",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0014_aurora_1_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Rescuer's Perseverance β",
            "name_vi": "Nghị Lực Người Cứu Hộ β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Control Nexus",
        "cabin_vi": "Trung Tâm Kiểm Soát (Control Nexus)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0014_aurora_2_1",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Happy-Go-Lucky β",
            "name_vi": "Vô Tư β",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +12%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 12%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0014_aurora_2_2",
            "icon": "facskill_spaceship_physical_power",
            "name_en": "Happy-Go-Lucky γ",
            "name_vi": "Vô Tư γ",
            "desc_en": "Assign to Control Nexus to grant all operators' Mood Regen +16%",
            "desc_vi": "Khi phân công vào Trung Tâm Kiểm Soát, tăng Tái Tạo Tâm Trạng của tất cả các cán viên thêm 16%"
          }
        ]
      }
    ]
  },
  {
    "id": "tangtang",
    "name": "Tangtang",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/tangtang/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0027_tangtang_1_1",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Supreme Chief β",
            "name_vi": "Thủ Lĩnh Tối Cao β",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0027_tangtang_1_2",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Supreme Chief γ",
            "name_vi": "Thủ Lĩnh Tối Cao γ",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó đi 18%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0027_tangtang_2_1",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "River's Daughter β",
            "name_vi": "Con Gái Của Dòng Sông β",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0027_tangtang_2_2",
            "icon": "facskill_spaceship_plant_flower",
            "name_en": "River's Daughter γ",
            "name_vi": "Con Gái Của Dòng Sông γ",
            "desc_en": "Assign to Growth Chamber to grant vitrified plant growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng cây trồng hóa đá thêm 30%"
          }
        ]
      }
    ]
  },
  {
    "id": "typhoeus",
    "name": "Typhoeus",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/typhoeus/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0034_typhoea_1_1",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Lithic Murmurs β",
            "name_vi": "Lời Thì Thầm Của Đá β",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0034_typhoea_1_2",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Lithic Murmurs γ",
            "name_vi": "Lời Thì Thầm Của Đá γ",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0034_typhoea_2_1",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Life in the Spores β",
            "name_vi": "Mầm Sống Trong Bào Tử β",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0034_typhoea_2_2",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Life in the Spores γ",
            "name_vi": "Mầm Sống Trong Bào Tử γ",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 30%"
          }
        ]
      }
    ]
  },
  {
    "id": "warfarin",
    "name": "Warfarin",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/warfarin/",
    "slots": []
  },
  {
    "id": "wulfgard",
    "name": "Wulfgard",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/wulfgard/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0006_wolfgd_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Pack Techniques α",
            "name_vi": "Kỹ Thuật Nhóm α",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0006_wolfgd_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Pack Techniques β",
            "name_vi": "Kỹ Thuật Nhóm β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0006_wolfgd_2_1",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Knack for the Wildlands β",
            "name_vi": "Thành Thạo Hoang Địa β",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0006_wolfgd_2_2",
            "icon": "facskill_spaceship_plant_mineral",
            "name_en": "Knack for the Wildlands γ",
            "name_vi": "Thành Thạo Hoang Địa γ",
            "desc_en": "Assign to Growth Chamber to grant rare mineral growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng khoáng sản quý hiếm thêm 30%"
          }
        ]
      }
    ]
  },
  {
    "id": "xaihi",
    "name": "Xaihi",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/xaihi/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0011_seraph_1_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Standardized Scripting α",
            "name_vi": "Kịch Bản Chuẩn Hóa α",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +10%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +10%"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0011_seraph_1_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Standardized Scripting β",
            "name_vi": "Kịch Bản Chuẩn Hóa β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu EXP cán viên +20%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Reception Room",
        "cabin_vi": "Phòng Tiếp Khách (Reception)",
        "levels": [
          {
            "level": 1,
            "postfix": "α",
            "skill_id": "spaceship_skill_chr_0011_seraph_2_1",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Murmuring Session α",
            "name_vi": "Kỷ Nguyên Thì Thầm α",
            "desc_en": "Assign to Reception Room to grant operators a small Clue 5 Rate-UP: Cabal of Tranquility (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên một lượng nhỏ Tăng Xác Suất Manh Mối 5: Tu Hội Tĩnh Lặng (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          },
          {
            "level": 2,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0011_seraph_2_2",
            "icon": "facskill_spaceship_guestroom_clue",
            "name_en": "Murmuring Session β",
            "name_vi": "Kỷ Nguyên Thì Thầm β",
            "desc_en": "Assign to Reception Room to grant operators Clue 5 Rate-UP: Cabal of Tranquility (activates upon assignment; effects of the same type cannot stack)",
            "desc_vi": "Khi phân công vào Phòng Tiếp Khách, cấp cho các cán viên Tăng Xác Suất Manh Mối 5: Tu Hội Tĩnh Lặng (kích hoạt khi được phân công; không thể cộng dồn các hiệu ứng cùng loại)"
          }
        ]
      }
    ]
  },
  {
    "id": "yvonne",
    "name": "Yvonne",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/yvonne/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0017_yvonne_1_1",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Fungal Pigment Extraction β",
            "name_vi": "Chiết Xuất Sắc Tố Nấm β",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +20%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0017_yvonne_1_2",
            "icon": "facskill_spaceship_plant_fungus",
            "name_en": "Fungal Pigment Extraction γ",
            "name_vi": "Chiết Xuất Sắc Tố Nấm γ",
            "desc_en": "Assign to Growth Chamber to grant fungal matter growth rate +30%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, tăng tốc độ tăng trưởng vật chất nấm thêm 30%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "Growth Chamber",
        "cabin_vi": "Buồng Phát Triển (Growth Chamber)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0017_yvonne_2_1",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Fashionista β",
            "name_vi": "Người Sành Điệu β",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0017_yvonne_2_2",
            "icon": "facskill_spaceship_plant_power_consume",
            "name_en": "Fashionista γ",
            "name_vi": "Người Sành Điệu γ",
            "desc_en": "Assign to Growth Chamber to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Buồng Phát Triển, làm chậm Giảm Tâm Trạng của tất cả các cán viên trong đó xuống 18%"
          }
        ]
      }
    ]
  },
  {
    "id": "zhuang-fangyi",
    "name": "Zhuang Fangyi",
    "rarity": "N/A",
    "url": "https://endfieldtools.dev/characters/zhuang-fangyi/",
    "slots": [
      {
        "slot_number": 1,
        "slot_label": "Skill Slot 1",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0030_zhuangfy_1_1",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Viceroy Experience β",
            "name_vi": "Trải Nghiệm Phó Vương β",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 14%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 14%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0030_zhuangfy_1_2",
            "icon": "facskill_spaceship_manufacture_power_consume",
            "name_en": "Viceroy Experience γ",
            "name_vi": "Trải Nghiệm Phó Vương γ",
            "desc_en": "Assign to Manufacturing Cabin to slow Mood Drop of all operators in it by 18%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, làm chậm mức Giảm Tâm Trạng của tất cả cán viên trong đó đi 18%"
          }
        ]
      },
      {
        "slot_number": 2,
        "slot_label": "Skill Slot 2",
        "cabin_en": "MFG Cabin",
        "cabin_vi": "Khoang Sản Xuất (Manufacturing)",
        "levels": [
          {
            "level": 1,
            "postfix": "β",
            "skill_id": "spaceship_skill_chr_0030_zhuangfy_2_1",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Tianshi Chi Meditation β",
            "name_vi": "Thiên Thức Khí Thiên Sư β",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +20%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +20%"
          },
          {
            "level": 2,
            "postfix": "γ",
            "skill_id": "spaceship_skill_chr_0030_zhuangfy_2_2",
            "icon": "facskill_spaceship_manufacture_efficiency",
            "name_en": "Tianshi Chi Meditation γ",
            "name_vi": "Thiên Thức Khí Thiên Sư γ",
            "desc_en": "Assign to Manufacturing Cabin to grant operator EXP material production efficiency +30%",
            "desc_vi": "Khi phân công vào Khoang Sản Xuất, hiệu suất sản xuất nguyên liệu tăng EXP cán viên +30%"
          }
        ]
      }
    ]
  }
];

// Dữ liệu tài khoản cá nhân sẽ được nạp từ LocalStorage của trình duyệt
window.DEFAULT_USER_DATA = null;
