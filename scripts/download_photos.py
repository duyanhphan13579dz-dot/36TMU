import os
import urllib.request
import time

PHOTOS = {
    "mua-he-xanh-2026": [
        ("mhx-back-1.jpg", "10HwSl_3uoCsl932gHBShpVoO1KrviCcF"),
        ("mhx-back-2.jpg", "1uOaAwenQxJMzA1aumuaYjbaQ-fXHC_G6"),
        ("mhx-cttn-1.jpg", "1EsXvHp5HfKBQelbCYvyZgOIPTDqzL6w4"),
    ],
    "dong-am-2026": [
        ("dong-am-back-1.jpg", "14Gw6Ii_AAczGMbvQrNXUq3QTQJjAhYGo"),
        ("dong-am-phien-cho-1.jpg", "1xupnyR91LNuWfuKjh-g8srxrn4cDgCj1"),
    ],
    "sinh-nhat-2026": [
        ("sinh-nhat-back-1.jpg", "1ortIxWDxgKR2Ph2oCaQQxPc2llQKdnLg"),
        ("sinh-nhat-gala-1.jpg", "1LRzbeHF2U1tF3-rTTfGWtkFZvANLffQ3"),
        ("sinh-nhat-gala-2.jpg", "1nuoL7PT81K_ERsV0mlOxSzK1Ssh0xfwQ"),
    ]
}

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "programs")

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for folder, items in PHOTOS.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    for fname, fid in items:
        file_path = os.path.join(folder_path, fname)
        url = f"https://lh3.googleusercontent.com/d/{fid}=w1600"
        print(f"Downloading {fname} from {url}...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp, open(file_path, "wb") as f:
                f.write(resp.read())
            size_kb = os.path.getsize(file_path) / 1024
            print(f"  -> Saved {fname} ({size_kb:.1f} KB)")
        except Exception as e:
            print(f"  -> Error downloading {fname}: {e}")
        time.sleep(1)

print("All downloads finished!")
