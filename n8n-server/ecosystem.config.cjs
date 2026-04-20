module.exports = {
  apps: [{
    name: "n8n-server",
    script: "index.js",
    env: {
      NODE_ENV: "production",
      PORT: 5000
    }
  }]
}