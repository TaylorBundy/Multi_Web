import os, requests
import glob
from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
from yt_dlp import YoutubeDL
import yt_dlp
from curl_cffi import requests
import json

app = Flask(__name__)
CORS(app)  # Permite que tu HTML se conecte desde otro origen si es necesario

# Crear directorio temporal si no existe
TEMP_DIR = os.path.join(os.getcwd(), "descargas_temp")
os.makedirs(TEMP_DIR, exist_ok=True)


def obtener_metadata(url: str):
    # Aquí iría la lógica para obtener metadatos
    return {"url": url, "titulo": "Ejemplo", "descripcion": "Descripción de ejemplo"}


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


# @app.route('/descargar', methods=['POST'])
# def descargar_video():
#     data = request.json
#     url_video = data.get('url')

#     if not url_video:
#         return jsonify({'error': 'No se proporcionó una URL'}), 400

#     # Configuración para descargar físicamente el video en el servidor
#     # % (id)s previene problemas con caracteres raros en el nombre del archivo
#     outtmpl_path = os.path.join(TEMP_DIR, '%(title)s_%(id)s.%(ext)s')

#     ydl_opts = {
#         'format': 'best[ext=mp4]/best',  # Busca el mejor MP4 listo
#         'outtmpl': outtmpl_path,
#         'quiet': True
#     }

#     try:
#         with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#             # 1. Extraer metadata primero para obtener el título limpio
#             info = ydl.extract_info(url_video, download=True)
#             filename_actual = ydl.prepare_filename(info)
#             titulo_limpio = info.get('title', 'video')

#         # 2. Verificar que el archivo realmente exista en el servidor
#         if os.path.exists(filename_actual):

#             # Función generadora para borrar el archivo DESPUÉS de que termine de enviarse
#             def cargar_y_eliminar():
#                 with open(filename_actual, 'rb') as f:
#                     yield from f
#                 try:
#                     os.remove(filename_actual) # Borra el archivo temporal del servidor
#                 except Exception as e:
#                     print(f"Error al borrar archivo temporal: {e}")

#             # 3. Responder enviando el archivo binario real directamente
#             response = app.response_class(cargar_y_eliminar(), mimetype='video/mp4')
#             response.headers["Content-Disposition"] = f"attachment; filename={titulo_limpio}.mp4"
#             return response
#         else:
#             return jsonify({'error': 'El archivo no pudo ser creado en el servidor'}), 500

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

import re
import json
import requests


@app.route("/tweet-detail", methods=["POST"])
def tweet_detail():

    data = request.get_json(silent=True) or {}

    url = data.get("url")

    if not url:
        return jsonify({"success": False, "error": "Falta la URL del tweet"}), 400

    # ==========================
    # OBTENER ID DEL TWEET
    # ==========================

    match = re.search(r"(?:status|statuses)/(\d+)", url)

    if not match:
        return (
            jsonify({"success": False, "error": "No se pudo obtener el ID del tweet"}),
            400,
        )

    tweet_id = match.group(1)

    print("Tweet ID:", tweet_id)

    # ==========================
    # URL TWEET DETAIL
    # ==========================

    # endpoint = "https://x.com/i/api/graphql/" "z-3ZLa-NQ8Sp09diHkJNBg/" "TweetDetail"
    endpoint = (
        f"https://x.com/i/api/graphql/iFEr5AcP121Og4wx9Yqo3w/TweetDetail?variables=%7B%22focalTweetId%22%3A%22"
        + tweet_id
        + f"%22%2C%22with_rux_injections%22%3Afalse%2C%22rankingMode%22%3A%22Relevance%22%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withBirdwatchNotes%22%3Atrue%2C%22withVoice%22%3Atrue%7D&features=%7B%22rweb_video_screen_enabled%22%3Afalse%2C%22payments_enabled%22%3Afalse%2C%22rweb_xchat_enabled%22%3Afalse%2C%22profile_label_improvements_pcf_label_in_post_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22premium_content_api_read_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22responsive_web_grok_analyze_button_fetch_trends_enabled%22%3Afalse%2C%22responsive_web_grok_analyze_post_followups_enabled%22%3Atrue%2C%22responsive_web_jetfuel_frame%22%3Atrue%2C%22responsive_web_grok_share_attachment_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22responsive_web_grok_show_grok_translated_post%22%3Afalse%2C%22responsive_web_grok_analysis_button_from_backend%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_grok_image_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_imagine_annotation_enabled%22%3Atrue%2C%22responsive_web_grok_community_note_auto_translation_is_enabled%22%3Afalse%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticleRichContentState%22%3Atrue%2C%22withArticlePlainText%22%3Afalse%2C%22withGrokAnalyze%22%3Afalse%2C%22withDisallowedReplyControls%22%3Afalse%7D"
    )

    variables = {
        "focalTweetId": tweet_id,
        "rankingMode": "Relevance",
        "includePromotedContent": True,
        "withCommunity": True,
        "withQuickPromoteEligibilityTweetFields": True,
        "withBirdwatchNotes": True,
        "withVoice": True,
    }

    features = {
        "rweb_video_screen_enabled": False,
        "rweb_cashtags_enabled": True,
        "responsive_web_profile_redirect_enabled": True,
        "responsive_web_graphql_timeline_navigation_enabled": True,
        "responsive_web_grok_share_attachment_enabled": True,
        "responsive_web_grok_annotations_enabled": True,
        "articles_preview_enabled": True,
        "responsive_web_edit_tweet_api_enabled": True,
        "graphql_is_translatable_rweb_tweet_is_translatable_enabled": True,
        "view_counts_everywhere_api_enabled": True,
        "longform_notetweets_consumption_enabled": True,
        "responsive_web_twitter_article_tweet_consumption_enabled": True,
        "content_disclosure_indicator_enabled": True,
        "content_disclosure_ai_generated_indicator_enabled": True,
        "responsive_web_nested_quote_preview_enabled": True,
    }

    field_toggles = {
        "withPayments": False,
        "withDmBlocks": False,
        "withArticleRichContentState": True,
        "withArticlePlainText": False,
        "withArticleSummaryText": True,
        "withArticleVoiceOver": True,
        "withGrokAnalyze": False,
        "withDisallowedReplyControls": False,
    }

    params = {
        "variables": json.dumps(variables, separators=(",", ":")),
        "features": json.dumps(features, separators=(",", ":")),
        "fieldToggles": json.dumps(field_toggles, separators=(",", ":")),
    }

    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Authorization": (
            "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        ),
    }

    try:

        response = requests.get(endpoint, params=params, headers=headers, timeout=30)

        print("TweetDetail status:", response.status_code)

        if not response.ok:

            return (
                jsonify(
                    {
                        "success": False,
                        "status": response.status_code,
                        "error": response.text,
                    }
                ),
                response.status_code,
            )

        datos = response.json()

        return jsonify({"success": True, "tweet_id": tweet_id, "data": datos})

    except Exception as e:

        print("ERROR TweetDetail:", repr(e))

        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/tweet-detail--", methods=["GET"])
def tweet_detail_1():

    tweet_id = request.args.get("id")

    if not tweet_id:
        return jsonify({"success": False, "error": "Falta el ID del tweet"}), 400

    url = "https://x.com/i/api/graphql/" "z-3ZLa-NQ8Sp09diHkJNBg/" "TweetDetail"

    variables = {
        "focalTweetId": tweet_id,
        "rankingMode": "Relevance",
        "includePromotedContent": True,
        "withCommunity": True,
        "withQuickPromoteEligibilityTweetFields": True,
        "withBirdwatchNotes": True,
        "withVoice": True,
    }

    features = {
        "rweb_video_screen_enabled": False,
        "rweb_cashtags_enabled": True,
        "responsive_web_profile_redirect_enabled": True,
        "responsive_web_graphql_timeline_navigation_enabled": True,
        "responsive_web_grok_share_attachment_enabled": True,
        "responsive_web_grok_annotations_enabled": True,
        "articles_preview_enabled": True,
        "responsive_web_edit_tweet_api_enabled": True,
        "graphql_is_translatable_rweb_tweet_is_translatable_enabled": True,
        "view_counts_everywhere_api_enabled": True,
        "longform_notetweets_consumption_enabled": True,
        "responsive_web_twitter_article_tweet_consumption_enabled": True,
        "content_disclosure_indicator_enabled": True,
        "content_disclosure_ai_generated_indicator_enabled": True,
        "responsive_web_nested_quote_preview_enabled": True,
    }

    field_toggles = {
        "withPayments": False,
        "withDmBlocks": False,
        "withArticleRichContentState": True,
        "withArticlePlainText": False,
        "withArticleSummaryText": True,
        "withArticleVoiceOver": True,
        "withGrokAnalyze": False,
        "withDisallowedReplyControls": False,
    }

    params = {
        "variables": json.dumps(variables, separators=(",", ":")),
        "features": json.dumps(features, separators=(",", ":")),
        "fieldToggles": json.dumps(field_toggles, separators=(",", ":")),
    }

    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
        "Authorization": "Bearer TU_BEARER_TOKEN",
    }

    try:

        response = requests.get(url, params=params, headers=headers, timeout=30)

        print("TweetDetail:", response.status_code)

        if not response.ok:
            return (
                jsonify(
                    {
                        "success": False,
                        "status": response.status_code,
                        "error": response.text,
                    }
                ),
                response.status_code,
            )

        data = response.json()

        return jsonify({"success": True, "data": data})

    except Exception as e:

        print("ERROR TweetDetail:", repr(e))

        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/descargar", methods=["POST"])
def descargar_video():
    data = request.get_json(silent=True) or {}
    url_video = data.get("url")

    if not url_video:
        return jsonify({"error": "No se proporcionó una URL"}), 400

    outtmpl_path = os.path.join(TEMP_DIR, "%(title)s_%(id)s.%(ext)s")

    ydl_opts = {
        "format": "best[ext=mp4]/best",
        "outtmpl": outtmpl_path,
        "quiet": True,
        "no_warnings": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:

            info = ydl.extract_info(url_video, download=True)

            filename_actual = ydl.prepare_filename(info)

            titulo_limpio = info.get("title", "video")

        if not os.path.exists(filename_actual):
            return (
                jsonify({"error": "El archivo no pudo ser creado en el servidor"}),
                500,
            )

        print("Archivo generado:", filename_actual)
        print("Tamaño:", os.path.getsize(filename_actual))

        response = send_file(
            filename_actual,
            mimetype="video/mp4",
            as_attachment=True,
            download_name=f"{titulo_limpio}.mp4",
        )

        @response.call_on_close
        def eliminar_temporal():
            try:
                if os.path.exists(filename_actual):
                    os.remove(filename_actual)
                    print("Archivo temporal eliminado:", filename_actual)
            except Exception as e:
                print("Error al eliminar archivo:", e)

        return response

    except Exception as e:
        print("ERROR /descargar:", e)

        return jsonify({"error": str(e)}), 500


@app.route("/descargarApp", methods=["POST", "GET"])
def descargar_video_App():
    if request.method == "GET":
        url_video = request.args.get("url")
    else:
        data = request.get_json(silent=True) or {}
        url_video = data.get("url")

    if not url_video:
        return jsonify({"error": "No se proporcionó una URL"}), 400

    outtmpl_path = os.path.join(TEMP_DIR, "%(title)s_%(id)s.%(ext)s")

    ydl_opts = {
        "format": "best[ext=mp4]/best",
        "outtmpl": outtmpl_path,
        "quiet": True,
        "no_warnings": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:

            info = ydl.extract_info(url_video, download=True)

            filename_actual = ydl.prepare_filename(info)

            titulo_limpio = info.get("title", "video")

        if not os.path.exists(filename_actual):
            return (
                jsonify({"error": "El archivo no pudo ser creado en el servidor"}),
                500,
            )

        print("Archivo generado:", filename_actual)
        print("Tamaño:", os.path.getsize(filename_actual))

        response = send_file(
            filename_actual,
            mimetype="video/mp4",
            as_attachment=True,
            download_name=f"{titulo_limpio}.mp4",
        )

        # Asegurar que el cliente pueda conocer el tamaño total.
        response.headers["Content-Length"] = str(os.path.getsize(filename_actual))

        @response.call_on_close
        def eliminar_temporal():
            try:
                if os.path.exists(filename_actual):
                    os.remove(filename_actual)
                    print("Archivo temporal eliminado:", filename_actual)
            except Exception as e:
                print("Error al eliminar archivo:", e)

        return response

    except Exception as e:
        print("ERROR /descargar:", e)

        return jsonify({"error": str(e)}), 500


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


@app.route("/obtener-enlace", methods=["POST"])
def obtener_enlace():

    data = request.get_json(silent=True) or {}

    url = data.get("url")

    if not url:
        return jsonify({"success": False, "error": "No se proporcionó una URL"}), 400

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        # No descargar nada
        "skip_download": True,
        # Evitar playlists completas
        "noplaylist": True,
        # Obtener todos los formatos disponibles
        "format": "best",
    }

    try:

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:

            info = ydl.extract_info(url, download=False)

        # ==================================
        # INFORMACIÓN GENERAL
        # ==================================

        resultado = {
            "success": True,
            "title": info.get("title"),
            "id": info.get("id"),
            "extractor": info.get("extractor"),
            "webpage_url": info.get("webpage_url"),
            "duration": info.get("duration"),
            "thumbnail": info.get("thumbnail"),
            "tipo": None,
            "direct_url": None,
            "formats": [],
        }

        # ==================================
        # DETERMINAR TIPO
        # ==================================

        formats = info.get("formats") or []

        formatos_validos = []

        for f in formats:

            direct_url = f.get("url")

            if not direct_url:
                continue

            formatos_validos.append(f)

        # ==================================
        # INFORMACIÓN DE FORMATOS
        # ==================================

        for f in formatos_validos:

            resultado["formats"].append(
                {
                    "format_id": f.get("format_id"),
                    "url": f.get("url"),
                    "ext": f.get("ext"),
                    "protocol": f.get("protocol"),
                    "mime": f.get("mime"),
                    "width": f.get("width"),
                    "height": f.get("height"),
                    "fps": f.get("fps"),
                    "filesize": f.get("filesize"),
                    "filesize_approx": f.get("filesize_approx"),
                    "vcodec": f.get("vcodec"),
                    "acodec": f.get("acodec"),
                    "tbr": f.get("tbr"),
                }
            )

        # ==================================
        # DETERMINAR TIPO
        # ==================================

        tiene_video = any(
            f.get("vcodec") and f.get("vcodec") != "none" for f in formatos_validos
        )

        tiene_audio = any(
            f.get("acodec") and f.get("acodec") != "none" for f in formatos_validos
        )

        if tiene_video:
            resultado["tipo"] = "video"

        elif tiene_audio:
            resultado["tipo"] = "audio"

        else:
            resultado["tipo"] = "otro"

        # ==================================
        # ELEGIR MEJOR FORMATO DIRECTO
        # ==================================

        if formatos_validos:

            def calidad(f):

                width = f.get("width") or 0
                height = f.get("height") or 0
                tbr = f.get("tbr") or 0

                return (height, width, tbr)

            mejor = max(formatos_validos, key=calidad)

            resultado["direct_url"] = mejor.get("url")

            resultado["selected_format"] = {
                "format_id": mejor.get("format_id"),
                "ext": mejor.get("ext"),
                "width": mejor.get("width"),
                "height": mejor.get("height"),
                "vcodec": mejor.get("vcodec"),
                "acodec": mejor.get("acodec"),
                "filesize": mejor.get("filesize"),
                "filesize_approx": mejor.get("filesize_approx"),
            }

        # ==================================
        # ERROR SIN FORMATOS
        # ==================================

        if not resultado["direct_url"]:

            return (
                jsonify(
                    {
                        "success": False,
                        "error": ("yt-dlp no encontró ningún " "enlace directo"),
                        "title": resultado["title"],
                        "extractor": resultado["extractor"],
                    }
                ),
                404,
            )

        return jsonify(resultado)

    except Exception as e:

        print("ERROR yt-dlp:", repr(e))

        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/obtener-enlace_2", methods=["POST"])
def obtener_enlace_x():
    data = request.json
    url_video = data.get("url")  # Aquí irá tu URL de X

    if not url_video:
        return jsonify({"error": "No se proporcionó una URL"}), 400

    # Configuración óptima para extraer enlaces de X (Twitter)
    ydl_opts = {
        "format": "bestvideo+bestaudio/best",  # Fuerza la mejor combinación
        "quiet": True,
        "no_warnings": True,
        "extractor_args": {"twitter": {"api": ["syndication"]}},
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Extrae la metadata sin descargar el archivo físico en el servidor
            info = ydl.extract_info(url_video, download=False)
            print(f"Información extraída: {info}")  # Para depuración

            # En plataformas como X, el enlace directo puede venir dentro de 'url'
            # o en el primer elemento de la lista de formatos disponibles
            url_directa = info.get("url")
            if not url_directa and "formats" in info:
                # Filtrar el formato con mejor resolución que tenga URL directa
                formatos_validos = [f for f in info["formats"] if f.get("url")]
                if formatos_validos:
                    url_directa = formatos_validos[-1][
                        "url"
                    ]  # El último suele ser el de mejor calidad

            if url_directa:
                return jsonify(
                    {
                        "success": True,
                        "todo": info,  # Devuelve toda la información extraída para depuración
                        "title": info.get("title", "video_x"),
                        "direct_url": url_directa,
                    }
                )
            else:
                return (
                    jsonify(
                        {
                            "error": "No se pudo encontrar un enlace directo para este video"
                        }
                    ),
                    404,
                )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/preview")
def preview_video():
    url = request.args.get("url")

    if not url:
        return "Falta la URL del video", 400

    try:
        # Headers enviados a Redgifs
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/149.0.0.0 Safari/537.36"
            ),
            "Accept": "*/*",
            "Referer": "https://www.redgifs.com/",
        }

        # El navegador puede pedir solamente una parte del video
        range_header = request.headers.get("Range")

        if range_header:
            headers["Range"] = range_header

        # Pedimos el video a Redgifs
        respuesta = requests.get(url, headers=headers, stream=True, timeout=30)

        # Si Redgifs devuelve error
        if respuesta.status_code not in (200, 206):
            return (
                f"Redgifs respondió con HTTP {respuesta.status_code}",
                respuesta.status_code,
            )

        # Headers que vamos a devolver al navegador
        response_headers = {
            "Content-Type": respuesta.headers.get("Content-Type", "video/mp4"),
            "Accept-Ranges": "bytes",
        }

        # Estos son importantes para el reproductor
        for header in ["Content-Length", "Content-Range", "ETag", "Last-Modified"]:
            if header in respuesta.headers:
                response_headers[header] = respuesta.headers[header]

        def generar():
            try:
                for chunk in respuesta.iter_content(chunk_size=1024 * 64):
                    if chunk:
                        yield chunk
            finally:
                respuesta.close()

        return Response(
            generar(),
            status=respuesta.status_code,
            headers=response_headers,
            direct_passthrough=True,
        )

    except requests.exceptions.Timeout:
        return "Tiempo de espera agotado al obtener el video", 504

    except requests.exceptions.RequestException as e:
        print("Error obteniendo video:", e)
        return "Error obteniendo el video", 502

    except Exception as e:
        print("Error en /preview:", e)
        return "Error interno del servidor", 500


@app.route("/previewNuevoo")
def preview_nuevo_o():

    url = request.args.get("url")

    if not url:
        return "Falta URL", 400

    try:

        headers = {
            "User-Agent": "Mozilla/5.0",
            "Accept": "*/*",
            "Accept-Encoding": "identity",
        }

        # Mantener Range enviado por <video>
        range_header = request.headers.get("Range")

        if range_header:
            headers["Range"] = range_header

        print("\n==============================")
        print("PREVIEW")
        print("URL:", url)
        print("RANGE:", range_header)
        print("==============================")

        r = requests.get(url, headers=headers, stream=True, timeout=30)

        print("STATUS:", r.status_code)
        print("CONTENT TYPE:", r.headers.get("Content-Type"))
        print("CONTENT LENGTH:", r.headers.get("Content-Length"))
        print("CONTENT RANGE:", r.headers.get("Content-Range"))

        if r.status_code not in (200, 206):

            r.close()

            return (f"Error remoto: HTTP {r.status_code}", r.status_code)

        # ==========================
        # HEADERS
        # ==========================

        response_headers = {}

        for header in [
            "Content-Type",
            "Content-Length",
            "Content-Range",
            "ETag",
            "Last-Modified",
            "Cache-Control",
            "Expires",
        ]:

            value = r.headers.get(header)

            if value:
                response_headers[header] = value

        response_headers["Accept-Ranges"] = "bytes"

        # ==========================
        # STREAM
        # ==========================

        def generate():

            try:

                for chunk in r.iter_content(chunk_size=64 * 1024):

                    if chunk:
                        yield chunk

            finally:
                r.close()

        return Response(
            generate(),
            status=r.status_code,
            headers=response_headers,
            direct_passthrough=True,
        )

    except Exception as e:

        print("ERROR PREVIEW:", repr(e))

        return (f"Error obteniendo preview: {e}", 500)


@app.route("/previewNuevo")
def preview_nuevo():

    url = request.args.get("url")

    if not url:
        return "Falta URL", 400

    try:

        # ==========================
        # HEADERS DEL CLIENTE
        # ==========================

        headers = {
            "User-Agent": request.headers.get(
                "User-Agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/149.0.0.0 Safari/537.36",
            ),
            "Accept": request.headers.get("Accept", "*/*"),
        }

        # Mantener Range para videos
        range_header = request.headers.get("Range")

        if range_header:
            headers["Range"] = range_header

        # ==========================
        # REFERER
        # ==========================

        # Si el navegador manda Referer lo usamos.
        # Si no, no agregamos uno artificial.
        referer = request.headers.get("Referer")

        if referer:
            headers["Referer"] = referer

        # ==========================
        # REQUEST REMOTO
        # ==========================

        # r = requests.get(
        #     url,
        #     headers=headers,
        #     impersonate="chrome",
        #     stream=True,
        #     timeout=30
        # )
        r = requests.get(
            url,
            headers={
                "User-Agent": "Mozilla/5.0",
                "Accept": "*/*",
                "Accept-Encoding": "identity",
            },
            stream=True,
        )

        print(r.status_code)
        print(r.headers)

        print("================================")
        print("PREVIEW")
        print("URL:", url)
        print("STATUS:", r.status_code)
        print("CONTENT TYPE:", r.headers.get("Content-Type"))
        print("CONTENT LENGTH:", r.headers.get("Content-Length"))
        print("CONTENT RANGE:", r.headers.get("Content-Range"))
        print("================================")

        if r.status_code not in (200, 206):
            r.close()

            return (f"Error remoto: HTTP {r.status_code}", r.status_code)

        # ==========================
        # HEADERS DE RESPUESTA
        # ==========================

        response_headers = {}

        headers_a_conservar = [
            "Content-Type",
            "Content-Length",
            "Content-Range",
            "Accept-Ranges",
            "ETag",
            "Last-Modified",
            "Cache-Control",
            "Expires",
        ]

        for header in headers_a_conservar:

            value = r.headers.get(header)

            if value:
                response_headers[header] = value

        # Si el servidor remoto no devuelve Content-Type
        if "Content-Type" not in response_headers:

            response_headers["Content-Type"] = "application/octet-stream"

        # El navegador necesita esto para poder hacer seeking
        response_headers["Accept-Ranges"] = "bytes"

        # ==========================
        # STREAM
        # ==========================

        def generate():

            try:

                for chunk in r.iter_content(chunk_size=64 * 1024):

                    if chunk:
                        yield chunk

            finally:
                r.close()

        return Response(
            generate(),
            status=r.status_code,
            headers=response_headers,
            direct_passthrough=True,
        )

    except Exception as e:

        print("ERROR PREVIEW:", e)

        return (f"Error obteniendo preview: {str(e)}", 500)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
