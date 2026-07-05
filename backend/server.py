import os
import glob
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from yt_dlp import YoutubeDL
import yt_dlp

app = Flask(__name__)
CORS(app)  # Permite que tu HTML se conecte desde otro origen si es necesario

# Crear directorio temporal si no existe
TEMP_DIR = os.path.join(os.getcwd(), 'descargas_temp')
os.makedirs(TEMP_DIR, exist_ok=True)

def obtener_metadata(url: str):
    # Aquí iría la lógica para obtener metadatos
    return {
        "url": url,
        "titulo": "Ejemplo",
        "descripcion": "Descripción de ejemplo"
    }

def obtener_metadatos(url: str) -> dict:
    """
    Obtiene los metadatos de un recurso y devuelve el diccionario
    generado por YoutubeDL.
    """

    ydl_opts = {
        "quiet": True,
        "skip_download": True,
    }

    with YoutubeDL(ydl_opts) as ydl:
        return ydl.extract_info(url, download=False)
    
@app.route('/descargar', methods=['POST'])
def descargar_video():
    data = request.json
    url_video = data.get('url')

    if not url_video:
        return jsonify({'error': 'No se proporcionó una URL'}), 400

    # Configuración para descargar físicamente el video en el servidor
    # % (id)s previene problemas con caracteres raros en el nombre del archivo
    outtmpl_path = os.path.join(TEMP_DIR, '%(title)s_%(id)s.%(ext)s')
    
    ydl_opts = {
        'format': 'best[ext=mp4]/best',  # Busca el mejor MP4 listo
        'outtmpl': outtmpl_path,
        'quiet': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # 1. Extraer metadata primero para obtener el título limpio
            info = ydl.extract_info(url_video, download=True) 
            filename_actual = ydl.prepare_filename(info)
            titulo_limpio = info.get('title', 'video')

        # 2. Verificar que el archivo realmente exista en el servidor
        if os.path.exists(filename_actual):
            
            # Función generadora para borrar el archivo DESPUÉS de que termine de enviarse
            def cargar_y_eliminar():
                with open(filename_actual, 'rb') as f:
                    yield from f
                try:
                    os.remove(filename_actual) # Borra el archivo temporal del servidor
                except Exception as e:
                    print(f"Error al borrar archivo temporal: {e}")

            # 3. Responder enviando el archivo binario real directamente
            response = app.response_class(cargar_y_eliminar(), mimetype='video/mp4')
            response.headers["Content-Disposition"] = f"attachment; filename={titulo_limpio}.mp4"
            return response
        else:
            return jsonify({'error': 'El archivo no pudo ser creado en el servidor'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/descargar', methods=['POST'])
# def descargar_video():
#     data = request.json
#     url_video = data.get('url')

#     if not url_video:
#         return jsonify({'error': 'No se proporcionó una URL'}), 400

#     # Configuración de yt-dlp para obtener el enlace directo
#     ydl_opts = {
#         'format': 'best[ext=mp4]/best',  # Busca la mejor calidad que ya venga en MP4
#         'quiet': True
#     }

#     try:
#         with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#             info = ydl.extract_info(url_video, download=False) # download=False no satura tu servidor
#             url_descarga = info.get('url')
#             titulo = info.get('title')

#             return jsonify({
#                 'success': True,
#                 'title': titulo,
#                 'download_url': url_descarga
#             })
            
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.post("/buscar")
def buscar():
    data = request.get_json(silent=True) or {}
    url = data.get("url")

    if not url:
        return jsonify({"error": "Debe enviar una URL"}), 400

    try:
        resultado = obtener_metadatos(url)
        return jsonify(resultado)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)