from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, abort, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///csi_bdd.db'
app.config['SECRET_KEY'] = 'd5fb8c4fa8bd46638dadc4e751e0d68d'
db = SQLAlchemy(app)


class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='Open')
    is_admin_response = db.Column(db.Boolean, default=False)
    admin_response = db.Column(db.Text)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
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
    if 'user_id' not in session:
        flash('Veuillez vous connecter pour accéder à cette fonctionnalité.', 'warning')
        return redirect(url_for('login'))
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

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Vérifiez si l'utilisateur existe déjà
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Cet utilisateur existe déjà.', 'danger')
            return redirect(url_for('register'))

        # Créez un nouvel utilisateur
        new_user = User(username=username)
        new_user.set_password(password)
        
        # Ajoutez l'utilisateur à la base de données
        db.session.add(new_user)
        db.session.commit()

        flash('Nouvel utilisateur créé avec succès. Connectez-vous maintenant.', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['logged_in'] = True
            session['user_id'] = user.id
            session['is_admin'] = user.is_admin  # Stocker si l'utilisateur est un admin
            return redirect(url_for('index'))
        else:
            flash('Identifiants incorrects. Veuillez réessayer.', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))

@app.route('/admin/dashboard')
def admin_dashboard():
    if 'user_id' not in session or not session['is_admin']:
        abort(403)  # Accès interdit




