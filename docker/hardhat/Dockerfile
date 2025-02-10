# Utiliser une image Node.js légère
FROM node:18-alpine

# Définition du dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances s'ils existent
COPY package.json ./
RUN npm install && npm cache clean --force

# Installer les dépendances si elles existent, sinon init Hardhat
RUN if [ -f package.json ]; then npm install; else \
    npm init -y && \
    npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox && \
    npx hardhat; \
    fi

# Copier le reste du projet
COPY . .

# Exposer le port Hardhat
EXPOSE 8545

# Commande par défaut : lancer Hardhat Node
CMD ["npx", "hardhat", "node"]
