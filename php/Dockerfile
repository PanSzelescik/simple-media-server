FROM php:8-fpm

ENV TZ=Europe/Warsaw
WORKDIR /www

RUN apt update && \
    apt install -y ffmpeg --no-install-recommends && \
    pecl install -o -f redis && \
    rm -rf /tmp/pear && \
    docker-php-ext-enable redis && \
    mkdir -p -m 777 /www/cache/thumbnails

COPY api ./api
