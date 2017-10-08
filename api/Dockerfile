FROM node:8.6

WORKDIR /var/www/api/
COPY ./node_modules node_modules/
COPY ./package.json package.json
COPY ./entry.sh entry.sh
COPY ./src src/
COPY ./tools ./tools/

EXPOSE 300

CMD ["./entry.sh"]
