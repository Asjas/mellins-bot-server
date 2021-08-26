import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default function dashboardRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.route({
    method: "POST",
    url: "/create-account",
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request.body);
    },
  });

  fastify.route({
    method: "POST",
    url: "/sign-in",
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request.body);
    },
  });

  fastify.route({
    method: "POST",
    url: "/forgot-password",
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request.body);
    },
  });

  done();
}
