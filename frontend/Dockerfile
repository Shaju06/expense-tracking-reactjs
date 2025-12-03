FROM node:20-alpine AS build
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ------------ RUNTIME ------------
FROM nginx:stable-alpine

# Export env var without value (Railway will override it)
ENV BACKEND_URL=""

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf.template /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]