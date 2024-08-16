# Use uma imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie todo o código da aplicação
COPY . .

# Execute o build de produção do Next.js
RUN npm run build

# Exponha a porta que o app irá rodar
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "start"]