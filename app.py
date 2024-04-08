from flask import Flask
from models import db
from routes import init_app 
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///csi_bdd.db'
app.config['SECRET_KEY'] = b'\x97\xfd\xb8\x98j-\xd1;$\xbb\xe2Z\xc6\x0c\x87t' #python -c 'import os; print(os.urandom(16))'

# Initialise la base de données
db.init_app(app)

# Initialise les routes 
init_app(app)

if __name__ == "__main__":
    app.run(debug=True)
####
##