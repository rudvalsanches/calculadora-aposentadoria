from pymongo import MongoClient

# Configuração do MongoDB
uri = "mongodb+srv://usuario_mc2r:iE4G5MjfA4CRnT1V@cluster-mc2r.shsme.mongodb.net/?retryWrites=true&w=majority&appName=cluster-mc2r"
client = MongoClient(uri)

# Banco de dados e coleção
db = client["calculadora_aposentadoria"]
collection = db["usuarios"]

print("Conexão com o MongoDB estabelecida com sucesso!")
