from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tickets.db'
db = SQLAlchemy(app)

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='Open')
    is_admin_response = db.Column(db.Boolean, default=False)
    admin_response = db.Column(db.Text)

# Fonction pour créer les tables dans la base de données
def create_tables():
    with app.app_context():
        db.create_all()

# Appel de la fonction pour créer les tables au lancement de l'application
create_tables()

@app.route('/')
def index():
    tickets = Ticket.query.all()
    return render_template('index.html', tickets=tickets)

@app.route('/create_ticket', methods=['GET', 'POST'])
def create_ticket():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        ticket = Ticket(title=title, description=description)
        db.session.add(ticket)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create_ticket.html')

@app.route('/respond_ticket/<int:ticket_id>', methods=['GET', 'POST'])
def respond_ticket(ticket_id):
    ticket = Ticket.query.get_or_404(ticket_id)
    if request.method == 'POST':
        admin_response = request.form['admin_response']
        ticket.admin_response = admin_response
        ticket.status = 'Closed'
        ticket.is_admin_response = True
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('respond_ticket.html', ticket=ticket)

@app.route('/ticket/<int:ticket_id>')
def view_ticket(ticket_id):
    ticket = Ticket.query.get_or_404(ticket_id)
    return render_template('view_ticket.html', ticket=ticket)

@app.route('/change_status/<int:ticket_id>/<new_status>')
def change_status(ticket_id, new_status):
    ticket = Ticket.query.get_or_404(ticket_id)
    ticket.status = new_status
    db.session.commit()
    return redirect(url_for('view_ticket', ticket_id=ticket.id))
