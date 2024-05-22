from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


db = SQLAlchemy()

      
class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10))
    username = db.Column(db.String(50))
    location = db.Column(db.String(50))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='Ouvert')
    is_admin_response = db.Column(db.Boolean, default=False)
    admin_response = db.Column(db.Text)

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rooms = db.Column(db.Text)

class Droitlecteur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rooms = db.Column(db.Text)

class Materiel(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    designation = db.Column(db.String(100))
    marque = db.Column(db.String(100))
    modele = db.Column(db.String(50))
    mac = db.Column(db.Text)
    ip = db.Column(db.Text)
    location = db.Column(db.Text)
    username = db.Column(db.Text)
    network = db.Column(db.Text)
    last_modif = db.Column(db.String(20))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    