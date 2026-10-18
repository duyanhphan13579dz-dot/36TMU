import os
import urllib.request
import time

PHOTOS_TO_DOWNLOAD = {
    # 2025
    "dong-am-2025": [
        ("dong-am-2025-cover.jpg", "1rhCNcjo4zczvxEpkgjLXNdUPpg_1u_B5"),   # 20250121_231644.jpg - Full departure crowd under bridge (>10 people)
        ("dong-am-2025-activities.jpg", "1OqT1JPA45ark7_xsCzHR6U1QXAXG_gdH"), # IMG_4856.HEIC - 8 people making gifts/bánh chưng
        ("dong-am-2025-banner.jpg", "1rT30PkC2Z5UEKe6_h-mjxEiLbsG9j4oZ"),     # 20250121_231145.jpg - Banner sticking on coach
    ],
    # 2024
    "mua-he-xanh-2024": [
        ("mhx-2024-cover.jpg", "1P4ZMZs_OxYY2yDCgQJT-61SP0fNwasUj"),      # IMG_1188.HEIC - 20+ volunteers in uniform holding flags at TMU gate
    ],
    "tap-huan-2024": [
        ("thtn-2024-cover.jpg", "12vw0qgo8p0Extwj81-wNky0YVIC_m0iF"),      # IMG_3790.JPG - 18 volunteers at TMU fountain holding squad flags
    ],
    "biggame-k60-2024": [
        ("biggame-2024-cover.jpg", "1TcJ9wSGYYJA2O1EX2Sr2cksjeP6d3Jxe"),   # IMG_9547.HEIC - 20+ freshmen & volunteers lined up at TMU gate
    ],
    "chao-tan-k60-2024": [
        ("chao-tan-k60-cover.jpg", "1Q4-6K4kwCXwanBGjrn1REOSr-W4jmmwQ"),  # IMG_6488.HEIC - Crowd in Chào tân K60
        ("chao-tan-k60-practice.jpg", "1AamB-7HYhYLZNLS_05us1U9y7A-8Zk0N"), # IMG_6661.HEIC - Gathering at fountain
    ]
}

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "programs")
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for folder, items in PHOTOS_TO_DOWNLOAD.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    for fname, fid in items:
        file_path = os.path.join(folder_path, fname)
        url = f"https://lh3.googleusercontent.com/d/{fid}=w1600"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp, open(file_path, "wb") as f:
                f.write(resp.read())
            size_kb = os.path.getsize(file_path) / 1024
            print(f"[OK] Saved {folder}/{fname} ({size_kb:.1f} KB)")
        except Exception as e:
            print(f"[ERR] Failed {folder}/{fname}: {e}")
        time.sleep(1)

print("Batch download completed successfully!")
