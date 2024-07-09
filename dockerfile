#stage 1
FROM node:20.13.1-alpine AS builder

#build web
WORKDIR /usr/app/web
COPY web/package.json web/package-lock.json web/*.prod.mjs ./
COPY web ./
RUN npm install && npm run build

#build server
WORKDIR /usr/app/server
COPY server/*json server/.env ./
COPY server/src ./src
COPY server/scripts ./scripts
RUN npm install && npm run build

#stage 2
FROM node:20.13.1-alpine

WORKDIR /usr/app/server
COPY --from=builder /usr/app/server ./
COPY --from=builder /usr/app/web/dist/ ./dist/public

EXPOSE 3000
CMD ["npm", "run", "start"]