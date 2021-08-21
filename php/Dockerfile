FROM php:8-fpm

ENV TZ=Europe/Warsaw
WORKDIR /www

RUN apt update
RUN apt install -y ffmpeg --no-install-recommends
RUN docker-php-ext-install opcache

RUN mkdir -p -m 777 /www/cache/thumbnails

COPY api ./api
COPY opcache.ini /usr/local/etc/php/conf.d/opcache.ini
