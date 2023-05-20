FROM python:3.7-alpine

RUN apk update && apk add git
RUN apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install psycopg2

WORKDIR /home/usr

RUN git clone git://github.com/perseas/Pyrseas.git dbtoyaml
WORKDIR /home/usr/dbtoyaml
RUN python setup.py install

VOLUME [ "/home/usr/dbtoyaml/metadata" ]

ENTRYPOINT [ "dbtoyaml" ]