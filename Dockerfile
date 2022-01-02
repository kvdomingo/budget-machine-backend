FROM node:16-alpine as web

WORKDIR /budget

EXPOSE 3000

ENTRYPOINT [ "sh", "devserver.sh" ]

FROM pypy:3.8-7-buster as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN python -m pip install -U --no-cache-dir pip setuptools

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/utils.py
RUN sed -i "s/'_headers'/'headers'/" /opt/pypy/lib/pypy3.8/site-packages/revproxy/response.py

FROM base as dev

WORKDIR /budget

EXPOSE $PORT

ENTRYPOINT gunicorn budget_machine.wsgi -b 0.0.0.0:$PORT --reload

FROM node:16-alpine as web-build

WORKDIR /frontend

COPY ./web/app/ ./

RUN npm install

RUN npm run build

FROM base as prod

WORKDIR /backend

COPY ./backend/ ./backend/
COPY ./budget_machine/ ./budget_machine/
COPY ./*.py ./
COPY runserver.sh .
COPY --from=web-build /frontend/build ./web/app/

EXPOSE $PORT

ENTRYPOINT [ "sh", "runserver.sh" ]
