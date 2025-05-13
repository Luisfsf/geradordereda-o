from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("GENAI_APIKEY")
client = genai.Client(api_key=API_KEY)

def gerar_redacao(temas):
    prompt = f"""
        Crie uma redação com base nos seguintes temas: {temas}.
        Se os temas forem ofensivos (como racismo ou machismo), não gere a redação. Em vez disso, alerte o usuário sobre o uso responsável da ferramenta.

        A redação pode ser sobre temas variados como política, guerras, meio ambiente, sociedade, etc.
        A estrutura deve seguir os padrões de uma redação dissertativa: introdução, desenvolvimento e conclusão.

        Retorne no seguinte formato JSON:
        redacao = {{
  "titulo": "Exemplo de título",
  "estrutura": "Dissertativo-argumentativo",
  "linhas": [
    "Parágrafo 1",
    "Parágrafo 2",
    "Conclusão"
  ]
}}
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
        }
    )

    response = json.loads(response.text)
    return response

@app.route('/redacao', methods=['POST'])
def make_redacao():
    try:
        dados = request.get_json()

        if not dados or not isinstance(dados, dict):
            return jsonify({'error': 'Requisição JSON inválida. Esperava um dicionário.'}), 400

        temas = dados.get('temas', [])  # Mantido "ingredientes" para compatibilidade com o front

        if not isinstance(temas, list):
            return jsonify({'error': 'O campo "ingredientes" deve ser uma lista.'}), 400

        if len(temas) < 0:
            return jsonify({'error': 'São necessários pelo menos 3 elementos para gerar uma redação.'}), 400

        response = gerar_redacao(temas)

        return jsonify(response), 200

    except Exception as e:
        print(f"Um erro interno ocorreu na API: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
