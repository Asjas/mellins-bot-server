import { logUserActionsInDb } from "../db/telegram";

export async function botReply(ctx: any, message: string, keyboard = {}) {
  // Incoming message from a user that just deleted the bot
  // We need to handle this as a special case or else the bot crashes
  if (ctx?.update?.my_chat_member?.new_chat_member?.status === "kicked") {
    return;
  }

  // Incoming message from a user that restarted the bot they stopped
  // We need to handle this as a special case or else the bot crashes
  if (ctx?.update?.my_chat_member?.old_chat_member?.status === "kicked") {
    const { firstName, lastName } = ctx.update?.my_chat_member?.from;
    await ctx.reply(`Welcome back ${firstName} ${lastName}. Your account is now active on Mellins i.Bot`);
    return;
  }

  const { customerId: rsaId, joinedPrivateChannel: userJoinedChannel } = ctx;
  let { message_id: messageId = "", text: userCommand = "" } = ctx.update?.message;
  const { firstName, lastName, id: userTelegramId } = ctx.update?.message?.from;
  const botAnswer = firstName ? `Hi, ${firstName},\n\n${message}` : message;

  // If the user sent us their `Contact` when requesting a callback we
  // need to manually set the user command value
  if (ctx?.update?.message?.contact) {
    userCommand = "User `Contact` Sent";
  }

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
