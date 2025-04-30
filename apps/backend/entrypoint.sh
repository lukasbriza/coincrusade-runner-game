#!/bin/sh

echo "Running Prisma Migrations..."
pnpm prisma migrate deploy

echo "Starting the server..."
pnpm start -p $PORT