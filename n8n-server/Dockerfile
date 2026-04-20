# Stage 1: Build
FROM node:24-slim AS builder
WORKDIR /app
RUN corepack enable

# Copy file quản lý gói trước
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

# COPY TOÀN BỘ CODE VÀO
COPY . .

RUN ls -la /app

# Stage 2: Runtime
FROM node:24-slim
WORKDIR /app

# Cài đặt PM2
RUN npm install pm2 -g

# Copy toàn bộ từ stage builder (bao gồm code và ecosystem.config.cjs)
COPY --from=builder /app /app

ENV NODE_ENV=production
ENV TZ=Asia/Bangkok
EXPOSE 5000

# Chắc chắn tên file này khớp với file trong project của bạn
CMD ["pm2-runtime", "ecosystem.config.cjs"]