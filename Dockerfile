FROM node:12.15.0

ARG SOURCE_DIR="./"

RUN mkdir -p /srv/ensembl-graphql-server

COPY ${SOURCE_DIR} /srv/ensembl-graphql-server

WORKDIR /srv/ensembl-graphql-server

# NOTE: NODE_ENV=development before npm install ensures that dev dependencies won't get skipped
RUN npm ci

EXPOSE 5000

# ENTRYPOINT ["./node_modules/.bin/ts-node" "src/index.ts"]

# FIXME: use pm2
CMD [ "npm", "run", "start-prod" ]
