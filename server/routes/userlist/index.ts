import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";
import { getUsers } from "../../db/telegram";

const schema = {
  response: {
    200: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.null()).prop("description", S.null()).required())
        .prop(
          "userlist",
          S.array().items(
            S.object()
              .prop("rsaId", S.number().required())
              .prop("joinedMellinsChannel", S.boolean().required())
              .prop("kickedBot", S.boolean().required()),
          ),
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

export default function UserListRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.get("/userlist", { schema }, async (_request, reply) => {
    const customers = await getUsers();

    if (customers.length === 0) {
      reply.status(404).send({
        response: { error: { code: 404, description: `No customers found.` }, customer: null },
      });

      return;
    }

    reply.status(200).send({ response: { error: { code: null, description: null }, userlist: customers } });
  });

  done();
}
