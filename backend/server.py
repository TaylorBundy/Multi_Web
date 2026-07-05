from flask import Flask, request, jsonify
from yt_dlp import YoutubeDL

app = Flask(__name__)

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