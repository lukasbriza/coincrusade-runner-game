ARG NODE_VERSION=22.11.0

################################
#Alpine image
FROM node:${NODE_VERSION}-alpine3.20 AS alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV CI=true
ENV DOCKER=true

RUN rm -rf /var/cache/apk/*

RUN mirrors="http://mirror.fel.cvut.cz/alpine/ \
             https://mirror1.hs-esslingen.de/pub/Mirrors/alpine/ \
             https://mirror.ibcp.fr/pub/alpine/"; \
    for mirror in $mirrors; do \
        echo "Trying mirror: $mirror"; \
        sed -i "s|http[s]*://[a-zA-Z0-9.-]*/alpine/|$mirror|" /etc/apk/repositories; \
        if apk update && \
        apk add --no-cache \
          libc6-compat \
          bash \
          curl \
          jq; then \
        break; \
      else \
        echo "Mirror $mirror failed, trying next..."; \
      fi; \
  done

RUN corepack enable
RUN rm -rf /var/cache/apk/*

COPY package.json .
RUN corepack prepare "$(jq -r '.packageManager' package.json)" --activate 
RUN rm package.json

################################
# Setup turbo on the alpine base
FROM alpine AS base
RUN npm install turbo --global

WORKDIR /application
RUN pnpm config set store-dir /application/.pnpm-store

################################
# Prune project
FROM base AS pruner
ARG APP

WORKDIR /application
COPY . .
RUN turbo prune @lukasbriza/${APP} --docker

################################
# Build the project
FROM base AS builder
ARG APP

# Copy codestyle configuration files
COPY --from=pruner /application/.npmrc /application/tsconfig.json /application/.eslintrc.cjs /application/.prettierignore /application/prettier.config.js /application/

WORKDIR /application

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /application/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /application/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /application/out/json/ .

# Download node prune
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=/application/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /application/out/full/ .

# Build and ceanup
RUN turbo build --filter=@lukasbriza/${APP}
RUN --mount=type=cache,id=pnpm,target=/application/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src && \
    rm -rf ./**/*/test && \
    rm -rf ./**/*/tests && \
    rm -rf ./**/*/.turbo && \
    rm -rf ./**/*/*.md
RUN node-prune
RUN sh -c "rm -rf $(pnpm store path)"

################################
# Final image
FROM alpine AS runner
ARG APP
ARG PORT=3000

ENV PORT=${PORT}
ENV HOSTNAME="0.0.0.0"
ENV TZ=Europe/Prague
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

WORKDIR /application
COPY --from=builder --chown=nextjs:nextjs /application . 

WORKDIR /application/apps/${APP}
EXPOSE ${PORT}
CMD pnpm next start -p ${PORT}


