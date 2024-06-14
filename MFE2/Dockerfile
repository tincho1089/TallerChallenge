FROM node:18-alpine AS development
RUN mkdir -p /svr/app
WORKDIR /svr/app
COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .
