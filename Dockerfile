# Étape de build
FROM node:18 AS build

ARG VITE_BACKEND_URL
ARG VITE_AZURE_BACKEND_URL

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers 'package.json' et 'package-lock.json' (ou 'yarn.lock')
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet dans le conteneur
COPY . .

# Créer le fichier .env avec les variables d'environnement nécessaires
#RUN echo "VITE_BACKEND_URL=10.196.10.69:4400\nVITE_AZURE_BACKEND_URL=10.196.10.69:4400" > .env

# Exécuter le script de build du projet
RUN npm run build

# Étape de serveur NGINX pour servir l'application
FROM nginx:stable-alpine as serve

# Copier les fichiers statiques depuis l'étape de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copier le script d'initialisation
COPY create-env.sh /usr/local/bin/create-env.sh

# Rendre le script exécutable
RUN chmod +x /usr/local/bin/create-env.sh

# Copier la configuration Nginx personnalisée dans le conteneur
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Lancer NGINX
CMD ["/bin/sh", "-c", "/usr/local/bin/create-env.sh && nginx -g 'daemon off;'"]

EXPOSE 80

