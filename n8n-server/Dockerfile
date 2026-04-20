# Stage 1: Build
FROM node:24-slim AS builder
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable
COPY . .

# Stage 2: Runtime
FROM node:24-slim
WORKDIR /app

# Cài đặt PM2 toàn cục trong stage runtime
RUN npm install pm2 -g

# Copy toàn bộ từ stage builder
COPY --from=builder /app ./

ENV NODE_ENV=production
ENV TZ=Asia/Bangkok
EXPOSE 5000

# SỬA LỆNH CHẠY:
# Dùng pm2-runtime để nó không chạy dưới dạng daemon (giúp container không bị thoát)
CMD ["pm2-runtime", "ecosystem.config.cjs"]