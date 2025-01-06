from flask import Blueprint, request, jsonify
from app.database import collection

routes = Blueprint("routes", __name__)

@routes.route("/save-user", methods=["POST"])
def save_user():
    data = request.json

    # Validar os dados recebidos
    if not all(key in data for key in ("nome", "email", "dataNascimento")):
        return jsonify({"error": "Dados incompletos!"}), 400

    try:
        # Inserir no MongoDB
        collection.insert_one(data)
        return jsonify({"message": "Usuário salvo com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": f"Erro ao salvar no MongoDB: {str(e)}"}), 500
