import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";

import { getUserFromDb } from "../../db/telegram";

const schema = {
  params: S.object().prop("rsaId", S.string().required()),
  response: {
    200: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.null()).prop("description", S.null()))
        .prop(
          "customer",
          S.object()
            .prop("firstName", S.string())
            .prop("lastName", S.string())
            .prop("rsaId", S.number())
            .prop("telegramId", S.number())
            .prop("joinedMellinsChannel", S.boolean())
            .prop("kickedBot", S.boolean())
            .prop("createdAt", S.string())
            .prop("updatedAt", S.string()),
        ),
    ),
    404: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.number()).prop("description", S.string()))
        .prop("customer", S.null()),
    ),
  },
};

interface IParams {
  rsaId: string;
}

export default function CustomerRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.get<{ Params: IParams }>("/customer/:rsaId", { schema }, async (request, reply) => {
    const { rsaId } = request.params;

    const customer = await getUserFromDb(rsaId);

    if (customer === null) {
      reply.status(404).send({
        response: { error: { code: 404, description: `Customer not found with ID: ${rsaId}` }, customer: null },
      });
    }

    reply.status(200).send({ response: { error: { code: null, description: null }, customer } });
  });

  done();
}
