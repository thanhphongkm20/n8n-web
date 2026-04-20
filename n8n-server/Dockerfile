FROM node:24-slim AS builder

FROM node:24-slim
WORKDIR /app
# Cài PM2 để container có lệnh này
RUN npm install pm2 -g
COPY --from=builder /app ./

# Đảm bảo copy cả file config vào
COPY ecosystem.config.cjs ./

EXPOSE 5000
CMD ["pm2-runtime", "ecosystem.config.cjs"]