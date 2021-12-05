FROM php:8-fpm

ENV TZ=Europe/Warsaw
WORKDIR /www

RUN apt update
RUN apt install -y ffmpeg --no-install-recommends
RUN pecl install -o -f redis
RUN rm -rf /tmp/pear
RUN docker-php-ext-enable redis

RUN mkdir -p -m 777 /www/cache/thumbnails

COPY api ./api
