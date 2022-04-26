FROM node:18-bullseye-slim as webpack

ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /webpack

RUN npm install -g cross-env

COPY package.json package-lock.json ./
RUN npm ci

COPY public ./public
COPY resources ./resources
COPY webpack.mix.cjs ./webpack.mix.cjs
RUN npm run production

FROM ranadeeppolavarapu/nginx-http3

ENV TZ=Europe/Warsaw

WORKDIR /www

COPY --from=webpack /webpack/build /www/resources
COPY index.html .
COPY nginx.conf /etc/nginx/nginx.conf
COPY cert.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY private.key /etc/ssl/private/nginx-selfsigned.key

EXPOSE 80
EXPOSE 443/tcp
EXPOSE 443/udp
