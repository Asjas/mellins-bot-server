import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";
import argon2 from "argon2";

const SignInSchema = {
  body: S.object().prop("email", S.string().required()).prop("password", S.string().required()),
  response: {
    200: S.object().prop("message", S.string().required()),
  },
};

interface ISignInBody {
  email: string;
  password: string;
}

interface IForgotPasswordBody {
  email: string;
}

export default function dashboardRoutes(fastify: FastifyInstance, opts, done) {
  fastify.route<{ Body: ISignInBody }>({
    method: "POST",
    url: "/sign-in",
    schema: SignInSchema,
    handler: async (request, reply) => {
      const { email, password } = request.body;

      const user = await fastify.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return reply.unauthorized("Authentication failed");
      }
      const confirmPassword = await argon2.verify(user.password, password);

      if (!confirmPassword) {
        return reply.unauthorized("Authentication failed");
      }

      const token = await reply.jwtSign({ email });

      return reply
        .setCookie("mellinsDashboardJWT", token, {
          path: "/",
          httpOnly: true,
          maxAge: 1_800_000,
          sameSite: "lax",
          secure: opts.NODE_ENV === "production",
        })
        .send({ message: "Logged in" });
    },
  });

  fastify.route({
    method: "POST",
    url: "/sign-out",
    handler: async (_request, reply) => {
      reply.clearCookie("mellinsDashboardJWT").send({ message: "Signed out" });
    },
  });

  fastify.route({
    method: "GET",
    url: "/verify-user",
    preValidation: [fastify.authenticate],
    handler: async function verifyUserHandler(request, reply) {
      console.log("request cookies", request.cookies);

      return reply.send({ message: "Ok" });
    },
  });

  fastify.route<{ Body: IForgotPasswordBody }>({
    method: "POST",
    url: "/forgot-password",
    handler: async (request, reply) => {
      const { email } = request.body;

      const user = await fastify.prisma.user.findUnique({ where: { email } });

      if (!user) {
        return reply.unauthorized();
      }

      console.log(user);
    },
  });

  done();
}
