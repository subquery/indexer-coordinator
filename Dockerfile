FROM node:16 as builder


ARG RELEASE_VERSION
ENTRYPOINT ["subql-coordinator"]
RUN npm i -g --unsafe-perm @subql/indexer-coordinator@${RELEASE_VERSION}

FROM node:16-alpine
ENV TZ utc

RUN apk add --no-cache tini git curl docker-cli docker-compose grep

COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/lib/node_modules/@subql/indexer-coordinator/bin/run"]
