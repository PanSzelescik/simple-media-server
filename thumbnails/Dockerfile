FROM node:16-buster-slim

ENV TZ=Europe/Warsaw
ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD node src/index.js
