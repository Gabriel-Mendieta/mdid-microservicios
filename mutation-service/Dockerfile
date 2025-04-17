# Imagen base de Node
FROM node:18-alpine

# Crear carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npx prisma generate
RUN npm run build

# Comando para correr la app Nest
CMD ["node", "dist/main"]
