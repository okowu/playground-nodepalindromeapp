## Build Image
FROM node:20-alpine AS builder

RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY ./package*.json /usr/src/app/

RUN npm ci

COPY . .

## Final Image
FROM node:20-alpine AS production

ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app /usr/src/app

EXPOSE 8080

CMD ["node", "server.js"]