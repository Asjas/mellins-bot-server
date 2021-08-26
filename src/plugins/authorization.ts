import FastifyCSRF from "fastify-csrf";
import FastifyCookie from "fastify-cookie";
import FastifyPlugin from "fastify-plugin";
import FastifySession from "fastify-session";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

async function Authorization(fastify: FastifyInstance, opts) {
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

  async function authorize(request: FastifyRequest, reply: FastifyReply) {
    const { mellinsDashboardSession } = request.cookies;

    if (!mellinsDashboardSession) {
      throw fastify.httpErrors.unauthorized("Missing session cookie");
    }

    const cookie = request.unsignCookie(mellinsDashboardSession);

    if (!cookie.valid) {
      throw fastify.httpErrors.unauthorized("Invalid cookie signature");
    }

    let mail;
    try {
      mail = await fastify.isUserAllowed(cookie.value);
    } catch (err) {
      request.log.warn(`Invalid user tried to authenticate: ${JSON.stringify(err.user)}`);
      // Let's clear the cookie as well in case of errors,
      // in this way if a user retries the request we'll save
      // an additional http request to GitHub.
      reply.clearCookie("user_session", { path: "/_app" });
      throw err;
    }

    // You can add any property to the request/reply objects,
    // but it's important you declare them in advance with decorators.
    // If you don't, your code will likely be deoptimized by V8.
    request.user = { mail };
  }

  async function isUserAllowed(email) {
    const user = await fastify.prisma.user.findUnique({ where: email });

    if (!user) {
      throw fastify.httpErrors.unauthorized("Authenticate again");
    }

    const isAllowed = payload.some((ele) => allowedUsers.includes(ele.email));

    if (!isAllowed) {
      const err = httpErrors.forbidden("You are not allowed to access this");
      // let's store the user info so we can log them later
      err.user = payload;
      throw err;
    }

    for (const ele of payload) {
      if (ele.primary) return ele.email;
    }

    throw httpErrors.badRequest("The user does not have a primary email");
  }

  fastify.decorate("authorize", authorize);
  fastify.decorate("isUserAllowed", isUserAllowed);
  fastify.decorateRequest("user", null);
}

export default FastifyPlugin(Authorization);
