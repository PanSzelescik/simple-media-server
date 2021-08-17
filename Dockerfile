FROM node:16-buster-slim as installer

ENV NODE_ENV=production
WORKDIR /simple-media-server

RUN npm install -g cross-env

COPY package.json package-lock.json ./
RUN npm ci

COPY public ./public
COPY resources ./resources
COPY webpack.mix.cjs ./webpack.mix.cjs
RUN npm run production


FROM node:16-buster-slim

ENV NODE_ENV=production
WORKDIR /simple-media-server

COPY --from=installer /simple-media-server /simple-media-server
COPY . .

EXPOSE 3100
VOLUME /simple-media-server/cache
VOLUME /simple-media-server/files

CMD ["src/index.js"]
