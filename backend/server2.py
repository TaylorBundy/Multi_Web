from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)  # Permite que tu HTML se conecte desde otro origen si es necesario

@app.route('/descargar', methods=['POST'])
def descargar_video():
    data = request.json
    url_video = data.get('url')

    if not url_video:
        return jsonify({'error': 'No se proporcionó una URL'}), 400

    # Configuración de yt-dlp para obtener el enlace directo
    ydl_opts = {
        'format': 'best[ext=mp4]/best',  # Busca la mejor calidad que ya venga en MP4
        'quiet': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url_video, download=False) # download=False no satura tu servidor
            url_descarga = info.get('url')
            titulo = info.get('title')

            return jsonify({
                'success': True,
                'title': titulo,
                'download_url': url_descarga
            })
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
