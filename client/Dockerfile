# --- Stage 1: Build ---
FROM node:24-alpine AS build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install
COPY . .
RUN yarn build

# --- Stage 2: Serve ---
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]