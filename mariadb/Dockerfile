FROM mariadb:latest

ENV TZ=Europe/Warsaw
ENV MYSQL_ROOT_PASSWORD=zaq1@WSX
ENV MYSQL_DATABASE=simple-media-server
ENV MYSQL_USER=simple-media-server
ENV MYSQL_PASSWORD=zaq1@WSX

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306
