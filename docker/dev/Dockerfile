ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}

ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=true
ENV DOCKER=true

RUN corepack enable

RUN rm -rf /var/cache/apk/*

RUN mkdir /application
WORKDIR /application

RUN chmod -R 777 /application
