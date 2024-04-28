from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class MaterielForm(FlaskForm):
    designation = StringField('Désignation', validators=[DataRequired()])
    marque = StringField('Marque', validators=[DataRequired()])
    modele = StringField('Modèle', validators=[DataRequired()])
    mac = StringField('Adresse MAC', validators=[DataRequired()])
    ip = StringField('Adresse IP', validators=[DataRequired()])
    username = StringField('Utilisateur', validators=[DataRequired()])
    location = StringField('Localisation', validators=[DataRequired()])
    network = StringField('Réseau', validators=[DataRequired()])
    submit = SubmitField('Enregistrer')