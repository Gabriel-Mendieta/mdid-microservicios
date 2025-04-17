FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generar Prisma antes de compilar
RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/main"]
