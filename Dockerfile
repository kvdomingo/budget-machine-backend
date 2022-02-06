FROM python:3.10-bullseye as dev

ENV PYTHONUNBUFFERED 1

RUN python -m pip install -U --no-cache-dir pip setuptools

COPY requirements.dev.txt /tmp/requirements.dev.txt
COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /backend

ENTRYPOINT gunicorn budget_machine.wsgi \
           -b 0.0.0.0:5000 \
           --workers 2 \
           --threads 4 \
           --log-file - \
           --capture-output \
           --reload

FROM node:16-alpine as web-build

WORKDIR /web

COPY ./web/app/ ./

RUN yarn install --prod

RUN yarn build

FROM python:3.10-bullseye as prod

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY ./backend/ ./backend/
COPY ./budget_machine/ ./budget_machine/
COPY ./*.py ./
COPY --from=web-build /web/build ./web/app/

EXPOSE $PORT

ENTRYPOINT python manage.py collectstatic --noinput \
           python manage.py migrate \
           gunicorn budget_machine.wsgi -b 0.0.0.0:$PORT --workers 1 --threads 2 --log-file -
