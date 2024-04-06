from flask import render_template, request, abort, redirect, url_for, session, flash

from models import db, User,Ticket


def init_app(app):  #POUR INIT APP.PY
    
    @app.route('/')
    def index():
        return render_template('login.html')
    
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
                return redirect(url_for('home'))
            else:
                flash('Identifiants incorrects. Veuillez réessayer.', 'danger')
        return render_template('login.html')
    
    @app.route('/home')
    def home():
        tickets = Ticket.query.all()
        return render_template('index.html' , tickets=tickets)
    

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
            title = request.form['title']
            description = request.form['description']
            ticket = Ticket(username=username, title=title, description=description)
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

    

