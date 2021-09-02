import Etag from "fastify-etag";
import FastifyHelmet from "fastify-helmet";
import FastifyNext from "fastify-nextjs";
import FastifyStatic from "fastify-static";
import { FastifyInstance } from "fastify";
import { join } from "path";

import { Config } from "../config";

export default async function FrontendPlugin(fastify: FastifyInstance, opts: Config) {
  await fastify.register(Etag);

  await fastify.register(FastifyHelmet, {
    frameguard: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'", "https:", "http:"],
        fontSrc: ["'self'", "https:", "http:", "data:"],
        frameAncestors: ["'self'", "http://localhost:4000", "http://127.0.0.1:4000"],
        imgSrc: ["'self'", "data:", "https:"],
        objectSrc: ["'self'"],
        frameSrc: ["'self'"],
        styleSrc: ["'self'", "https:", "http:", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-eval'"],
        scriptSrcAttr: ["'self'"],
      },
    },
  });

  await fastify.register(FastifyStatic, {
    root: join(__dirname, "../static"),
  });

  await fastify.register(FastifyNext, {
    dev: opts.NODE_ENV === "development",
  });

  await fastify.register((server: FastifyInstance, _opts, done) => {
    server.next("/");
    server.next("/profile");
    server.next("/users");
    server.next("/channel");
    server.next("/create-account");
    server.next("/sign-in");
    server.next("/sign-out");
    server.next("/forgot-password");
    server.next("/account-pending");
    server.next("/404");

    done();
  });
}
