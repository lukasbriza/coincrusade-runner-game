FROM node:22.9.0-alpine3.20 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV CI=true
ENV DOCKER=true

RUN apk add --no-cache jq curl && \
    apk update && \
    rm -rf /var/cache/apk/* && \
    corepack enable && \
    curl -sf https://gobinaries.com/tj/node-prune | sh

FROM base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json turbo.json .eslintrc.cjs .prettierignore prettier.config.js /coincrusade-runner-game/
COPY ./packages /coincrusade-runner-game/packages
COPY ./apps/backend /coincrusade-runner-game/apps/backend

WORKDIR /coincrusade-runner-game

RUN corepack prepare "$(jq -r '.packageManager' package.json)" --activate && \
    pnpm config set store-dir /coincrusade-runner-game/.pnpm-store && \
    pnpm install

WORKDIR /coincrusade-runner-game/apps/backend
RUN pnpm prisma:generate && \
    pnpm turbo run build --filter=@lukasbriza/frontend --no-daemon && \
    pnpm turbo prune --scope=@lukasbriza/backend --docker


######
FROM base AS installer

WORKDIR /coincrusade-runner-game

COPY --from=builder /coincrusade-runner-game/.pnpm-store ./.pnpm-store
COPY --from=builder /coincrusade-runner-game/out/json/ .
COPY --from=builder /coincrusade-runner-game/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /coincrusade-runner-game/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /coincrusade-runner-game/turbo.json ./turbo.json
COPY --from=builder /coincrusade-runner-game/apps/backend/prisma ./apps/backend/prisma

RUN sh -c "rm -rf node_modules" && \
    pnpm install --prod

WORKDIR /coincrusade-runner-game/apps/backend

# RUN pnpm prisma:generate && \
  #  node-prune && \
  #  sh -c "rm -rf $(pnpm store path)" && \
  #  pnpm store prune && \
  #  pnpm turbo run build --filter=@lukasbriza/backend --include-dependencies --no-deps --no-daemon

