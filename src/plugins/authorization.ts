import FastifyCSRF from "fastify-csrf";
import FastifyCookie from "fastify-cookie";
import FastifyJWT from "fastify-jwt";
import FastifyPlugin from "fastify-plugin";
import FastifySession from "fastify-session";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { Config } from "../config";

async function Authorization(fastify: FastifyInstance, opts: Config) {
  await fastify.register(FastifyCookie, {
    secret: opts.COOKIE_SECRET,
  });

  await fastify.register(FastifySession, {
    secret: opts.SESSION_SECRET,
    cookieName: "mellinsDashboardSession",
    cookie: {
      httpOnly: true,
      secure: opts.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1_800_0000,
    },
  });

  await fastify.register(FastifyCSRF, {
    sessionPlugin: "fastify-cookie",
    cookieOpts: {
      signed: true,
    },
  });

  await fastify.register(FastifyJWT, {
    secret: opts.JWT_SECRET,
    cookie: {
      cookieName: "mellinsDashboardJWT",
      signed: true,
    },
  });

  fastify.decorate("authenticate", async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
}

export default FastifyPlugin(Authorization);
