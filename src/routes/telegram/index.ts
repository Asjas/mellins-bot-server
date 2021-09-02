import { FastifyInstance } from "fastify";

import { channelUsersSchema, channelMessageSchema } from "./schema";
import { IchannelMessageBody } from "./types";

import sendChannelMessage from "../../services/sendChannelMessage";

export default function TelegramRoutes(fastify: FastifyInstance, _opts, done) {
  fastify.get("/users", { schema: channelUsersSchema }, async (_request, reply) => {
    const users = await fastify.prisma.telegramUser.findMany({
      include: { UserBotTime: true, UserChannelTime: true },
    });

    reply.status(200).send({
      response: {
        error: { code: null, description: null },
        data: {
          users,
        },
      },
    });
  });

  fastify.get("/channel/users", { schema: channelUsersSchema }, async (_request, reply) => {
    const users = await fastify.prisma.telegramUser.findMany({
      include: { UserBotTime: true, UserChannelTime: true },
    });

    const channelUsers = users.filter((user) => user.joinedMellinsChannel);

    reply.status(200).send({
      response: {
        error: { code: null, description: null },
        data: {
          channelUsers,
        },
      },
    });
  });

  fastify.post<{ Body: IchannelMessageBody }>(
    "/channel/message",
    { schema: channelMessageSchema },
    async (request, reply) => {
      const { message } = request.body;

      await sendChannelMessage({ message });

      reply.status(200).send({
        response: {
          error: { code: null, description: null },
          message: `Message received and sent to Mellins Channel.`,
        },
      });
    },
  );

  done();
}
