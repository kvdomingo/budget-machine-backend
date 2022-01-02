#!/bin/sh

python manage.py collectstatic --noinput
python manage.py migrate
gunicorn budget_machine.wsgi -b 0.0.0.0:$PORT --log-file -
