# syntax=docker/dockerfile:experimental

#NODE and NPM Versions
ARG NODE_VERSION=10.4.1
ARG NPM_VERSION=6.2.0

FROM node:${NODE_VERSION}-alpine as base

RUN npm install -g npm@${NPM_VERSION}

# Set working directory to /app inside the container.
WORKDIR /app

FROM base as code

COPY package.json package-lock.json /app
RUN --mount=type=ssh npm ci && npm cache clean --force

COPY . /app

FROM code AS final

EXPOSE 3001

# Perform any further action as the unprivileged "node" user.
USER node

# Run the app
CMD ["npm", "run", "start"]


