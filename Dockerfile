# Usamos una imagen base de Node.js
FROM node:20

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos el archivo package.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Comando para iniciar nuestra aplicación
CMD [ "npm", "start" ]

# Establecemos la variable de entorno para la base de datos
ENV DATABASE_PATH="./database/sqlite.db"
ENV PORT=80

# Exponemos el puerto que usa nuestra aplicación
EXPOSE 80