import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";

import { getUserFromDb } from "../../db/telegram";

const schema = {
  params: S.object().prop("rsaId", S.string().required()),
  response: {
    200: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.null()).prop("description", S.null()).required())
        .prop(
          "customer",
          S.object()
            .prop("firstName", S.string().required())
            .prop("lastName", S.string().required())
            .prop("rsaId", S.number().required())
            .prop("joinedMellinsChannel", S.boolean().required())
            .prop("kickedBot", S.boolean().required())
            .prop("createdAt", S.string().required())
            .prop("updatedAt", S.string().required()),
        ),
    ),
    404: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.number().required()).prop("description", S.string().required()))
        .prop("customer", S.null())
        .required(),
    ),
  },
};

interface IParams {
  rsaId: string;
}

export default function CustomerRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.get<{ Params: IParams }>("/:rsaId", { schema }, async (request, reply) => {
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
