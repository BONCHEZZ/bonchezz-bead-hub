#!/bin/sh
set -eu

python manage.py shell -c "import os; from urllib.parse import urlparse; url=os.getenv('DATABASE_URL',''); parsed=urlparse(url) if url else None; print('[DB] DATABASE_URL_SET=', bool(url)); print('[DB] DATABASE_HOST=', parsed.hostname if parsed else None); print('[DB] DATABASE_NAME=', parsed.path.lstrip('/') if parsed else None)"
python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers "${GUNICORN_WORKERS:-3}"
