# Utiliser une image avec Maven et Java préinstallés
FROM maven:3.8.6-openjdk-17

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement le fichier pom.xml pour optimiser le cache Docker
COPY pom.xml ./

# Télécharger les dépendances Maven (sans compiler)
RUN mvn dependency:go-offline -B

# Copier le reste du projet
COPY . .

# Compiler le plugin avec Maven
RUN mvn clean package -B

# Définir le répertoire contenant le JAR compilé
VOLUME ["/app/target"]

# Commande par défaut (facultatif, ici on ne lance rien)
CMD ["echo", "Build complete! JAR available in /app/target"]
