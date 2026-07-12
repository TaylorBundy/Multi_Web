const loading = document.querySelector(".tenor-gif-embed");
const API = "https://multi-web-uf1z.onrender.com";
async function descargarVideo(url, nombre = "video.mp4") {
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
  titulo.textContent = `📥 Descargando: ${nombre}`; //`⬇ Descargando: ${nombre}`;

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

function mostrarDescarga(url, nombre) {
  let tamano = null;
  if (url.includes("redgifs.com")) {
    logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
    //nombreFinal = url.split("/").pop().replace(".mp4", "");
  } else if (url.includes("pornhub")) {
    logo = "https://ei.phncdn.com/pics/logos/10211.png?cache=2025091603";
  } else if (url.includes("twpornstars") || url.includes("video.twimg.com")) {
    logo = "https://www.twpornstars.com/favicon.ico";
    tamano = "30px";
    //const nomTemp = url.split("?")[0];
    //nombreFinal = nomTemp.split("/").pop().replace(".mp4", "");
  } else if (url.includes("ssstwitter")) {
    logo =
      "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
    tamano = "30px";
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
  mostrarPreview(url, nombre);
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

    // ==========================================
    // 1. CREACIÓN DEL MODAL (Tu diseño original)
    // ==========================================
    const modal = document.createElement("div");
    modal.style.cssText = `position: fixed; inset: 0; background: rgba(0,0,0,.6); display: flex; align-items: center; justify-content: center; z-index: 999999; font-family: Arial, sans-serif;`;

    const contenido = document.createElement("div");
    contenido.style.cssText = `background: white; padding: 20px; border-radius: 12px; width: 370px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,.3); color: black;`;

    const imagenContainer = document.createElement("div");
    imagenContainer.style.cssText = `position: relative; display: flex; justify-content: center; background-color: ${backgroundColor}; border-radius: 12px; padding: 5px;`;

    const imagen = document.createElement("img");
    if (url.includes("ssstwitter")) {
      imagen.style.width = tamano;
    }
    imagen.src = logo;
    imagenContainer.appendChild(imagen);

    const titulo = document.createElement("div");
    titulo.style.cssText = `font-size: 16px; font-weight: bold; margin-bottom: 15px; word-break: break-word;`;
    titulo.textContent = `📥 Procesando video...`;

    const porcentajeTexto = document.createElement("div");
    porcentajeTexto.style.cssText = `font-size: 20px; margin-bottom: 10px;`;
    porcentajeTexto.textContent = "Conectando...";

    const barra = document.createElement("div");
    barra.style.cssText = `width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; overflow: hidden; margin-bottom: 10px;`;

    const progreso = document.createElement("div");
    progreso.style.cssText = `width: 0%; height: 100%; background: #4caf50; transition: width .2s;`;
    barra.appendChild(progreso);

    const detalle = document.createElement("div");
    detalle.style.cssText = `font-size: 12px; color: #666; margin-top: 8px;`;

    const velocidadTexto = document.createElement("div");
    velocidadTexto.style.cssText = `font-size: 12px; color: #666; margin-top: 4px;`;
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
      // ==========================================
      // 2. PETICIÓN POST AL SERVIDOR PYTHON
      // ==========================================
      const respuesta = await fetch(`${API}/descargar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }),
      });

      if (!respuesta.ok) {
        const errorDatos = await respuesta.json();
        throw new Error(
          errorDatos.error || "Error desconocido en el servidor.",
        );
      }

      // Obtener nombre del archivo desde las cabeceras
      const contentDisposition = respuesta.headers.get("Content-Disposition");
      let nombreArchivo = `${nombre}`; // Valor por defecto
      if (contentDisposition && contentDisposition.includes("filename=")) {
        nombreArchivo = contentDisposition
          .split("filename=")[1]
          .replace(/['"]/g, "");
      }

      // Actualizar título del modal con el nombre real obtenido
      titulo.textContent = `📥 Descargando: ${nombreArchivo}`;

      // ==========================================
      // 3. PROCESAMIENTO DEL FLUJO BINARIO (STREAM)
      // ==========================================
      const total = Number(respuesta.headers.get("content-length"));
      console.log("Tamaño total:", total);
      if (!total) {
        porcentajeTexto.textContent = "Descargando...";
        detalle.textContent = "No se puede calcular el progreso total.";
      }

      const reader = respuesta.body.getReader();
      const chunks = [];
      let descargado = 0;

      let ultimoTiempo = performance.now();
      let ultimoDescargado = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        descargado += value.length;

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

        if (total) {
          const porcentaje = ((descargado / total) * 100).toFixed(1);
          porcentajeTexto.textContent = `${porcentaje}%`;
          progreso.style.width = `${porcentaje}%`;
        }
      }

      // ==========================================
      // 4. DESCARGA FINAL AUTOMÁTICA EN CLIENTE
      // ==========================================
      const blob = new Blob(chunks);
      const urlBlobLocal = window.URL.createObjectURL(blob);

      const enlaceTemporal = document.createElement("a");
      enlaceTemporal.href = urlBlobLocal;
      enlaceTemporal.setAttribute("download", nombreArchivo);

      document.body.appendChild(enlaceTemporal);
      enlaceTemporal.click();

      // Limpieza
      document.body.removeChild(enlaceTemporal);
      window.URL.revokeObjectURL(urlBlobLocal);

      // Feedback de éxito
      porcentajeTexto.textContent = "100%";
      progreso.style.width = "100%";
      detalle.textContent = "Descarga completada";
      velocidadTexto.textContent = "Velocidad: 0 KB/s";

      setTimeout(() => modal.remove(), 1200);
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
      modal.remove(); // Remueve el modal si falla el proceso
    } finally {
      //boton.innerText = "Descargar";
      boton.innerHTML = `<img id="btnImage" src="imagenes/descargar.avif" />Descargar`;
      boton.disabled = false;
    }
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

function mostrarPreview(url, titulo = "") {
  const preview = document.getElementById("preview");
  const video = document.getElementById("videoPreview");
  const info = document.getElementById("videoInfo");

  video.src = url;
  video.load();

  info.textContent = titulo;

  preview.classList.remove("oculto");
}

//let nombreFinal = "";
function procesarBusqueda() {
  const url = document.getElementById("url").value;
  //const nombreFinal = url.split("/").pop().replace(".mp4", "");
  //console.log("Nombre final:", nombreFinal);
  if (url.includes("redgifs.com")) {
    logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
    nombreFinal = url.split("/").pop().replace(".mp4", "");
  } else if (url.includes("twpornstars") || url.includes("video.twimg.com")) {
    logo = "https://www.twpornstars.com/favicon.ico";
    const nomTemp = url.split("?")[0];
    nombreFinal = nomTemp.split("/").pop().replace(".mp4", "");
  } else if (url.includes("ssstwitter")) {
    logo =
      "https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png";
  } else if (url.includes("es.pornhub.com/view_video.php?viewkey")) {
    window.open("https://downix.org", "_blank");
    setTimeout(() => {
      window.close();
    }, 5000); // 5 segundos
    return;
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

  const sitio = detectarSitio(url);

  if (!sitio) {
    alerta("Sitio no soportado");

    return;
  }
  (async () => {
    loading.style.display = "flex";
    // const datos = await fetch("/api/video?url=" + encodeURIComponent(url)).then(
    //   (r) => r.json(),
    // );

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
    mostrarDescarga(`${url}`, `${nombreFinal}.mp4`);
  })();

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
