module.exports = {
  apps: [
    {
      name: "mellins-bot",
      script: "./index.mjs",
      cwd: "dist",
      max_memory_restart: "1200M",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "mellins-ui",
      script: "npm",
      args: "start",
      cwd: "ui",
      max_memory_restart: "1200M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
