# Stage 1: Build
FROM node:24-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable
COPY . .

# Stage 2: Runtime
FROM node:24-bookworm-slim
WORKDIR /app

# Copy mọi thứ từ stage builder
COPY --from=builder /app ./

ENV NODE_ENV=production
ENV TZ=Asia/Bangkok
EXPOSE 5000

# Chạy trực tiếp bằng node
CMD ["node", "index.js"]