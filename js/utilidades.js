function detectarSitio(url) {
  url = url.toLowerCase();

  if (url.includes("youtube")) return "youtube";

  if (url.includes("youtu.be")) return "youtube";

  if (url.includes("facebook")) return "facebook";

  if (url.includes("instagram")) return "instagram";

  if (url.includes("twitter")) return "twitter";

  if (url.includes("x.com")) return "twitter";

  if (url.includes("redgifs.com")) return "RedGifs";

  if (url.includes("phncdn.com")) return "PornHub";

  if (url.includes("pornhub.com")) return "PornHub";

  if (url.includes("nsf")) return "PornHub";

  if (url.includes("cdn2.onlyfans.com")) return "OnlyFans";

  if (
    url.includes("ahcdn") ||
    url.includes("xhmediacdn") ||
    url.includes("xhpingcdn") ||
    url.includes("xhamster") ||
    url.includes("xhcdn") ||
    url.includes("xhamsterpremium")
  )
    return "xHamster";

  if (url.includes("downixcdn.com")) return "PornHub";

  if (url.includes("video.twimg.com")) return "Twpornstars";

  if (url.includes("tiktok")) return "tiktok";

  return null;
}
