#!/bin/sh

# Wait for the database to be ready
# Optional but recommended
echo "Waiting for Postgres..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Postgres is up."

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Start the server
echo "Starting server..."
npm start