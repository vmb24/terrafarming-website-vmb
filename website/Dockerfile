# Use a imagem Node.js oficial como base
FROM node:18 AS builder

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Use uma imagem Node.js minimalista para rodar a aplicação
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie a aplicação construída do estágio anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Exponha a porta na qual a aplicação será executada
EXPOSE 3000

# Defina o comando de inicialização da aplicação
CMD ["npm", "start"]
