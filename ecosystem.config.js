module.exports = {
  apps: [
    {
      name: "mellins-bot-server",
      script: "./dist/index.js",
      max_memory_restart: "1200M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
