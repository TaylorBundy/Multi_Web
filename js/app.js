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
  mostrarResultado(`
        <div class="card">
            <h2>${nombre}</h2>

            <button id="btnDescargar">
                📥 Descargar
            </button>
        </div>
    `);
  const boton = document.getElementById("btnDescargar");
  boton.title = `Click para descargar: ${url}`;
  mostrarPreview(url, nombre);
  boton.onclick = () => {
    (async () => {
      await descargarVideo(url, nombre);
    })();
  };

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

function procesarBusqueda() {
  const url = document.getElementById("url").value;
  const nombreFinal = url.split("/").pop().replace(".mp4", "");
  console.log("Nombre final:", nombreFinal);
  if (url.includes("redgifs.com")) {
    logo = "https://www.redgifs.com/static/logo-full-red-C9X7m0yF.svg";
  }

  const sitio = detectarSitio(url);

  if (!sitio) {
    alerta("Sitio no soportado");

    return;
  }
  (async () => {
    const datos = await fetch("/api/video?url=" + encodeURIComponent(url)).then(
      (r) => r.json(),
    );

    video.src = datos.formats[0].url;
  })();

  mostrarDescarga(`${url}`, `${nombreFinal}.mp4`);

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
}

document.addEventListener("DOMContentLoaded", iniciarAplicacion);
