#!/bin/sh

# Création du fichier env-config.js pour injecter les variables d'environnement
cat <<EOF > /usr/share/nginx/html/env-config.js
window.env = {
  VITE_BACKEND_URL: "${VITE_BACKEND_URL}",
  VITE_AZURE_BACKEND_URL: "${VITE_AZURE_BACKEND_URL}"
};
EOF

echo "Fichier env-config.js créé avec succès."

