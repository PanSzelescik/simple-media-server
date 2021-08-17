FROM node:16-buster-slim

ENV NODE_ENV=production

RUN npm install -g cross-env

WORKDIR /simple-media-server

COPY package.json package-lock.json ./
RUN npm ci

COPY public ./public
COPY resources ./resources
COPY webpack.mix.cjs ./webpack.mix.cjs
RUN npm run production

COPY . .
EXPOSE 3100
VOLUME /simple-media-server/cache
VOLUME /simple-media-server/files
CMD npm run start
