# act as from root of turborepo
FROM node:22.9.0-alpine3.20 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV CI=true
ENV DOCKER=true

RUN apk add --no-cache libc6-compat jq bash curl && \
    apk update && \
    rm -rf /var/cache/apk/* && \
    corepack enable && \
    curl -sf https://gobinaries.com/tj/node-prune | sh

FROM base AS builder

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc tsconfig.json turbo.json .eslintrc.cjs .prettierignore prettier.config.js /coincrusade-runner-game/
COPY ./packages /coincrusade-runner-game/packages
COPY ./apps/frontend /coincrusade-runner-game/apps/frontend

WORKDIR /coincrusade-runner-game

RUN corepack prepare "$(jq -r '.packageManager' package.json)" --activate && \
    pnpm config set store-dir /coincrusade-runner-game/.pnpm-store && \
    pnpm install && \
    pnpm turbo run build --filter=@lukasbriza/frontend --no-daemon && \
    pnpm turbo prune --scope=@lukasbriza/frontend --docker

FROM base AS installer

WORKDIR /coincrusade-runner-game

COPY --from=builder /coincrusade-runner-game/.pnpm-store ./.pnpm-store
COPY --from=builder /coincrusade-runner-game/out/json/ .
COPY --from=builder /coincrusade-runner-game/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /coincrusade-runner-game/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN sh -c "rm -rf node_modules" && \
    pnpm install --prod && \
    node-prune && \
    sh -c "rm -rf $(pnpm store path)" && \
    pnpm store prune


COPY --from=builder /coincrusade-runner-game/out/full/ .

FROM base AS runner

ENV NODE_ENV production
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"
ENV TZ=Europe/Prague

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /coincrusade-runner-game

COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/apps/frontend/next.config.mjs ./apps/frontend/next.config.mjs
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/apps/frontend/.next ./apps/frontend/.next
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/apps/frontend/public ./apps/frontend/public
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/package.json ./package.json
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/node_modules ./node_modules
COPY --from=installer --chown=nextjs:nodejs /coincrusade-runner-game/packages ./packages

RUN corepack prepare "$(jq -r '.packageManager' package.json)" --activate

EXPOSE $PORT

WORKDIR /coincrusade-runner-game/apps/frontend
CMD pnpm next start -p $PORT
