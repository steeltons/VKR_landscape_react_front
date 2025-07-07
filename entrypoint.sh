#!/bin/sh

echo "Injecting runtime config..."
export REACT_APP_API_BASE_URL

envsubst '${REACT_APP_API_BASE_URL}' < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

echo "Generated config.js:"
cat /usr/share/nginx/html/config.js

exec "$@"
