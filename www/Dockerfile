FROM node:16-buster-slim as webpack

ENV NODE_ENV=production
WORKDIR /webpack

RUN npm install -g cross-env

COPY package.json package-lock.json ./
RUN npm ci

COPY public ./public
COPY resources ./resources
COPY webpack.mix.cjs ./webpack.mix.cjs
RUN npm run production


FROM nginx:mainline

ENV TZ=Europe/Warsaw

WORKDIR /www

COPY --from=webpack /webpack/build /www/resources
COPY index.html .
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
