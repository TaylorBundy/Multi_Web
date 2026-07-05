const urlObj = new URL(window.location.toString());
const domain = urlObj.hostname;
const fullUrl = urlObj.href;
let ContadorFunciones = 0;
let logo;
let logo1;
let selector;
let tiempo = null;
let nombreFinal = null;
let elTiempo = null;
let resolverTiempo;
let tiempoListo = new Promise((resolve) => (resolverTiempo = resolve));
let urlRecibida = null;
let nombreRecibido = null;
let enlace;
let limpio;
let enlaces;
let cantidadInicial = null;
let totalImagenes = null;
let totalVideos = null;
let nuevoValor = null;
let intentos = null;
let intentos1 = null;
let Directorio = null;
let carpeta = null;
let userId;
let idFoto;
let host;
let estilo;
let totalBotones;
let botonIndividual;
let idBoto;
let idUrl;
let salteados = null;
let mensajeTodos;
let mensajeUno;
const img = new Image();
var data2 = new Date();
data2.setTime(data2.getTime() + 365 * 24 * 60 * 60 * 1000);
var expira = data2.toUTCString();
let nombre_cookie = "";
let valorCookie = "";
let idpostt;
let observerActivo = false;
//let muestra = false;
let cargarMasBtn;
let todos;
let todos1;
let todos2;
let nombre = null;
let nombreVid = null;
let segundos = null;
let mensaje = null;
let mensaje2 = null;
let extension = null;
let TiempoCuentaRegresiva = null;
let retraso = null;
let demoraBtn = null;
let estado = null;
let COOKIE_NAME = null;
let COOKIE_URL = null;
let padre = null;
let descargado;
let observers = [];
let inactivityTimer = null;
let idDelBoton = null;
let backgroundColor = null;
const INACTIVITY_TIME = 3000;
const imagenes = {
  guardar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16" style="margin-right:5px">
  <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
</svg>`,
  Descargar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16" style="margin-right:5px">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
</svg>`,
  Eliminar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style="margin-right:5px">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`,
  Cancelar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16" style="margin-right:5px;color:red;">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`,
  Cerrar: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16" style="color:red; position:fixed;">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
</svg>`,
  Video: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16" style="margin-right:5px">
  <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0"/>
  <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm6 8.73V7.27l-3.5 1.555v4.35zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"/>
  <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6M7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
</svg>`,
  Link: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16" style="margin-right:5px;color:blue;">
  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
</svg>`,
  Informacion: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16" style="margin-right:5px">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>`,
  Advertencia: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16" style="margin-right:5px;color:yellow;">
  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
</svg>`,
  UsuariosLista: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16" style="margin-right:5px">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
</svg>`,
  Usuario: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16" style="margin:auto;color:blue">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>`,
  Buscar: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" style="margin-right:5px">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>`,
};
//console.log(estado);

const DOMAINS = [
  "redgifs.com",
  "pornhub.com",
  "twpornstars.com",
  "manyvids.com",
  "fapello.com",
  "fansly.com",
  "x.com",
  "pornpics.com",
  "loyalfans.com",
  "redditp.com",
  "xdownloader.io",
];

// // Reglas dinámicas para cada dominio
// const DOMAIN_RULES = {
//   "pornhub.com": [
//     { include: ["/gifs", "/gif"], result: true },
//     { include: ["pornhub.com", "channels"], exclude: ["gifs", "gif"], result: false }
//   ],
//   "x.com": [
//     { include: ["/status", "/gif"], result: true },
//     { include: ["x.com", "home"], exclude: ["status", "gif"], result: false }
//   ],
//   "fapello.com": [
//     { include: [`/`], result: true },
//     //{ include: [`/${idFoto}`], result: true },
//     { include: ["fapello.com"], exclude: [`/${idFoto}`], result: false }
//   ],
//   "redgifs.com": [
//     { include: ["/watch"], result: true },
//     { include: ["redgifs.com", "channels", `/users/${userId}`], exclude: ["/watch"], result: false }
//   ]
// };

if (domain.includes("pornhub")) {
  //logo = document.querySelector("#headerContainer > div:nth-child(1) > div > div > a > img").src;
  logo = "https://ei.phncdn.com/pics/logos/10211.png?cache=2025091603";
  logo1 =
    "https://ei.phncdn.com/www-static/images/pornhub_logo_straight.svg?cache=2025092305";
  userId = fullUrl.split("/")[4];
  cargarMasBtn = document.querySelector("#moreDataBtn");
  //todos = document.querySelectorAll("#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li");
  todos =
    "#profileContent > div > section > div > div.profileVids > div.gifsWrapperProfile > ul > li";
  todos1 = document.querySelectorAll(
    "#profileContent > div > section > div > div.profileVids.gifsOutterWrapperProfile > div.gifsWrapperProfile.clearfix > ul > li",
  );
  todos2 = document.querySelectorAll(
    "body > div.wrapper > div.container > div.nf-videos > div > div.gifsWrapper.hideLastItemLarge > ul > li.gifVideoBlock",
  );
  backgroundColor = `#000000ba`;
} else if (domain.includes("redgifs")) {
  //logo = document.querySelector("#root > div > div.topNav > a > img").src;
  logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
  //todos = document.querySelectorAll("#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > a");
  //todos = "#root > div > div.Wrapper > div > div.skyWrapper > div > div > div.gifList.ProfileGifList.ProfileGifList-isTiles > div.tileFeed > a";
  todos =
    "#root > div > div.Wrapper > div > div.creatorPage > div.skyWrapper > div.middle > div > div.gifList.ProfileGifList > div > div.tileFeed > div.tileItem";
  host = fullUrl;
  //backgroundColor = `var(--primitives-colors-neutral-990)`;
  backgroundColor = `#0f0f0fbd`;
} else if (domain.includes("manyvids")) {
  logo = "https://logos.manyvids.com/icon_public/favicon-32x32.png?v=4";
} else if (domain.includes("twpornstars")) {
  logo = "https://www.twpornstars.com/favicon.ico";
  todos = document.querySelectorAll(
    "body > div.block.block-thumbs.js-thumbs > div.thumb > div.thumb__inner",
  );
} else if (domain.includes("fapello")) {
  logo = "https://fapello.com/assets/images/logo.png";
  todos = document.querySelectorAll("#content > div");
  const local = new URL(fullUrl);
  const partido = local.pathname.split("/");
  if (partido.length >= 3) {
    userId = fullUrl.split("/")[3];
  } else {
    userId = null;
  }
  if (partido.length === 4) {
    idFoto = fullUrl.split("/")[4];
  } else {
    idFoto = null;
  }
  // userId = fullUrl.split("/")[3];
  // const local = new URL(fullUrl);
  // const partido = local.pathname.split("/");
  // console.log(partido.length);
  // if (partido.length === 4) {
  //   idFoto = fullUrl.split("/")[4];
  // } else {
  //   idFoto = null;
  // }
  // console.log(idFoto);
  // console.log(userId);
} else if (domain.includes("fansly")) {
  logo = "https://fansly.com/assets/images/fansly_dark_v3.webp";
  logo1 = "https://fansly.com/assets/images/fansly_light_v3.webp";
  idpostt = "https://fansly.com/post/";
} else if (domain.includes("x.com")) {
  logo =
    "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
} else if (domain.includes("pornpics")) {
  logo = "https://static.pornpics.com/style/img/logo.svg";
  todos = document.querySelectorAll("#tiles > li");
} else if (domain.includes("loyalfans")) {
  logo = "https://cdn-static.loyalfans.com/assets/images/loyalfans-light.svg";
  logo1 = "https://cdn-static.loyalfans.com/assets/images/loyalfans.svg";
} else if (domain.includes("youtube")) {
  logo = "https://www.youtube.com/s/desktop/c90d512c/img/favicon_32x32.png";
  logo1 =
    "https://www.gstatic.com/youtube/img/branding/favicon/favicon_192x192_v2.png";
}
