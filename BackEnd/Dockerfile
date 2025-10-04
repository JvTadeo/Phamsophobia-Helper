# 1. Usar imagem oficial do Node.js
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# 8. Comando para rodar a aplicação
CMD ["npm", "start"]
