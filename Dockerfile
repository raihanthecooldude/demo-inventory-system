# Specify a base image
FROM node:12.19

WORKDIR /usr/src/app

#install some dependencies
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g

EXPOSE 3000

CMD ["sh", "-c", "npm run build; npm run start:dev"]
