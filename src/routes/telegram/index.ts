import { FastifyInstance } from "fastify";

import { channelUsersSchema, channelMessageSchema } from "./schema";
import { IchannelMessageBody } from "./types";

import sendChannelMessage from "../../services/sendChannelMessage";

export default function TelegramRoutes(fastify, _opts, done) {
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

  fastify.post("/channel/message", async (request, reply) => {
    const attachment = request.body.attachment; // access files
    const message = request.body.message.value; // other fields

    console.log(attachment);
    console.log(attachment.filename);
    console.log(attachment.toBuffer());

    const attachmentBuffer = await attachment.toBuffer();

    attachmentBuffer.name = attachment.filename;

    await sendChannelMessage({ message, attachment: attachmentBuffer });

    reply.status(200).send({
      response: {
        error: { code: null, description: null },
        message: `Message received and sent to Mellins Channel.`,
      },
    });
  });

  done();
}
