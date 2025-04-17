FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# En caso de usar Prisma en el futuro
RUN npx prisma generate || true

RUN npm run build

CMD ["node", "dist/main"]
