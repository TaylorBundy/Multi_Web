from flask import Flask, request, jsonify

app = Flask(__name__)

def obtener_metadata(url: str):
    # Aquí iría la lógica para obtener metadatos
    return {
        "url": url,
        "titulo": "Ejemplo",
        "descripcion": "Descripción de ejemplo"
    }

@app.post("/buscar")
def buscar():
    data = request.get_json(silent=True) or {}
    url = data.get("url")

    if not url:
        return jsonify({"error": "Debe enviar una URL"}), 400

    try:
        resultado = obtener_metadata(url)
        return jsonify(resultado)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)