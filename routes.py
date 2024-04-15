from flask import render_template, request, abort, redirect, url_for, session, flash
from models import db, User,Ticket,Location
from datetime import datetime
import pygal

def init_app(app):  #POUR INIT APP.PY

    #PAGE D'ACCEUIL
    @app.route('/')
    def index():
        locations = Location.query.all()
        return render_template('login.html', locations = locations)
    
    #PAGE DASHBOARD
    @app.route('/home')
    def home():
        if 'user_id' not in session:
           flash('Veuillez vous connecter pour accéder à cette fonctionnalité.', 'warning')
           return redirect(url_for('index'))
        current_user = session.get('username')
        # Récupérer les données de la base de données
        open_tickets = Ticket.query.filter_by(status='Ouvert').count()
        closed_tickets = Ticket.query.filter_by(status='Fermer').count()
        in_progress_tickets = Ticket.query.filter_by(status='En cours').count()
        resolved_tickets = Ticket.query.filter_by(status='Clôturer').count()

        return render_template('index.html' , current_user=current_user,open_tickets=open_tickets, closed_tickets=closed_tickets, in_progress_tickets=in_progress_tickets, resolved_tickets=resolved_tickets)
    
    #PAGE TICKET
    @app.route('/ticket')
    def ticket():
        if 'user_id' not in session:
           flash('Veuillez vous connecter pour accéder à cette fonctionnalité.', 'warning')
           return redirect(url_for('index'))
        tickets = Ticket.query.all()
        current_user = session.get('username')
        return render_template('ticket.html', tickets=tickets, current_user=current_user)
    
    #FONCTION LOGIN
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
                session['username'] = user.username  # Stocker le nom de l'utilisateur dans la session
                return redirect(url_for('home'))
            else:
                error = "Identifiant ou mot de passe incorrect."
        return render_template('login.html', error=error)
    

    @app.route('/admin/dashboard')  
    def admin_dashboard():
        if 'user_id' not in session or not session['is_admin']:
            abort(403)  # Accès interdit$
        else:
            return render_template('index.html')
        

    @app.route('/create_ticket', methods=['GET', 'POST'])
    def create_ticket():
       # if 'user_id' not in session:
        #    flash('Veuillez vous connecter pour accéder à cette fonctionnalité.', 'warning')
         #   return redirect(url_for('login'))
        if request.method == 'POST':
            username = request.form['username']
            location_name = request.form['location']
            title = request.form['title']
            description = request.form['description']
            current_date = datetime.utcnow()
            formatted_date = current_date.strftime("%d-%m-%Y")

            ticket = Ticket(username=username, location=location_name, title=title, description=description, date=formatted_date)
            
            db.session.add(ticket)
            db.session.commit()
            return redirect(url_for('index'))
        #return render_template('create_ticket.html')

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


    @app.route('/diagramme')
    def diagramme():
        

        # Transmettre les données au modèle HTML
        return render_template('diagramme.html', open_tickets=open_tickets, closed_tickets=closed_tickets, in_progress_tickets=in_progress_tickets, resolved_tickets=resolved_tickets)
        
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
            is_admin = request.form.get('is_admin')  # Vérifie si la case "Is Admin" a été cochée

            # Vérifiez si l'utilisateur existe déjà
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                flash('Cet utilisateur existe déjà.', 'danger')
                return redirect(url_for('register'))

            # Créez un nouvel utilisateur
            new_user = User(username=username)
            new_user.set_password(password)
            new_user.is_admin = True if is_admin else False  # Définit le statut d'administrateur en fonction de la case cochée
            
            # Ajoutez l'utilisateur à la base de données
            db.session.add(new_user)
            db.session.commit()

            flash('Nouvel utilisateur créé avec succès. Connectez-vous maintenant.', 'success')
            return redirect(url_for('login'))

        return render_template('register.html')

    @app.route('/logout')
    def logout():
        session.pop('user_id', None)
        return redirect(url_for('index'))

    

