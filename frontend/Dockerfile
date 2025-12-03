FROM node:20-alpine AS build
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine

ENV BACKEND_URL=""

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf.template /etc/nginx/conf.d/default.conf.template

CMD sh -c 'envsubst "${BACKEND_URL}" \
    < /etc/nginx/conf.d/default.conf.template \
    > /etc/nginx/conf.d/default.conf \
    && nginx -g "daemon off;"'