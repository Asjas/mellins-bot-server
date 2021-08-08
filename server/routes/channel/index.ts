import S from "fluent-json-schema";
import { FastifyInstance } from "fastify";

import { getUserFromDb } from "../../db/telegram";
import sendChannelMessage from "../../services/sendChannelMessage";

const schema = {
  body: S.object().prop("message", S.string().required()),
  response: {
    200: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.null()).prop("description", S.null()).required())
        .prop("message", S.string().required()),
    ),
    404: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.number().required()).prop("description", S.string().required()))
        .prop("message", S.null())
        .required(),
    ),
  },
};

interface IBody {
  message: string;
}

export default function ChannelRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.post<{ Body: IBody }>("/channel/message", { schema }, async (request, reply) => {
    const { message } = request.body;

    await sendChannelMessage({ message });

    reply.status(200).send({
      response: {
        error: { code: null, description: null },
        message: `Message received and sent to Mellins Channel.`,
      },
    });
  });

  done();
}
