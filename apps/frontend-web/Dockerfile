FROM node:16-alpine as dev
RUN apk update && apk add g++ make python3
ENV PORT=3000

WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn install

EXPOSE ${PORT}