FROM node:8.9.1

WORKDIR /var/www/api/
COPY ./node_modules node_modules/
COPY ./package.json package.json
COPY ./entry.sh entry.sh
COPY ./src src/
COPY ./build build/

EXPOSE 3000

CMD ["./entry.sh"]
