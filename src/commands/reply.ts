import { logUserActionsInDb } from "../db/telegram";

export async function botReply(ctx: any, message: string, keyboard = {}) {
  const { customerId: rsaId, joinedPrivateChannel: userJoinedChannel } = ctx;
  const { message_id: messageId = "Default Message ID", text: userCommand = "Default Command" } = ctx.update?.message;
  const {
    firstName = "Default First Name",
    lastName = "Default Last Name",
    id: userTelegramId = "Default Telegram ID",
  } = ctx.update?.message?.from;
  const botAnswer = firstName ? `Hi, ${firstName},\n\n${message}` : message;

  await logUserActionsInDb({
    firstName,
    lastName,
    rsaId,
    userTelegramId,
    userJoinedChannel,
    messageId,
    userCommand,
    botAnswer,
  });

  await ctx.reply(botAnswer, keyboard);
}

export async function botReplyWithLocation(ctx: any, { latitude, longitude }: { latitude: number; longitude: number }) {
  const { customerId: rsaId, joinedPrivateChannel: userJoinedChannel } = ctx;
  const { message_id: messageId, text: userCommand } = ctx.update?.message;
  const { firstName, lastName, id: userTelegramId } = ctx.update?.message?.from;
  const botAnswer = `${latitude}, ${longitude}`;

  await logUserActionsInDb({
    firstName,
    lastName,
    rsaId,
    userTelegramId,
    userJoinedChannel,
    messageId,
    userCommand,
    botAnswer,
  });

  await ctx.replyWithLocation(latitude, longitude);
}

export async function botReplyWithDocument(
  ctx: any,
  { source, filename }: { source: Buffer; filename: string },
  keyboard = {},
) {
  const { customerId: rsaId, joinedPrivateChannel: userJoinedChannel } = ctx;
  const { message_id: messageId, text: userCommand } = ctx.update?.message;
  const { firstName, lastName, id: userTelegramId } = ctx.update?.message?.from;
  const botAnswer = `"Encoded statement", ${filename}`;

  await logUserActionsInDb({
    firstName,
    lastName,
    rsaId,
    userTelegramId,
    userJoinedChannel,
    messageId,
    userCommand,
    botAnswer,
  });

  await ctx.replyWithDocument({ source, filename }, keyboard);
}

export async function botReplyWithInlineKeyboard(ctx: any, message: string, keyboard = {}) {
  const { customerId: rsaId, joinedPrivateChannel: userJoinedChannel } = ctx;
  const { message_id: messageId, text: userCommand } = ctx.update?.message;
  const { firstName, lastName, id: userTelegramId } = ctx.update?.message?.from;
  const botAnswer = firstName ? `Hi, ${firstName},\n\n${message}` : message;

  await logUserActionsInDb({
    firstName,
    lastName,
    rsaId,
    userTelegramId,
    userJoinedChannel,
    messageId,
    userCommand,
    botAnswer,
  });

  await ctx.reply(botAnswer, {
    parse_mode: "HTML",
    ...keyboard,
  });
}
