module.exports = {
  apps: [
    {
      name: "n8n-server",
      script: "./index.js",
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: "production",
        TZ: "Asia/Bangkok",
        PORT: 5000
      },
    },
  ],
};