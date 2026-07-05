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

  if (url.includes("tiktok")) return "tiktok";

  return null;
}
