# Etapa 1: Build do React
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:stable-alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do React para a pasta pública do Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia a config customizada do Nginx (veja abaixo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
