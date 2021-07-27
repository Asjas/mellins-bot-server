module.exports = {
  apps: [
    {
      name: "mellins-bot",
      script: "./dist/index.mjs",
      max_memory_restart: "2000M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
