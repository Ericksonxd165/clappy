#!/bin/sh

set -e

# It is recommended to use a more robust mechanism to wait for the database to be ready.
# For example, using a tool like wait-for-it.sh or pg_isready.
# Using a simple sleep for now for demonstration purposes.
echo "Waiting for DB..."
sleep 10

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Create the default admin user
echo "Creating default admin user..."
python manage.py create_admin_user

# Execute the command passed to the entrypoint
exec "$@"