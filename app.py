from flask import Flask
from models import db
from routes import init_app 

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///csi_bdd.db'
app.config['SECRET_KEY'] = 'd5fb8c4fa8bd46638dadc4e751e0d68d'

# Appel de la fonction pour créer les tables au lancement de l'application
#create_tables()

# Initialise la base de données
db.init_app(app)

# Initialise les routes
init_app(app)

if __name__ == "__main__":
    app.run(debug=True)

