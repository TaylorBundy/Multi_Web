const loading = document.querySelector(".tenor-gif-embed");
const API = "https://multi-web-uf1z.onrender.com";
const nombreArchivo = document.querySelector("#nombre");
let tamano = null;
let directUrl;
let sitio;
// async function descargarVideo(url, nombre = "video.mp4") {
//   console.log("URL:", url);
//   // Modal
//   const modal = document.createElement("div");
//   modal.style.cssText = `
//         position: fixed;
//         inset: 0;
//         background: rgba(0,0,0,.6);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         z-index: 999999;
//         font-family: Arial, sans-serif;
//     `;

//   const contenido = document.createElement("div");
//   contenido.style.cssText = `
//         background: white;
//         padding: 20px;
//         border-radius: 12px;
//         width: 370px;
//         text-align: center;
//         box-shadow: 0 4px 15px rgba(0,0,0,.3);
//         color: black;
//     `;

//   const imagenContainer = document.createElement("div");
//   imagenContainer.style.position = "relative";
//   imagenContainer.style.display = "flex";
//   imagenContainer.style.justifyContent = "center";
//   imagenContainer.style.backgroundColor = backgroundColor;
//   imagenContainer.style.borderRadius = "12px";
//   imagenContainer.style.padding = "5px";

//   const imagen = document.createElement("img");
//   imagen.src = logo;
//   imagenContainer.appendChild(imagen);

//   const titulo = document.createElement("div");
//   titulo.style.cssText = `
//         font-size: 16px;
//         font-weight: bold;
//         margin-bottom: 15px;
//         word-break: break-word;
//     `;
//   titulo.textContent = `📥 Descargando: ${nombre}`; //`⬇ Descargando: ${nombre}`;

//   const porcentajeTexto = document.createElement("div");
//   porcentajeTexto.style.cssText = `
//         font-size: 20px;
//         margin-bottom: 10px;
//     `;
//   porcentajeTexto.textContent = "0%";

//   const barra = document.createElement("div");
//   barra.style.cssText = `
//         width: 100%;
//         height: 20px;
//         background: #e0e0e0;
//         border-radius: 10px;
//         overflow: hidden;
//         margin-bottom: 10px;
//     `;

//   const progreso = document.createElement("div");
//   progreso.style.cssText = `
//         width: 0%;
//         height: 100%;
//         background: #4caf50;
//         transition: width .2s;
//     `;

//   barra.appendChild(progreso);

//   const detalle = document.createElement("div");
//   detalle.style.cssText = `
//         font-size: 12px;
//         color: #666;
//         margin-top: 8px;
//     `;

//   const velocidadTexto = document.createElement("div");
//   velocidadTexto.style.cssText = `
//         font-size: 12px;
//         color: #666;
//         margin-top: 4px;
//     `;
//   velocidadTexto.textContent = "Velocidad: 0 KB/s";

//   contenido.append(
//     imagenContainer,
//     titulo,
//     porcentajeTexto,
//     barra,
//     detalle,
//     velocidadTexto,
//   );

//   modal.appendChild(contenido);
//   document.body.appendChild(modal);

//   try {
//     // const res = await fetch(url);
//     const res = await fetch(url, {
//       credentials: "include",
//     });
//     console.log("Status:", res.status);
//     console.log("Content-Length:", res.headers.get("content-length"));
//     console.log("Content-Type:", res.headers.get("content-type"));
//     console.log("Body:", res.body);

//     if (!res.ok) {
//       throw new Error(`Error ${res.status}`);
//     }

//     const total = Number(res.headers.get("content-length"));
//     console.log(total);

//     if (!total) {
//       porcentajeTexto.textContent = "Descargando...";
//       detalle.textContent = "No se puede calcular el progreso.";
//     }

//     const reader = res.body.getReader();
//     const chunks = [];

//     let descargado = 0;

//     // Variables para calcular velocidad
//     let ultimoTiempo = performance.now();
//     let ultimoDescargado = 0;

//     while (true) {
//       const { done, value } = await reader.read();

//       if (done) break;

//       chunks.push(value);
//       descargado += value.length;

//       // ===== Calcular velocidad =====
//       const ahora = performance.now();
//       const tiempo = (ahora - ultimoTiempo) / 1000;

//       if (tiempo >= 0.5) {
//         const bytesIntervalo = descargado - ultimoDescargado;
//         const velocidad = bytesIntervalo / tiempo;

//         let textoVelocidad;

//         if (velocidad >= 1024 * 1024) {
//           textoVelocidad = `${(velocidad / 1024 / 1024).toFixed(2)} MB/s`;
//         } else if (velocidad >= 1024) {
//           textoVelocidad = `${(velocidad / 1024).toFixed(2)} KB/s`;
//         } else {
//           textoVelocidad = `${velocidad.toFixed(0)} B/s`;
//         }

//         velocidadTexto.textContent = `Velocidad: ${textoVelocidad}`;

//         ultimoTiempo = ahora;
//         ultimoDescargado = descargado;

//         // Tiempo restante (ETA)
//         if (total && velocidad > 0) {
//           const restante = total - descargado;
//           const segundos = restante / velocidad;

//           let eta;

//           if (segundos >= 3600) {
//             eta = `${Math.floor(segundos / 3600)}h ${Math.floor((segundos % 3600) / 60)}m`;
//           } else if (segundos >= 60) {
//             eta = `${Math.floor(segundos / 60)}m ${Math.floor(segundos % 60)}s`;
//           } else {
//             eta = `${Math.ceil(segundos)} s`;
//           }

//           detalle.textContent = `${(descargado / 1024 / 1024).toFixed(2)} MB / ${(total / 1024 / 1024).toFixed(2)} MB • ETA: ${eta}`;
//         }
//       }

//       // ===== Progreso =====
//       if (total) {
//         const porcentaje = ((descargado / total) * 100).toFixed(1);

//         porcentajeTexto.textContent = `${porcentaje}%`;
//         progreso.style.width = `${porcentaje}%`;
//       }
//     }

//     const blob = new Blob(chunks);

//     const enlace = document.createElement("a");
//     enlace.href = URL.createObjectURL(blob);
//     enlace.download = nombre;

//     document.body.appendChild(enlace);
//     enlace.click();
//     enlace.remove();

//     URL.revokeObjectURL(enlace.href);

//     porcentajeTexto.textContent = "100%";
//     progreso.style.width = "100%";
//     detalle.textContent = "Descarga completada";
//     velocidadTexto.textContent = "Velocidad: 0 KB/s";

//     setTimeout(() => modal.remove(), 1000);
//   } catch (error) {
//     modal.remove();
//     throw error;
//   }
// }

// async function descargarDesdeServidor2(url, nombre = "video.mp4") {
//   const respuesta = await fetch(`${API}/descargar`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ url }),
//   });

//   if (!respuesta.ok) {
//     throw new Error(`Error ${respuesta.status}`);
//   }

//   const total = Number(respuesta.headers.get("content-length"));

//   console.log("Tamaño total:", total);

//   const reader = respuesta.body.getReader();

//   const chunks = [];
//   let descargado = 0;

//   while (true) {
//     const { done, value } = await reader.read();

//     if (done) break;

//     chunks.push(value);
//     descargado += value.length;

//     if (total) {
//       const porcentaje = (descargado / total) * 100;

//       console.log(
//         `${porcentaje.toFixed(1)}%`,
//         `${(descargado / 1024 / 1024).toFixed(2)} MB`,
//       );
//     }
//   }

//   const blob = new Blob(chunks);

//   const enlace = document.createElement("a");
//   enlace.href = URL.createObjectURL(blob);
//   enlace.download = nombre;

//   document.body.appendChild(enlace);
//   enlace.click();
//   enlace.remove();

//   URL.revokeObjectURL(enlace.href);
// }

async function obtenerMedia(link) {
  const response = await fetch(link, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const html = await response.text();

  const resultado = {
    tipo: null,
    url: null,
    urls: [],
  };

  // Buscar URLs de videos
  const videos =
    html.match(
      /https?:\/\/[^"'\\\s]+?\.(?:mp4|webm|m3u8|mov|mkv)(?:\?[^"'\\\s]*)?/gi,
    ) || [];

  // Buscar URLs de imágenes
  const imagenes =
    html.match(
      /https?:\/\/[^"'\\\s]+?\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^"'\\\s]*)?/gi,
    ) || [];

  if (videos.length > 0) {
    resultado.tipo = "video";
    resultado.urls = [...new Set(videos)];
    resultado.url = resultado.urls[0];
  } else if (imagenes.length > 0) {
    resultado.tipo = "imagen";
    resultado.urls = [...new Set(imagenes)];
    resultado.url = resultado.urls[0];
  }

  return resultado;
}

function obtenerNombreConExtension(url) {
  try {
    const urlObj = new URL(url);

    // Obtener el último segmento del path
    let nombre = urlObj.pathname.split("/").pop();

    // Si ya tiene extensión
    if (/\.[a-z0-9]+$/i.test(nombre)) {
      return nombre;
    }

    // Buscar extensión en parámetros
    const format = urlObj.searchParams.get("format");

    if (format) {
      return `${nombre}.${format}`;
    }

    // Si no se pudo determinar
    return nombre || "imagen";
  } catch (error) {
    console.error("URL inválida:", error);
    return "imagen";
  }
}

async function descargarImagen(url, nombre = "imagen") {
  console.log("URL:", url);

  // ========================================
  // Modal
  // ========================================

  const modal = document.createElement("div");

  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: Arial, sans-serif;
  `;

  const contenido = document.createElement("div");

  contenido.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 370px;
    max-width: 90vw;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,.3);
    color: black;
  `;

  // ========================================
  // Preview
  // ========================================

  const previewContainer = document.createElement("div");

  previewContainer.style.cssText = `
    width: 100%;
    min-height: 120px;
    max-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${backgroundColor};
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
  `;

  const preview = document.createElement("img");

  preview.src = url;

  preview.style.cssText = `
    max-width: 100%;
    max-height: 330px;
    object-fit: contain;
    display: block;
  `;

  previewContainer.appendChild(preview);

  // ========================================
  // Título
  // ========================================

  const titulo = document.createElement("div");

  titulo.style.cssText = `
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    word-break: break-word;
  `;

  titulo.textContent = nombre;

  // ========================================
  // Estado
  // ========================================

  const estado = document.createElement("div");

  estado.style.cssText = `
    font-size: 13px;
    color: #666;
    margin-bottom: 15px;
  `;

  estado.textContent = "Vista previa";

  // ========================================
  // Botón descargar
  // ========================================

  const botonDescargar = document.createElement("button");

  botonDescargar.textContent = "📥 Descargar";

  botonDescargar.style.cssText = `
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #4caf50;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 8px;
  `;

  // ========================================
  // Botón cerrar
  // ========================================

  const botonCerrar = document.createElement("button");

  botonCerrar.textContent = "Cancelar";

  botonCerrar.style.cssText = `
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #e53935;
    color: white;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  `;

  // ========================================
  // Agregar
  // ========================================

  contenido.append(
    previewContainer,
    titulo,
    estado,
    botonDescargar,
    botonCerrar,
  );

  modal.appendChild(contenido);

  document.body.appendChild(modal);

  // ========================================
  // Verificar que la imagen cargó
  // ========================================

  preview.onload = () => {
    estado.textContent = "Vista previa lista";
  };

  preview.onerror = () => {
    estado.textContent = "❌ No se pudo cargar la imagen";

    botonDescargar.disabled = true;

    botonDescargar.style.opacity = "0.5";
    botonDescargar.style.cursor = "default";
  };

  // ========================================
  // Cerrar
  // ========================================

  botonCerrar.onclick = () => {
    modal.remove();
  };

  // ========================================
  // Descargar
  // ========================================

  botonDescargar.onclick = async () => {
    botonDescargar.disabled = true;

    botonDescargar.style.opacity = "0.6";

    estado.textContent = "📥 Descargando...";

    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const blob = await res.blob();

      // ====================================
      // Detectar extensión
      // ====================================

      if (!/\.[a-z0-9]+$/i.test(nombre)) {
        const extensiones = {
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/webp": ".webp",
          "image/gif": ".gif",
          "image/avif": ".avif",
          "image/bmp": ".bmp",
          "image/svg+xml": ".svg",
        };

        nombre += extensiones[blob.type] || ".jpg";
      }

      // ====================================
      // Crear descarga
      // ====================================

      const blobUrl = URL.createObjectURL(blob);

      const enlace = document.createElement("a");

      enlace.href = blobUrl;

      enlace.download = nombre;

      document.body.appendChild(enlace);

      enlace.click();

      enlace.remove();

      URL.revokeObjectURL(blobUrl);

      estado.textContent = "✅ Descarga completada";

      botonDescargar.remove();

      setTimeout(() => {
        modal.remove();
      }, 1200);
    } catch (error) {
      console.error("Error descargando imagen:", error);

      estado.textContent = "❌ No se pudo descargar la imagen";

      botonDescargar.disabled = false;

      botonDescargar.style.opacity = "1";
    }
  };
}

async function descargarImagen2(url, nombre = "imagen") {
  console.log("URL:", url);

  // =========================
  // Modal
  // =========================

  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    font-family: Arial, sans-serif;
  `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 370px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,.3);
    color: black;
  `;

  // Logo
  const imagenContainer = document.createElement("div");
  imagenContainer.style.cssText = `
    position: relative;
    display: flex;
    justify-content: center;
    background-color: ${backgroundColor};
    border-radius: 12px;
    padding: 5px;
    margin-bottom: 15px;
  `;

  const imagen = document.createElement("img");
  imagen.src = logo;
  imagen.style.cssText = `
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
  `;

  imagenContainer.appendChild(imagen);

  // Título
  const titulo = document.createElement("div");
  titulo.style.cssText = `
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    word-break: break-word;
  `;

  titulo.textContent = `📥 Descargando: ${nombre}`;

  // Porcentaje
  const porcentajeTexto = document.createElement("div");
  porcentajeTexto.style.cssText = `
    font-size: 20px;
    margin-bottom: 10px;
  `;

  porcentajeTexto.textContent = "0%";

  // Barra
  const barra = document.createElement("div");
  barra.style.cssText = `
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
  `;

  const progreso = document.createElement("div");
  progreso.style.cssText = `
    width: 0%;
    height: 100%;
    background: #4caf50;
    transition: width .2s;
  `;

  barra.appendChild(progreso);

  // Detalle
  const detalle = document.createElement("div");
  detalle.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-top: 8px;
  `;

  // Velocidad
  const velocidadTexto = document.createElement("div");
  velocidadTexto.style.cssText = `
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  `;

  velocidadTexto.textContent = "Velocidad: 0 KB/s";

  contenido.append(
    imagenContainer,
    titulo,
    porcentajeTexto,
    barra,
    detalle,
    velocidadTexto,
  );

  modal.appendChild(contenido);
  document.body.appendChild(modal);

  try {
    // =========================
    // Descargar
    // =========================

    const res = await fetch(url, {
      credentials: "include",
    });

    console.log("Status:", res.status);
    console.log("Content-Length:", res.headers.get("content-length"));
    console.log("Content-Type:", res.headers.get("content-type"));

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const total = Number(res.headers.get("content-length"));

    if (!total) {
      porcentajeTexto.textContent = "Descargando...";
      detalle.textContent = "No se puede calcular el progreso.";
    }

    const reader = res.body.getReader();

    const chunks = [];

    let descargado = 0;

    // =========================
    // Velocidad
    // =========================

    let ultimoTiempo = performance.now();
    let ultimoDescargado = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);

      descargado += value.length;

      // =========================
      // Calcular velocidad
      // =========================

      const ahora = performance.now();

      const tiempo = (ahora - ultimoTiempo) / 1000;

      if (tiempo >= 0.5) {
        const bytesIntervalo = descargado - ultimoDescargado;

        const velocidad = bytesIntervalo / tiempo;

        let textoVelocidad;

        if (velocidad >= 1024 * 1024) {
          textoVelocidad = `${(velocidad / 1024 / 1024).toFixed(2)} MB/s`;
        } else if (velocidad >= 1024) {
          textoVelocidad = `${(velocidad / 1024).toFixed(2)} KB/s`;
        } else {
          textoVelocidad = `${velocidad.toFixed(0)} B/s`;
        }

        velocidadTexto.textContent = `Velocidad: ${textoVelocidad}`;

        ultimoTiempo = ahora;
        ultimoDescargado = descargado;

        // =========================
        // ETA
        // =========================

        if (total && velocidad > 0) {
          const restante = total - descargado;

          const segundos = restante / velocidad;

          let eta;

          if (segundos >= 3600) {
            eta =
              `${Math.floor(segundos / 3600)}h ` +
              `${Math.floor((segundos % 3600) / 60)}m`;
          } else if (segundos >= 60) {
            eta =
              `${Math.floor(segundos / 60)}m ` +
              `${Math.floor(segundos % 60)}s`;
          } else {
            eta = `${Math.ceil(segundos)} s`;
          }

          detalle.textContent =
            `${(descargado / 1024 / 1024).toFixed(2)} MB / ` +
            `${(total / 1024 / 1024).toFixed(2)} MB • ` +
            `ETA: ${eta}`;
        }
      }

      // =========================
      // Progreso
      // =========================

      if (total) {
        const porcentaje = ((descargado / total) * 100).toFixed(1);

        porcentajeTexto.textContent = `${porcentaje}%`;

        progreso.style.width = `${porcentaje}%`;
      }
    }

    // =========================
    // Crear imagen
    // =========================

    const blob = new Blob(chunks, {
      type: res.headers.get("content-type") || "image/*",
    });

    // =========================
    // Determinar extensión
    // =========================

    if (!/\.[a-z0-9]+$/i.test(nombre)) {
      const tipo = blob.type;

      const extensiones = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/gif": ".gif",
        "image/avif": ".avif",
        "image/bmp": ".bmp",
        "image/svg+xml": ".svg",
      };

      nombre += extensiones[tipo] || ".jpg";
    }

    // =========================
    // Descargar
    // =========================

    const blobUrl = URL.createObjectURL(blob);

    const enlace = document.createElement("a");

    enlace.href = blobUrl;
    enlace.download = nombre;

    document.body.appendChild(enlace);

    enlace.click();

    enlace.remove();

    URL.revokeObjectURL(blobUrl);

    // =========================
    // Finalizado
    // =========================

    porcentajeTexto.textContent = "100%";

    progreso.style.width = "100%";

    detalle.textContent = "Descarga completada";

    velocidadTexto.textContent = "Velocidad: 0 KB/s";

    setTimeout(() => {
      modal.remove();
    }, 1000);
  } catch (error) {
    modal.remove();

    console.error("Error descargando imagen:", error);

    throw error;
  }
}

async function descargarVideoNuevo(url, nombre = "video.mp4") {
  console.log("URL:", url);
  console.log("Nombre:", nombre);
  // Modal
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: Arial, sans-serif;
    `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 12px;
        width: 370px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,.3);
        color: black;
    `;

  const imagenContainer = document.createElement("div");
  imagenContainer.style.position = "relative";
  imagenContainer.style.display = "flex";
  imagenContainer.style.justifyContent = "center";
  imagenContainer.style.backgroundColor = backgroundColor;
  imagenContainer.style.borderRadius = "12px";
  imagenContainer.style.padding = "5px";

  const imagen = document.createElement("img");
  imagen.src = logo;
  imagenContainer.appendChild(imagen);

  const titulo = document.createElement("div");
  titulo.style.cssText = `
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        word-break: break-word;
    `;
  titulo.textContent = `ߓ Descargando: ${nombre}`; //`⬇ Descargando: ${nombre}`;

  const porcentajeTexto = document.createElement("div");
  porcentajeTexto.style.cssText = `
        font-size: 20px;
        margin-bottom: 10px;
    `;
  porcentajeTexto.textContent = "0%";

  const barra = document.createElement("div");
  barra.style.cssText = `
        width: 100%;
        height: 20px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    `;

  const progreso = document.createElement("div");
  progreso.style.cssText = `
        width: 0%;
        height: 100%;
        background: #4caf50;
        transition: width .2s;
    `;

  barra.appendChild(progreso);

  const detalle = document.createElement("div");
  detalle.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 8px;
    `;

  const velocidadTexto = document.createElement("div");
  velocidadTexto.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 4px;
    `;
  velocidadTexto.textContent = "Velocidad: 0 KB/s";

  contenido.append(
    imagenContainer,
    titulo,
    porcentajeTexto,
    barra,
    detalle,
    velocidadTexto,
  );

  modal.appendChild(contenido);
  document.body.appendChild(modal);

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const total = Number(res.headers.get("content-length"));

    if (!total) {
      porcentajeTexto.textContent = "Descargando...";
      detalle.textContent = "No se puede calcular el progreso.";
    }

    const reader = res.body.getReader();
    const chunks = [];

    let descargado = 0;

    // Variables para calcular velocidad
    let ultimoTiempo = performance.now();
    let ultimoDescargado = 0;

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      descargado += value.length;

      // ===== Calcular velocidad =====
      const ahora = performance.now();
      const tiempo = (ahora - ultimoTiempo) / 1000;

      if (tiempo >= 0.5) {
        const bytesIntervalo = descargado - ultimoDescargado;
        const velocidad = bytesIntervalo / tiempo;

        let textoVelocidad;

        if (velocidad >= 1024 * 1024) {
          textoVelocidad = `${(velocidad / 1024 / 1024).toFixed(2)} MB/s`;
        } else if (velocidad >= 1024) {
          textoVelocidad = `${(velocidad / 1024).toFixed(2)} KB/s`;
        } else {
          textoVelocidad = `${velocidad.toFixed(0)} B/s`;
        }

        velocidadTexto.textContent = `Velocidad: ${textoVelocidad}`;

        ultimoTiempo = ahora;
        ultimoDescargado = descargado;

        // Tiempo restante (ETA)
        if (total && velocidad > 0) {
          const restante = total - descargado;
          const segundos = restante / velocidad;

          let eta;

          if (segundos >= 3600) {
            eta = `${Math.floor(segundos / 3600)}h ${Math.floor((segundos % 3600) / 60)}m`;
          } else if (segundos >= 60) {
            eta = `${Math.floor(segundos / 60)}m ${Math.floor(segundos % 60)}s`;
          } else {
            eta = `${Math.ceil(segundos)} s`;
          }

          detalle.textContent = `${(descargado / 1024 / 1024).toFixed(2)} MB / ${(total / 1024 / 1024).toFixed(2)} MB • ETA: ${eta}`;
        }
      }

      // ===== Progreso =====
      if (total) {
        const porcentaje = ((descargado / total) * 100).toFixed(1);

        porcentajeTexto.textContent = `${porcentaje}%`;
        progreso.style.width = `${porcentaje}%`;
      }
    }

    const blob = new Blob(chunks);

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombre;

    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    URL.revokeObjectURL(enlace.href);

    porcentajeTexto.textContent = "100%";
    progreso.style.width = "100%";
    detalle.textContent = "Descarga completada";
    velocidadTexto.textContent = "Velocidad: 0 KB/s";

    setTimeout(() => modal.remove(), 1000);
  } catch (error) {
    modal.remove();
    throw error;
  }
}

async function descargarDesdeServidor(url, nombre = "video.mp4") {
  const backgroundColor = "#f0f0f0";

  // ==========================================
  // MODAL
  // ==========================================

  const modal = document.createElement("div");

  modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: Arial, sans-serif;
    `;

  const contenido = document.createElement("div");

  contenido.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 12px;
        width: 370px;
        text-align: center;
        box-shadow: 0 4px 15px rgba(0,0,0,.3);
        color: black;
    `;

  // ==========================================
  // LOGO
  // ==========================================

  const imagenContainer = document.createElement("div");

  imagenContainer.style.cssText = `
        position: relative;
        display: flex;
        justify-content: center;
        background-color: ${backgroundColor};
        border-radius: 12px;
        padding: 5px;
    `;

  const imagen = document.createElement("img");
  if (url.includes("ssstwitter")) {
    imagen.style.width = tamano;
  }
  if (url.includes("phncdn.com")) {
    imagen.style.background = "#000";
  }
  imagen.src = logo;

  if (typeof tamano !== "undefined" && tamano) {
    imagen.style.width = tamano;
  }

  imagenContainer.appendChild(imagen);

  // ==========================================
  // TITULO
  // ==========================================

  const titulo = document.createElement("div");

  titulo.style.cssText = `
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        word-break: break-word;
    `;

  titulo.textContent = `📥 Descargando: ${nombre}`;

  // ==========================================
  // PORCENTAJE
  // ==========================================

  const porcentajeTexto = document.createElement("div");

  porcentajeTexto.style.cssText = `
        font-size: 20px;
        margin-bottom: 10px;
    `;

  porcentajeTexto.textContent = "Conectando...";

  // ==========================================
  // BARRA
  // ==========================================

  const barra = document.createElement("div");

  barra.style.cssText = `
        width: 100%;
        height: 20px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 10px;
    `;

  const progreso = document.createElement("div");

  progreso.style.cssText = `
        width: 0%;
        height: 100%;
        background: #4caf50;
        transition: width .2s;
    `;

  barra.appendChild(progreso);

  // ==========================================
  // DETALLE / ETA
  // ==========================================

  const detalle = document.createElement("div");

  detalle.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 8px;
    `;

  // ==========================================
  // VELOCIDAD
  // ==========================================

  const velocidadTexto = document.createElement("div");

  velocidadTexto.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 4px;
    `;

  velocidadTexto.textContent = "Velocidad: 0 KB/s";

  // ==========================================
  // ARMAR MODAL
  // ==========================================

  contenido.append(
    imagenContainer,
    titulo,
    porcentajeTexto,
    barra,
    detalle,
    velocidadTexto,
  );

  modal.appendChild(contenido);

  document.body.appendChild(modal);

  // ==========================================
  // DESCARGA
  // ==========================================

  try {
    const respuesta = await fetch(`${API}/descargar`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        url: url,
      }),
    });

    console.log("Status:", respuesta.status);

    if (!respuesta.ok) {
      let mensaje = `Error ${respuesta.status}`;

      try {
        const datos = await respuesta.json();

        if (datos.error) {
          mensaje = datos.error;
        }
      } catch (_) {}

      throw new Error(mensaje);
    }

    // ==========================================
    // NOMBRE DEL ARCHIVO
    // ==========================================

    const contentDisposition = respuesta.headers.get("Content-Disposition");

    let nombreArchivo = nombre;

    if (contentDisposition && contentDisposition.includes("filename=")) {
      nombreArchivo = contentDisposition
        .split("filename=")[1]
        .replace(/['"]/g, "");
    }

    titulo.textContent = `📥 Descargando: ${nombreArchivo}`;

    // ==========================================
    // TAMAÑO TOTAL
    // ==========================================

    const contentLength = respuesta.headers.get("content-length");

    const total = contentLength ? Number(contentLength) : null;

    console.log("Content-Length:", contentLength);
    console.log("Tamaño total:", total);

    if (!total) {
      porcentajeTexto.textContent = "Descargando...";

      detalle.textContent = "No se puede calcular el progreso total.";
    }

    // ==========================================
    // STREAM
    // ==========================================

    const reader = respuesta.body.getReader();

    const chunks = [];

    let descargado = 0;

    // ==========================================
    // VELOCIDAD
    // ==========================================

    let ultimoTiempo = performance.now();

    let ultimoDescargado = 0;

    // ==========================================
    // LECTURA
    // ==========================================

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);

      descargado += value.length;

      // ======================================
      // VELOCIDAD
      // ======================================

      const ahora = performance.now();

      const tiempo = (ahora - ultimoTiempo) / 1000;

      if (tiempo >= 0.5) {
        const bytesIntervalo = descargado - ultimoDescargado;

        const velocidad = bytesIntervalo / tiempo;

        let textoVelocidad;

        if (velocidad >= 1024 * 1024) {
          textoVelocidad = `${(velocidad / 1024 / 1024).toFixed(2)} MB/s`;
        } else if (velocidad >= 1024) {
          textoVelocidad = `${(velocidad / 1024).toFixed(2)} KB/s`;
        } else {
          textoVelocidad = `${velocidad.toFixed(0)} B/s`;
        }

        velocidadTexto.textContent = `Velocidad: ${textoVelocidad}`;

        ultimoTiempo = ahora;

        ultimoDescargado = descargado;

        // ==================================
        // ETA
        // ==================================

        if (total && velocidad > 0) {
          const restante = total - descargado;

          const segundos = restante / velocidad;

          let eta;

          if (segundos >= 3600) {
            eta = `${Math.floor(segundos / 3600)}h ${Math.floor(
              (segundos % 3600) / 60,
            )}m`;
          } else if (segundos >= 60) {
            eta = `${Math.floor(segundos / 60)}m ${Math.floor(segundos % 60)}s`;
          } else {
            eta = `${Math.ceil(segundos)} s`;
          }

          detalle.textContent = `${(descargado / 1024 / 1024).toFixed(
            2,
          )} MB / ${(total / 1024 / 1024).toFixed(2)} MB • ETA: ${eta}`;
        }
      }

      // ======================================
      // PORCENTAJE
      // ======================================

      if (total) {
        const porcentaje = ((descargado / total) * 100).toFixed(1);

        porcentajeTexto.textContent = `${porcentaje}%`;

        progreso.style.width = `${porcentaje}%`;
      }
    }

    // ==========================================
    // CREAR BLOB
    // ==========================================

    const blob = new Blob(chunks, {
      type: "video/mp4",
    });

    const urlBlob = URL.createObjectURL(blob);

    // ==========================================
    // DESCARGA DEL NAVEGADOR
    // ==========================================

    const enlace = document.createElement("a");

    enlace.href = urlBlob;

    enlace.download = nombreArchivo;

    document.body.appendChild(enlace);

    enlace.click();

    enlace.remove();

    URL.revokeObjectURL(urlBlob);

    // ==========================================
    // FINALIZADO
    // ==========================================

    porcentajeTexto.textContent = "100%";

    progreso.style.width = "100%";

    detalle.textContent = "Descarga completada";

    velocidadTexto.textContent = "Velocidad: 0 KB/s";

    setTimeout(() => {
      modal.remove();
    }, 1200);
  } catch (error) {
    console.error("Error descargando:", error);

    modal.remove();

    throw error;
  }
}

function mostrarDescarga(url, nombre) {
  console.log(sitio);
  let linkkk;
  if (url.includes("redgifs.com")) {
    logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
    //nombreFinal = url.split("/").pop().replace(".mp4", "");
  } else if (url.includes("porn4fans.com/get_file")) {
    logo = "https://www.porn4fans.com/static/images/logo-hover.svg";
    // (async () => {
    //   texto = await navigator.clipboard.readText();
    //   //console.log(texto);
    //   nombre = texto.split(".-.")[1];
    //   nombreFinal = nombre;
    //   console.log(nombreFinal);
    // })();
  } else if (url.includes("pornhub") || url.includes("phncdn.com")) {
    logo = "https://ei.phncdn.com/pics/logos/10211.png?cache=2025091603";
  } else if (url.includes("twpornstars") || url.includes("video.twimg.com")) {
    logo = "https://www.twpornstars.com/favicon.ico";
    tamano = "30px";
    //const nomTemp = url.split("?")[0];
    //nombreFinal = nomTemp.split("/").pop().replace(".mp4", "");
  } else if (
    url.includes("media.fastdl") ||
    url.includes("instagram.com/reel")
  ) {
    logo = "https://static.cdninstagram.com/rsrc.php/yr/r/rzWiSjZRxk5.webp";
  } else if (url.includes("ssstwitter")) {
    logo =
      "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
    tamano = "30px";
  }
  if (sitio === "imagen") {
    if (
      url.includes("fapello.com") ||
      url.includes("pbs.twimg.com") ||
      url.includes("pornpics.com")
    ) {
      nombre = obtenerNombreConExtension(url.replace(".mp4", ""));
    }
  }
  mostrarResultado(`
        <div class="card">
            <h2>${nombre}</h2>

            <button id="btnDescargar">
            <img id="btnImage" src="imagenes/descargar.avif" />
                Descargar
            </button>
        </div>
    `);
  const boton = document.getElementById("btnDescargar");
  boton.title = `Click para descargar: ${url}`;
  if (url.includes("porn4fans.com/get_file")) {
    //window.open(url, "_blank");
    //(async () => {
    descargarVideoNuevo(url, nombre);
    //})();
  }
  if (
    url.includes("media.redgifs.com") ||
    url.includes("kl.phncdn.com") ||
    url.includes("ssstwitter")
  ) {
    console.log("jaja");
    mostrarPreview44(url, nombre);
  } else if (url.includes("twpornstars") || url.includes("video.twimg.com")) {
    mostrarPreview2(url, nombre);
  } else if (url.includes("instagram.com/reel")) {
    mostrarPreview44(directUrl, nombre);
  } else if (url.includes("el2.phncdn.com")) {
    mostrarPreview2(url, nombre);
  } else if (url.includes("downixcdn")) {
    mostrarPreview2(url, nombre);
  } else {
    if (sitio === "imagen") {
      mostrarPreview(url, sitio, nombre);
    } else {
      mostrarPreview(url, nombre);
    }
  }
  // mostrarPreview(url, nombre);
  loading.style.display = "none";
  //const boton = document.getElementById("btnDescargar");

  boton.addEventListener("click", async () => {
    // Reemplazá por tus variables reales de logo y color si las tenés
    //const logo = "tu-logo.png";
    const backgroundColor = "#f0f0f0";
    //const urlInput = document.getElementById("videoUrl").value; // Tu input de origen

    if (!url) {
      alert("Por favor, ingresa una URL válida.");
      return;
    }

    boton.innerHTML = `<img id="btnImage" src="imagenes/procesando.avif" /> Procesando...`;
    boton.disabled = true;
    (async () => {
      // if (url.includes("phncdn.com")) {
      //   await descargarVideo(url, `${nombre}.mp4`);
      // } else {
      if (sitio === "imagen") {
        await descargarImagen(url, `${nombre}`);
      } else {
        if (url.includes("el2.phncdn.com") || url.includes("downixcdn")) {
          await descargarVideoNuevo(url, `${nombre}.mp4`);
        } else {
          await descargarDesdeServidor(url, `${nombre}`);
        }
      }
      //}
    })();
    // if (
    //   url.includes("media.fastdl") ||
    //   url.includes("downixcdn.com") ||
    //   url.includes("fbcdn.net") ||
    //   url.includes("media.redgifs") ||
    //   url.includes("ssscdn.io/ssstwitter")
    // ) {
    //   (async () => {
    //     await descargarDesdeServidor(url, `${nombre}.mp4`);
    //   })();
    //   // (async () => {
    //   //   await descargarVideo(url, `${nombre}.mp4`);
    //   // })();
    // } else {
    //   // ==========================================
    //   // 1. CREACIÓN DEL MODAL (Tu diseño original)
    //   // ==========================================
    //   const modal = document.createElement("div");
    //   modal.style.cssText = `position: fixed; inset: 0; background: rgba(0,0,0,.6); display: flex; align-items: center; justify-content: center; z-index: 999999; font-family: Arial, sans-serif;`;

    //   const contenido = document.createElement("div");
    //   contenido.style.cssText = `background: white; padding: 20px; border-radius: 12px; width: 370px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,.3); color: black;`;

    //   const imagenContainer = document.createElement("div");
    //   imagenContainer.style.cssText = `position: relative; display: flex; justify-content: center; background-color: ${backgroundColor}; border-radius: 12px; padding: 5px;`;

    //   const imagen = document.createElement("img");
    //   if (url.includes("ssstwitter")) {
    //     imagen.style.width = tamano;
    //   }
    //   imagen.src = logo;
    //   imagenContainer.appendChild(imagen);

    //   const titulo = document.createElement("div");
    //   titulo.style.cssText = `font-size: 16px; font-weight: bold; margin-bottom: 15px; word-break: break-word;`;
    //   titulo.textContent = `📥 Procesando video...`;

    //   const porcentajeTexto = document.createElement("div");
    //   porcentajeTexto.style.cssText = `font-size: 20px; margin-bottom: 10px;`;
    //   porcentajeTexto.textContent = "Conectando...";

    //   const barra = document.createElement("div");
    //   barra.style.cssText = `width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; overflow: hidden; margin-bottom: 10px;`;

    //   const progreso = document.createElement("div");
    //   progreso.style.cssText = `width: 0%; height: 100%; background: #4caf50; transition: width .2s;`;
    //   barra.appendChild(progreso);

    //   const detalle = document.createElement("div");
    //   detalle.style.cssText = `font-size: 12px; color: #666; margin-top: 8px;`;

    //   const velocidadTexto = document.createElement("div");
    //   velocidadTexto.style.cssText = `font-size: 12px; color: #666; margin-top: 4px;`;
    //   velocidadTexto.textContent = "Velocidad: 0 KB/s";

    //   contenido.append(
    //     imagenContainer,
    //     titulo,
    //     porcentajeTexto,
    //     barra,
    //     detalle,
    //     velocidadTexto,
    //   );
    //   modal.appendChild(contenido);
    //   document.body.appendChild(modal);

    //   try {
    //     // ==========================================
    //     // 2. PETICIÓN POST AL SERVIDOR PYTHON
    //     // ==========================================
    //     const respuesta = await fetch(`${API}/descargar`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ url: url }),
    //     });

    //     if (!respuesta.ok) {
    //       const errorDatos = await respuesta.json();
    //       throw new Error(
    //         errorDatos.error || "Error desconocido en el servidor.",
    //       );
    //     }

    //     // Obtener nombre del archivo desde las cabeceras
    //     const contentDisposition = respuesta.headers.get("Content-Disposition");
    //     let nombreArchivo = `${nombre}`; // Valor por defecto
    //     if (contentDisposition && contentDisposition.includes("filename=")) {
    //       nombreArchivo = contentDisposition
    //         .split("filename=")[1]
    //         .replace(/['"]/g, "");
    //     }

    //     // Actualizar título del modal con el nombre real obtenido
    //     titulo.textContent = `📥 Descargando: ${nombreArchivo}`;

    //     // ==========================================
    //     // 3. PROCESAMIENTO DEL FLUJO BINARIO (STREAM)
    //     // ==========================================
    //     const total = Number(respuesta.headers.get("content-length"));
    //     console.log("Tamaño total:", total);
    //     if (!total) {
    //       porcentajeTexto.textContent = "Descargando...";
    //       detalle.textContent = "No se puede calcular el progreso total.";
    //     }

    //     const reader = respuesta.body.getReader();
    //     const chunks = [];
    //     let descargado = 0;

    //     let ultimoTiempo = performance.now();
    //     let ultimoDescargado = 0;

    //     while (true) {
    //       const { done, value } = await reader.read();
    //       if (done) break;

    //       chunks.push(value);
    //       descargado += value.length;

    //       const ahora = performance.now();
    //       const tiempo = (ahora - ultimoTiempo) / 1000;

    //       if (tiempo >= 0.5) {
    //         const bytesIntervalo = descargado - ultimoDescargado;
    //         const velocidad = bytesIntervalo / tiempo;
    //         let textoVelocidad;

    //         if (velocidad >= 1024 * 1024) {
    //           textoVelocidad = `${(velocidad / 1024 / 1024).toFixed(2)} MB/s`;
    //         } else if (velocidad >= 1024) {
    //           textoVelocidad = `${(velocidad / 1024).toFixed(2)} KB/s`;
    //         } else {
    //           textoVelocidad = `${velocidad.toFixed(0)} B/s`;
    //         }

    //         velocidadTexto.textContent = `Velocidad: ${textoVelocidad}`;
    //         ultimoTiempo = ahora;
    //         ultimoDescargado = descargado;

    //         if (total && velocidad > 0) {
    //           const restante = total - descargado;
    //           const segundos = restante / velocidad;
    //           let eta;

    //           if (segundos >= 3600) {
    //             eta = `${Math.floor(segundos / 3600)}h ${Math.floor((segundos % 3600) / 60)}m`;
    //           } else if (segundos >= 60) {
    //             eta = `${Math.floor(segundos / 60)}m ${Math.floor(segundos % 60)}s`;
    //           } else {
    //             eta = `${Math.ceil(segundos)} s`;
    //           }

    //           detalle.textContent = `${(descargado / 1024 / 1024).toFixed(2)} MB / ${(total / 1024 / 1024).toFixed(2)} MB • ETA: ${eta}`;
    //         }
    //       }

    //       if (total) {
    //         const porcentaje = ((descargado / total) * 100).toFixed(1);
    //         porcentajeTexto.textContent = `${porcentaje}%`;
    //         progreso.style.width = `${porcentaje}%`;
    //       }
    //     }

    //     // ==========================================
    //     // 4. DESCARGA FINAL AUTOMÁTICA EN CLIENTE
    //     // ==========================================
    //     const blob = new Blob(chunks);
    //     const urlBlobLocal = window.URL.createObjectURL(blob);

    //     const enlaceTemporal = document.createElement("a");
    //     enlaceTemporal.href = urlBlobLocal;
    //     enlaceTemporal.setAttribute("download", nombreArchivo);

    //     document.body.appendChild(enlaceTemporal);
    //     enlaceTemporal.click();

    //     // Limpieza
    //     document.body.removeChild(enlaceTemporal);
    //     window.URL.revokeObjectURL(urlBlobLocal);

    //     // Feedback de éxito
    //     porcentajeTexto.textContent = "100%";
    //     progreso.style.width = "100%";
    //     detalle.textContent = "Descarga completada";
    //     velocidadTexto.textContent = "Velocidad: 0 KB/s";

    //     setTimeout(() => modal.remove(), 1200);
    //   } catch (error) {
    //     console.error("Error:", error);
    //     alert("Error: " + error.message);
    //     modal.remove(); // Remueve el modal si falla el proceso
    //   } finally {
    //     //boton.innerText = "Descargar";
    //     boton.innerHTML = `<img id="btnImage" src="imagenes/descargar.avif" />Descargar`;
    //     boton.disabled = false;
    //   }
    // }
  });

  // boton.addEventListener("click", async () => {
  //   //const urlInput = document.getElementById("videoUrl").value;

  //   if (!url) {
  //     alert("Por favor, ingresa una URL válida.");
  //     return;
  //   }

  //   boton.innerText = "Descargando en el servidor...";
  //   boton.disabled = true;

  //   try {
  //     const respuesta = await fetch(`${API}/descargar`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ url: url }),
  //     });

  //     // Validar si el backend devolvió un error (que vendría en formato JSON)
  //     if (!respuesta.ok) {
  //       const errorDatos = await respuesta.json();
  //       throw new Error(
  //         errorDatos.error || "Error desconocido en el servidor.",
  //       );
  //     }

  //     // LEER LA RESPUESTA COMO ARCHIVO BINARIO (BLOB)
  //     const blobVideo = await respuesta.blob();

  //     // Obtener el nombre del archivo enviado desde los encabezados del servidor (u otorgar uno por defecto)
  //     const contentDisposition = respuesta.headers.get("Content-Disposition");
  //     let nombreArchivo = `${nombre}`;
  //     if (contentDisposition && contentDisposition.includes("filename=")) {
  //       nombreArchivo = contentDisposition
  //         .split("filename=")[1]
  //         .replace(/['"]/g, "");
  //     }

  //     // Crear una URL local en el navegador del usuario apuntando al objeto binario
  //     const urlBlobLocal = window.URL.createObjectURL(blobVideo);

  //     // Crear elemento de descarga oculto e iniciarla de inmediato
  //     const enlaceTemporal = document.createElement("a");
  //     enlaceTemporal.href = urlBlobLocal;
  //     enlaceTemporal.setAttribute("download", nombreArchivo);

  //     document.body.appendChild(enlaceTemporal);
  //     enlaceTemporal.click();

  //     // Limpieza de memoria
  //     document.body.removeChild(enlaceTemporal);
  //     window.URL.revokeObjectURL(urlBlobLocal);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Error: " + error.message);
  //   } finally {
  //     boton.innerText = "Descargar";
  //     boton.disabled = false;
  //   }
  // });

  // boton.addEventListener("click", async () => {
  //   // 1. Obtén la URL del input (asegúrate de que el id coincida con tu HTML)
  //   //const urlInput = document.getElementById("videoUrl").value;

  //   if (!url) {
  //     alert("Por favor, ingresa una URL válida.");
  //     return;
  //   }

  //   // Opcional: Cambiar el texto del botón para feedback visual
  //   boton.innerText = "Procesando...";
  //   boton.disabled = true;

  //   try {
  //     // 2. Hacer la petición HTTP POST al servidor Python (puerto 5000 por defecto en Flask)
  //     const respuesta = await fetch(`${API}/descargar`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ url: url }), // Envía la URL en formato JSON
  //     });

  //     const datos = await respuesta.json();
  //     console.log("Respuesta del servidor:", datos);

  //     // 3. Procesar la respuesta del servidor
  //     if (datos.success) {
  //       // Opción A: Abrir el enlace de descarga directa en una nueva pestaña
  //       //window.open(datos.download_url, "_blank");
  //       // (async () => {
  //       //   await descargarVideo(`${datos.download_url}`, `${datos.title}.mp4`);
  //       // })();
  //       // CREAR DESCARGA AUTOMÁTICA EN SEGUNDO PLANO
  //       const enlaceTemporal = document.createElement("a");
  //       enlaceTemporal.href = datos.download_url;
  //       enlaceTemporal.download = `${datos.title || "video"}.mp4`; // Nombre sugerido para la descarga

  //       // Sugiere un nombre de archivo para la descarga
  //       enlaceTemporal.setAttribute(
  //         "download",
  //         `${datos.title || "video"}.mp4`,
  //       );

  //       // Configuración para evitar bloqueos del navegador
  //       enlaceTemporal.target = "_blank";
  //       enlaceTemporal.rel = "noopener noreferrer";

  //       // Simular el clic para iniciar la descarga inmediata
  //       document.body.appendChild(enlaceTemporal);
  //       enlaceTemporal.click();
  //       document.body.removeChild(enlaceTemporal); // Limpiar el documento
  //     } else {
  //       alert("Error: " + datos.error);
  //     }
  //   } catch (error) {
  //     console.error("Error de conexión:", error);
  //     alert("No se pudo conectar con el servidor backend.");
  //   } finally {
  //     // Restaurar el botón al finalizar
  //     boton.innerText = "Descargar";
  //     boton.disabled = false;
  //   }
  // });

  // boton.onclick = () => {
  //   (async () => {
  //     await descargarVideo(url, nombre);
  //   })();
  // };

  // document.getElementById("btnDescargar").addEventListener("click", () => {
  //   try {
  //     (async () => {
  //       await descargarVideo(url, nombre);
  //     })();
  //   } catch (e) {
  //     console.error(e);
  //     alert("Error al descargar el archivo.");
  //   }
  // });
}

function mostrarPreviewPrueba(url, tipo, info = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const video1 = document.getElementById("nuevo");
  const videoInfo = document.getElementById("videoInfo");
  //video.innerHTML = "<source src='" + url + "' type='video/mp4'>";
  video.src = url;
  //video1.querySelector("source").src = url;
  preview.classList.remove("oculto");
  video.load();
}

function mostrarPreviewX(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  video.src = url;
  video.load();

  info.textContent = titulo;

  preview.classList.remove("oculto");
}
function mostrarPreviewtte(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  video.pause();

  video.removeAttribute("src");
  video.load();

  video.src = url;

  info.textContent = titulo;
  preview.classList.remove("oculto");

  video.load();
}
function mostrarPreview(url, tipo, info = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const videoInfo = document.getElementById("videoInfo");

  preview.classList.remove("oculto");

  // Limpiar preview anterior
  if (!sitio === "imagen") {
    video.style.display = "none";
    video.pause();
    video.removeAttribute("src");
  }

  // Eliminar imagen anterior si existe
  const imagenAnterior = document.getElementById("imagenPreview");

  if (imagenAnterior) {
    imagenAnterior.remove();
  }

  // =========================
  // IMAGEN
  // =========================

  if (tipo.startsWith("image/")) {
    const imagen = document.createElement("img");

    imagen.id = "imagenPreview";
    imagen.src = url;
    imagen.alt = "Vista previa";

    imagen.style.cssText = `
      display: block;
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 8px;
    `;

    preview.insertBefore(imagen, video);
  }

  // =========================
  // VIDEO
  // =========================
  else if (tipo.startsWith("video/") || tipo.startsWith("PornHub")) {
    video.style.display = "block";
    video.src = url;
    video.load();
  }

  // =========================
  // INFORMACIÓN
  // =========================

  videoInfo.textContent = info;
}

function mostrarPreview2(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  // Detener cualquier reproducción anterior
  video.pause();

  // Cambiar el video
  video.src = url;
  video.load();

  // Información
  info.textContent = titulo;

  // Mostrar preview
  preview.classList.remove("oculto");

  // Reproducir cuando esté listo
  video.play().catch((error) => {
    console.log("La reproducción automática fue bloqueada:", error);
  });
}

function mostrarPreviewNuevo(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  video.pause();

  video.removeAttribute("src");
  video.load();

  info.textContent = titulo;

  preview.classList.remove("oculto");

  video.src = url;
  video.load();

  video.play().catch((error) => {
    console.log("Reproducción automática bloqueada:", error);
  });

  video.onerror = () => {
    console.error("No se pudo reproducir:", video.error);
  };
}

function mostrarPreviewBackend(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  video.pause();

  const backend = "https://TU-BACKEND.onrender.com";

  const previewUrl = `${API}/previewNuevo?url=${encodeURIComponent(url)}`;

  console.log("Preview:", previewUrl);

  video.removeAttribute("src");
  video.load();

  video.src = previewUrl;

  info.textContent = titulo;

  preview.classList.remove("oculto");

  video.load();

  video.play().catch((error) => {
    console.log("Reproducción automática bloqueada:", error);
  });
}
// function mostrarPreviewRedgifs2(url, titulo = "") {
//   const video = document.getElementById("videoPreview");
//   const info = document.getElementById("videoInfo");
//   const preview = document.getElementById("preview");

//   video.pause();
//   video.removeAttribute("src");

//   video.src = url;
//   info.textContent = titulo;

//   preview.classList.remove("oculto");

//   video.load();

//   video.oncanplay = () => {
//     video.play().catch(() => {});
//   };
// }

function mostrarPreview44(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  video.pause();

  const urlPreview = `${API}/preview?url=${encodeURIComponent(url)}`;

  video.src = urlPreview;

  info.textContent = titulo;

  preview.classList.remove("oculto");

  video.load();

  // video.play().catch((error) => {
  //   console.log("Autoplay bloqueado:", error);
  // });
}

// function mostrarPreviewRedgifs(url, titulo = "") {
//   const preview = document.getElementById("preview");
//   const video = document.getElementById("videoPreview");
//   const info = document.getElementById("videoInfo");

//   video.pause();
//   video.removeAttribute("src");

//   info.textContent = titulo;
//   preview.classList.remove("oculto");

//   video.src = url;
//   video.load();

//   video.onloadedmetadata = () => {
//     console.log("Metadata cargada");
//     console.log("Duración:", video.duration);

//     video
//       .play()
//       .then(() => {
//         console.log("Reproduciendo");
//       })
//       .catch((error) => {
//         console.error("Error al reproducir:", error);
//       });
//   };

//   video.onerror = () => {
//     console.error("Error del video:");
//     console.error(video.error);

//     if (video.error) {
//       console.error("Código:", video.error.code);
//       console.error("Mensaje:", video.error.message);
//     }
//   };
// }

function guardarVideo(nombre, enlace) {
  const videos = JSON.parse(localStorage.getItem("videos")) || {};

  videos[nombre] = enlace;

  localStorage.setItem("videos", JSON.stringify(videos));
}

// function obtenerEnlace(nombre) {
//   const videos = JSON.parse(localStorage.getItem("videos")) || {};

//   return videos[nombre] || null;
// }

function esVideoDirecto(url) {
  return /\.mp4(?:\/)?(?:\?|$)/i.test(url);
}

//let nombreFinal = "";
function procesarBusqueda() {
  let texto = null;
  let nombre = null;
  let url;
  url = document.getElementById("url").value;
  //const nombreFinal = url.split("/").pop().replace(".mp4", "");
  //console.log("Nombre final:", nombreFinal);
  if (url.includes("redgifs.com")) {
    logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
    nombreFinal = url.split("/").pop().replace(".mp4", "");
  } else if (url.includes("porn4fans.com/get_file")) {
    logo = "https://www.porn4fans.com/static/images/logo-hover.svg";
    backgroundColor = `#131313`;
    (async () => {
      texto = await navigator.clipboard.readText();
      //console.log(texto);
      nombre = texto.split(".-.")[1];
      nombreFinal = nombre;
      console.log(nombreFinal);
    })();
  } else if (url.includes("twpornstars") || url.includes("video.twimg.com")) {
    logo = "https://www.twpornstars.com/favicon.ico";
    const nomTemp = url.split("?")[0];
    nombreFinal = nomTemp.split("/").pop().replace(".mp4", "");
    //(async () => {

    //})();
  } else if (
    url.includes("media.fastdl") ||
    url.includes("instagram.com/reel")
  ) {
    logo = "https://static.cdninstagram.com/rsrc.php/yr/r/rzWiSjZRxk5.webp";
  } else if (url.includes("fbcdn.net")) {
    logo =
      "https://static.xx.fbcdn.net/rsrc.php/yk/r/Czs2nwUnhiR.webp?_nc_eui2=AeHfvJCfzxLi0rkFRf86gHXGQI1bdQxlaeJAjVt1DGVp4oI5KGqHA2QvTGC4CB14v7mfuMOK8dufkfhBqYc1dNlL";
  } else if (url.includes("downixcdn") || url.includes("phncdn.com")) {
    //const nomTemp = url.split("?")[0];
    console.log(nombreArchivo.value);
    nombreFinal = nombreArchivo.value; //nomTemp.split("/").pop().replace(".mp4", "");
  } else if (url.includes("ssstwitter")) {
    logo =
      "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
  } else if (url.includes("es.pornhub.com/view_video.php?viewkey")) {
    window.open("https://downix.org", "_blank");
    setTimeout(() => {
      window.close();
    }, 5000); // 5 segundos
    return;
  } else if (url.includes("https://ar.xhamster.com/videos/")) {
    const nomTemp = url.split("/")[4];
    //localStorage.setItem("xhamster_video", nomTemp);
    guardarVideo(`${nomTemp}`, `${url}`);
    const data = `${url}.-.${nomTemp}`;
    navigator.clipboard.writeText(data);
    //window.open("https://www.locoloader.com/xhamster-downloader/", "_blank");
    window.open("https://anyloader.com/xhamster-downloader", "_blank");
    setTimeout(() => {
      window.close();
    }, 5000); // 5 segundos
    return;
  } else if (
    url.includes("xhmediacdn") ||
    url.includes("xhpingcdn") ||
    url.includes("locoloader")
  ) {
    // (async () => {
    //   texto = await navigator.clipboard.readText();
    //   nombre = texto.split(".-.")[1];
    //   console.log("Texto obtenido:", texto.split(".-."));
    // })();
    // const enlace = obtenerEnlace(nombre);
    // console.log("Enlace obtenido:", enlace);
    // nombreFinal = texto.split(".-.")[1];
  } else if (
    url.includes("x.com") ||
    url.includes("/status/") ||
    url.includes("/video/")
  ) {
    window.open("https://ssstwitter.com", "_blank");
    //window.close();
    //setTimeout(() => {
    window.close();
    //}, 3000); // 5 segundos
    return;
  }

  //sitio = detectarSitio(url);

  //if (!sitio) {
  //alerta("Sitio no soportado");

  //return;
  //}
  console.log(esVideoDirecto(url));
  (async () => {
    if (url.includes("twpornstars")) {
      const ennnn = await obtenerMedia(url);
      url = ennnn;
    }
    loading.style.display = "flex";
    // const datos = await fetch("/api/video?url=" + encodeURIComponent(url)).then(
    //   (r) => r.json(),
    // );
    if (!esVideoDirecto(url)) {
      const respuesta2 = await fetch(`${API}/obtener-enlace`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const datos2 = await respuesta2.json();
      console.log(datos2);
      if (url.includes("ssstwitter")) {
        nombreFinal = datos2.title || "video";
      } else if (url.includes("instagram.com/reel")) {
        directUrl = datos2.direct_url;
        nombreFinal = datos2.todo.description || datos2.todo.id;
        //url = directUrl;
      } else if (
        url.includes("xhmediacdn") ||
        url.includes("xhpingcdn") ||
        url.includes("xhcdn")
      ) {
        texto = await navigator.clipboard.readText();
        //console.log(texto);
        nombre = texto.split(".-.")[1];
        nombreFinal = nombre;
      }
      if (sitio === "imagen") {
        if (
          url.includes("fapello.com") ||
          url.includes("pbs.twimg.com") ||
          url.includes("pornpics.com")
        ) {
          nombre = obtenerNombreConExtension(url);
          nombreFinal = nombre;
          cambiarPreview("imagen", url);
        }
      }
    }

    // video.src = datos.formats[0].url;
    // const respuesta = await fetch(`${API}/buscar`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ url }),
    // });

    // const datos = await respuesta.json();
    // console.log(datos);
    console.log("Nombre final:", nombreFinal);
    if (nombreFinal == null) {
      nombreFinal = nombreArchivo.value;
    }

    mostrarDescarga(`${url}`, `${nombreFinal}.mp4`);
  })();

  function cambiarPreview(tipo, url) {
    const video = document.getElementById("videoPreview");

    if (tipo === "imagen") {
      const imagen = document.createElement("img");

      imagen.id = "videoPreview";
      imagen.src = url;
      imagen.alt = "Vista previa";

      imagen.style.cssText = `
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 8px;
    `;

      video.replaceWith(imagen);
    } else {
      const nuevoVideo = document.createElement("video");

      nuevoVideo.id = "videoPreview";
      nuevoVideo.controls = true;
      nuevoVideo.playsInline = true;
      nuevoVideo.preload = "metadata";
      nuevoVideo.src = url;

      nuevoVideo.style.cssText = `
      width: 100%;
      max-height: 500px;
    `;

      video.replaceWith(nuevoVideo);
    }
  }

  //   mostrarResultado(`
  //         <div class="card">
  //             <h2>${sitio}</h2>
  //             <p>${url}</p>
  //             <button onclick="descargarVideo('${url}', '${nombreFinal}.mp4')">
  //                 Descargar
  //             </button>
  //         </div>
  //     `);
}

function iniciarAplicacion() {
  document.getElementById("buscar").addEventListener("click", procesarBusqueda);
  // document.getElementById("buscar").addEventListener("click", async () => {
  //   const url = document.getElementById("url").value;

  //   const respuesta = await fetch("/buscar", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ url }),
  //   });

  //   const datos = await respuesta.json();
  //   console.log(datos);
  // });
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);
