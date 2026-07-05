from yt_dlp import YoutubeDL

url = "https://x.com/Anal_Goonette/status/2073578608657064192/video/1"

ydl_opts = {
    "quiet": True,
    "skip_download": True,
}

with YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(url, download=False)

print(info["title"])

for f in info["formats"]:
    print(f.get("height"), f.get("ext"), f.get("url"))