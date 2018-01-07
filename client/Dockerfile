FROM node:8.9.1

WORKDIR /var/www/client/
COPY ./node_modules node_modules/
COPY ./package.json package.json
COPY ./entry.sh entry.sh
COPY ./src src/

EXPOSE 8080

CMD ["./entry.sh"]