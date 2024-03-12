FROM node:lts AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

FROM base as build
COPY app ./app
RUN npm run build

FROM base AS dev
EXPOSE 3000
CMD npm run dev

FROM build as ci
RUN npm ci
RUN npx playwright install --with-deps
CMD npx playwright test