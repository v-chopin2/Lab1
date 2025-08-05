# Utilise une image Node.js officielle
FROM node:20

# Crée un dossier de travail dans le conteneur
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste du code dans l’image
COPY . .

# Expose le port sur lequel ton app tourne
EXPOSE 8080

# Démarre ton application
CMD [ "node", "server.js" ]
