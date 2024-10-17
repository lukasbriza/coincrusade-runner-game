# act as from root of turborepo
FROM node:22.9.0-alpine3 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache libc6-compat jq bash curl
RUN apk update
RUN corepack enable
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

FROM base AS builder

WORKDIR /coincrusade-runner-game

COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./pnpm-workspace.yaml .
COPY ./.npmrc .
COPY ./tsconfig.json .
COPY ./turbo.json .
COPY ./.eslintrc.cjs .
COPY ./.prettierignore .
COPY ./prettier.config.js .
COPY ./packages ./packages

WORKDIR /coincrusade-runner-game/apps/frontend
COPY ./apps/frontend .

WORKDIR /coincrusade-runner-game
RUN corepack prepare "$(jq -r '.packageManager' package.json)" --activate
RUN pnpm config set store-dir /coincrusade-runner-game/.pnpm-store
RUN pnpm install
RUN pnpm turbo run build --filter=@lukasbriza/frontend --no-daemon

FROM base AS installer

WORKDIR /coincrusade-runner-game
RUN apk update

COPY --from=builder ./.pnpm-store ./.pnpm-store
COPY --from=builder ./out/json/ .
COPY --from=builder ./out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder ./out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN sh -c "rm -rf node_modules"
RUN pnpm install --prod
RUN node-prune
RUN sh -c "rm -rf $(pnpm store path)"

COPY --from=builder /coincrusade-runner-game/out/full/ .
