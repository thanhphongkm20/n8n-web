FROM node:24-slim AS builder

WORKDIR /app

# Bật corepack để dùng Yarn Berry/Modern nếu có
RUN corepack enable

# Chỉ copy các file cấu hình trước để tối ưu layer cache
COPY package.json yarn.lock .yarnrc.yml ./
# Nếu bạn có thư mục .yarn (chứa plugin/releases), hãy copy nó
COPY .yarn ./.yarn

# Cài đặt dependencies
RUN yarn install --immutable

# Copy toàn bộ code
COPY . .

# Stage chạy thực tế
FROM node:24-slim
WORKDIR /app
COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 5000

# Chạy bằng node trực tiếp để nhẹ image
CMD ["node", "index.js"]