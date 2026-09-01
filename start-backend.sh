#!/bin/sh
set -e

cd /app

echo "Running Medusa migrations..."
pnpm exec medusa db:migrate

echo "Starting Medusa production server..."
exec pnpm exec medusa start --host 0.0.0.0 --port 9000
