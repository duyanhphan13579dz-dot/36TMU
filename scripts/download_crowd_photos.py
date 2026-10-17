import os
import urllib.request
import time

CROWD_PHOTOS = {
    "dong-am-2026": [
        ("dong-am-back-1.jpg", "1lBaYGtR9vqfCWb4Y8R7YuHkPmlGxxKON"), # _DSC0258.JPG - Massive squad backdrop
        ("dong-am-back-2.jpg", "15zqYZuOPraNqW5jIeBToRe96YiEv1445"), # _DSC0264.JPG - Full volunteer team
        ("dong-am-phien-cho-1.jpg", "1W79UT12ZAIHQZTp_QLesR1GKNiI6AYfs"), # IMG_0714.JPG - Packed zero-dong market crowd
        ("dong-am-san-truong-1.jpg", "1NGuIMlZzziWG0IioXNmC74ILl0qj3TrU"), # _DSC0013.JPG - Hundreds of school students
    ],
    "sinh-nhat-2026": [
        ("sinh-nhat-back-1.jpg", "1GgUSawNKjZ50H0kyBvtqV-G9q4EgY5ua"), # DSC05386.JPG - Massive stage crowd at 18th anniversary
        ("sinh-nhat-back-2.jpg", "1cBBUqrbeMtaIZHu6_dxQ0B_yLD0ED7b7"), # DSC04717.JPG - Full alumni and member lineup
    ]
}

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "programs")
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for folder, items in CROWD_PHOTOS.items():
    folder_path = os.path.join(BASE_DIR, folder)
    os.makedirs(folder_path, exist_ok=True)
    for fname, fid in items:
        file_path = os.path.join(folder_path, fname)
        url = f"https://lh3.googleusercontent.com/d/{fid}=w1600"
        print(f"Downloading crowd photo {fname} ({fid})...")
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp, open(file_path, "wb") as f:
                f.write(resp.read())
            size_kb = os.path.getsize(file_path) / 1024
            print(f"  -> Saved {fname} ({size_kb:.1f} KB)")
        except Exception as e:
            print(f"  -> Error downloading {fname}: {e}")
        time.sleep(1)

# Remove any single-person / meme photos if present
bad_files = [
    os.path.join(BASE_DIR, "mua-he-xanh-2026", "mhx-meme-1.jpg"),
]
for bf in bad_files:
    if os.path.exists(bf):
        os.remove(bf)
        print(f"Removed single-person/meme photo: {bf}")

print("Crowd photos download finished successfully!")
