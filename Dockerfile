FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN  npm install
EXPOSE 8081
CMD ["npm", "run", "serve"]

FROM sebp/lighttpd:latest
COPY app/ /var/www/localhost/htdocs/
