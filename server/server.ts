import Etag from "fastify-etag";
import FastifyFavicon from "fastify-favicon";
import Helmet, { fastifyHelmet } from "fastify-helmet";
import Sensible from "fastify-sensible";
import UnderPressure from "under-pressure";
import fastify, { FastifyServerOptions } from "fastify";
import AutoLoad from "fastify-autoload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import type { Config } from "./config";

async function createServer(config: Config) {
  const opts: FastifyServerOptions = {
    ...config,
    logger: {
      level: "debug",
      prettyPrint: config.PRETTY_PRINT,
    },
  };

  const server = fastify(opts);

  await server.register(Etag);

  await server.register(Helmet);

  await server.register(FastifyFavicon);

  await server.register(Sensible);

  // await server.register(UnderPressure, {
  //   exposeStatusRoute: true,
  //   maxEventLoopDelay: 1000,
  //   maxHeapUsedBytes: 100000000,
  //   maxRssBytes: 100000000,
  //   maxEventLoopUtilization: 0.98,
  // });

  await server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    forceESM: true,
    options: {
      ...opts,
    },
  });

  await server.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    dirNameRoutePrefix: false,
    forceESM: true,
  });

  return server;
}

export default createServer;
