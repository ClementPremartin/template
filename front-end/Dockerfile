FROM node:lts-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . /app

FROM base as build
COPY src ./src
RUN npm run build

FROM base AS dev
EXPOSE 3000
CMD npm run dev