FROM php:8-fpm

ENV TZ=Europe/Warsaw
WORKDIR /www

RUN apt update
RUN apt install -y ffmpeg --no-install-recommends
RUN docker-php-ext-install pdo_mysql

RUN mkdir -p -m 777 /www/cache/thumbnails

COPY api ./api
