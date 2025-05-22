FROM python:3.11-slim

WORKDIR /app

COPY ./app /app/app
COPY requirements.txt .
COPY app/scripts/init_db.py /app/scripts/init_db.py

COPY start.sh /app/start.sh

ENV PYTHONPATH=/app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*
RUN chmod +x /app/start.sh
RUN pip install --upgrade pip && pip install -r requirements.txt

EXPOSE 8000

CMD ["/app/start.sh"]
