import os  # Corrigir erro de importação
from flask import Flask
from flask_cors import CORS
from app.routes import routes

# Inicializar o aplicativo Flask
app = Flask(__name__)
CORS(app)  # Permitir solicitações do frontend

# Registrar as rotas
app.register_blueprint(routes)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use a porta do ambiente ou 5000 por padrão
    app.run(host="0.0.0.0", port=port)
