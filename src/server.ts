import AutoLoad from "fastify-autoload";
import FastifyCors from "fastify-cors";
import FastifyFavicon from "fastify-favicon";
import FastifyNodemailer from "fastify-nodemailer";
import Sensible from "fastify-sensible";
import Fastify, { FastifyServerOptions } from "fastify";
import { join } from "path";

import type { Config } from "./config";

async function createServer(config: Config) {
  const opts: FastifyServerOptions = {
    ...config,
    logger: {
      level: "debug",
      prettyPrint: config.PRETTY_PRINT,
    },
  };

  const server = Fastify(opts);

  await server.register(FastifyCors, {
    origin: "*",
  });

  await server.register(FastifyFavicon);

  await server.register(Sensible);

  await server.register(FastifyNodemailer, {
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    secure: false,
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: {
      ...opts,
    },
  });

  await server.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    dirNameRoutePrefix: true,
  });

  return server;
}

export default createServer;
