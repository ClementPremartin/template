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
CMD npm run dev &
RUN sleep 5
RUN npx playwright install --with-deps
RUN npx playwright test