import AutoLoad from "fastify-autoload";
import Etag from "fastify-etag";
import FastifyCookie from "fastify-cookie";
import FastifyCors from "fastify-cors";
import FastifyFavicon from "fastify-favicon";
import FastifyHelmet from "fastify-helmet";
import FastifyNext from "fastify-nextjs";
import FastifyNodemailer from "fastify-nodemailer";
import FastifySession from "fastify-session";
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

  await server.register(Etag);

  await server.register(FastifyHelmet, {
    frameguard: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'", "https:", "http:"],
        fontSrc: ["'self'", "https:", "http:", "data:"],
        frameAncestors: ["'self'", "http://localhost:4000", "http://127.0.0.1:4000"],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'self'"],
        frameSrc: ["'self'"],
        styleSrc: ["'self'", "https:", "http:", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-eval'"],
        scriptSrcAttr: ["'self'"],
      },
    },
  });

  await server.register(FastifyFavicon);

  await server.register(Sensible);

  await server.register(FastifyNext, {
    dev: config.NODE_ENV === "development",
  });

  await server.register((fastify, _opts, done) => {
    // @ts-ignore
    fastify.next("/");

    done();
  });

  await server.register(FastifyCookie, {
    secret: config.COOKIE_SECRET,
  });

  await server.register(FastifySession, {
    secret: config.SESSION_SECRET,
    cookieName: "mellins-bot-server-sess",
    cookie: {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1_800_0000,
    },
  });

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
