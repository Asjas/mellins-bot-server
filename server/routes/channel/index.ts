import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";

import { getUserFromDb } from "../../db/telegram";
import fetchCustomerFromAtlasDb from "../../services/fetchCustomerFromAtlasDb";

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

interface IBodyCreate {
  telegramId: number;
  firstName: string;
  lastName: string;
  username: string;
}

interface IBodyValidate {
  telegramId: number;
  rsaId: string;
}

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

  fastify.post<{ Body: IBodyCreate }>("/customer", async (request, reply) => {
    const { telegramId, firstName, lastName, username } = request.body;

    try {
      const result = await fastify.db.telegramUser.create({
        data: {
          firstName,
          lastName,
          username,
          telegramId,
        },
      });

      reply.send({ response: { error: { code: null, description: null }, customer: result } });
    } catch (error) {
      if (error.code === "P2002") {
        const result = await fastify.db.telegramUser.findUnique({
          where: { telegramId },
          select: {
            rsaId: true,
          },
        });

        if (!result.rsaId) {
          reply.send({
            response: { error: { code: 400, description: `User not registered yet.` }, customer: null },
          });
        } else {
          reply.send({
            response: { error: { code: "P2002", description: `Customer already created.` }, customer: null },
          });
        }
      }
    }
  });

  fastify.post<{ Body: IBodyValidate }>("/customer/validate", async (request, reply) => {
    const { rsaId, telegramId } = request.body;
    const customerFound: boolean = await fetchCustomerFromAtlasDb(rsaId);

    if (customerFound) {
      await fastify.db.telegramUser.update({
        where: { telegramId },
        data: {
          rsaId,
        },
      });

      reply.send({ response: { error: { code: null, description: null }, validatedStatus: customerFound } });
    } else {
      fastify.log.error(`Customer ${telegramId} with RSA ID ${rsaId} not found in Atlas.`);

      reply.send({
        response: { error: { code: 400, description: `Customer not found in Atlas.` }, validatedStatus: null },
      });
    }
  });

  done();
}
