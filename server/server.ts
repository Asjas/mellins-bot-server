import Etag from "fastify-etag";
import FastifyFavicon from "fastify-favicon";
import Helmet from "fastify-helmet";
import Sensible from "fastify-sensible";
import UnderPressure from "under-pressure";
import fastify, { FastifyServerOptions } from "fastify";

import PrismaPlugin from "./plugins/prisma";

import CustomerRoutes from "./routes/customer";
import MessagesRoutes from "./routes/messages";

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

  await server.register(PrismaPlugin, {
    ...opts,
  });

  await server.register(CustomerRoutes, {
    ...opts,
  });

  await server.register(MessagesRoutes, {
    ...opts,
  });

  return server;
}

export default createServer;
