import createServer from "./server";
import config from "./config";

async function startServer() {
  try {
    const PORT = Number(config.PORT) || 3000;
    const app = await createServer(config);

    await app.listen(PORT);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

void startServer();
