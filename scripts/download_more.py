import os
import urllib.request
import time

MORE_PHOTOS = {
    "mua-he-xanh-2026": [
        ("mhx-van-nghe-1.jpg", "1FQBFy5oWkV07BaHY2wdu-3aAuOkdE3LF"),
        ("mhx-meme-1.jpg", "1VevRMCuvqm_e3DtqpTjjfWYpIkcYOd5x"),
    ],
    "dong-am-2026": [
        ("dong-am-lua-trai-1.jpg", "1_NAMT4p7-n8KF9a4o-jWbiYg8uiOzLX9"),
    ]
}

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "programs")
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for folder, items in MORE_PHOTOS.items():
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

print("Batch 2 download finished!")
