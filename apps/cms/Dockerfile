
FROM node:16-alpine as dev
RUN apk update && apk add g++ make python3

WORKDIR /usr/src/app
COPY ./package.json .
RUN yarn install

EXPOSE ${PORT}