FROM node:20-alpine

WORKDIR /app

# Au démarrage du conteneur, on copie le contenu
CMD cp -r /source/* . && \
    npm install && \
    npx hardhat node