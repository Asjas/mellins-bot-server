import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";

import { getUserFromDb } from "../../db/telegram";
import sendUserTelegramMessage from "../../services/sendCustomerTelegramMessage";

interface IParams {
  rsaId: string;
}

interface IBody {
  message: string;
}

export default function MessagesRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.post<{ Params: IParams; Body: IBody }>("/messages/:rsaId", async (request, reply) => {
    if (request.body === null) {
      reply.status(404).send({
        response: { error: { code: 404, description: `No message provided.` }, message: null },
      });
    }

    const { rsaId } = request.params;
    const { message } = request.body;

    const customer = await getUserFromDb(rsaId);

    if (customer === null) {
      reply.status(404).send({
        response: {
          error: {
            code: 404,
            description: "Customer does not exist in the Telegram database. I won't be able to send a message.",
          },
          message: null,
        },
      });

      return;
    }

    if (customer && customer.kickedBot) {
      reply.status(404).send({
        response: {
          error: {
            code: 404,
            description: "Customer exists in Telegram database but stopped the bot. I won't be able to send a message.",
          },
          message: null,
        },
      });

      return;
    }

    await sendUserTelegramMessage({ telegramId: customer.telegramId, message });

    reply.status(200).send({
      response: {
        error: { code: null, description: null },
        message: `Message received and sent to customer with ID ${rsaId}.`,
      },
    });
  });

  done();
}
