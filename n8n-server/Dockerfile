FROM node:24-slim AS builder
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
# Đảm bảo copy cả thư mục .yarn nếu có
COPY .yarn ./.yarn
RUN yarn install --immutable
COPY . .

# --- Runtime Stage ---
FROM node:24-slim
WORKDIR /app
COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 5000

# THAY ĐỔI Ở ĐÂY: Chạy bằng node thuần cho ổn định
CMD ["node", "index.js"]