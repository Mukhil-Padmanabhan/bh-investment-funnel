#!/bin/bash

echo "▶ Waiting for Postgres to be ready..."
while ! nc -z berkshire-db 5432; do
  sleep 1
done

echo "Postgres is ready"

echo "▶ Running database init script..."
python /app/scripts/init_db.py || echo "⚠️ DB init script failed or already seeded"

echo "▶ Starting FastAPI server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
