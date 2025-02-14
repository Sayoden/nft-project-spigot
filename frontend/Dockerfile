FROM node:20-alpine

WORKDIR /app

# Au démarrage du conteneur, on copie le contenu et on installe
CMD cp -r /source/* . && \
    npm install --legacy-peer-deps && \
    npm cache clean --force && \
    npm run dev