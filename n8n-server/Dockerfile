# Stage 1: Build
FROM node:24-slim AS builder
WORKDIR /app
RUN corepack enable

# Copy file package trước để tận dụng cache
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

# COPY TOÀN BỘ CODE (Quan trọng)
COPY . .

# Kiểm tra thử xem code có ở đây không ngay khi build (tùy chọn để debug)
RUN ls -la /app

# Stage 2: Runtime
FROM node:24-slim
WORKDIR /app
RUN npm install pm2 -g

# Copy từ builder sang
COPY --from=builder /app /app

ENV NODE_ENV=production
# Đảm bảo lệnh CMD đúng tên file
CMD ["pm2-runtime", "ecosystem.config.cjs"]