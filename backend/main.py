from flask import Flask
from flask_cors import CORS
from app.routes import routes

# Inicializar o aplicativo Flask
app = Flask(__name__)
CORS(app)  # Permitir solicitações do frontend

# Registrar as rotas
app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(port=5000)
