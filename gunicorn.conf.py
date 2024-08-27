# gunicorn.conf.py

# Nombre de processus worker
workers = 4

# Type de worker à utiliser
worker_class = 'sync'

# Port sur lequel Gunicorn va écouter
bind = "0.0.0.0:8000"

# Timeout pour les workers inactifs
timeout = 120

# Activer le rechargement automatique en cas de modification du code
reload = True

# Niveau de log
loglevel = 'info'

# Fichier de log d'accès
accesslog = '-'

# Fichier de log d'erreur
errorlog = '-'

# Activer la capture des erreurs par Gunicorn
capture_output = True

# Préfixe pour les logs
forwarded_allow_ips = '*'

# Configuration spécifique à l'application Flask
wsgi_app = 'app:app'
