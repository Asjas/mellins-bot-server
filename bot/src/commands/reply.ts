import { isUserInDb, userStoppedBot, userRestartedBot } from "../../../server/db/telegram";

export async function botReply(ctx: any, message: string, keyboard = {}) {
  // Incoming message from a user that just deleted the bot
  // We need to handle this as a special case or else the bot crashes
  if (ctx?.update?.my_chat_member?.new_chat_member?.status === "kicked") {
    const { id: telegramId } = ctx.update?.my_chat_member?.from;

    try {
      await userStoppedBot(telegramId);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  // Incoming message from a user that restarted the bot they stopped
  // We need to handle this as a special case or else the bot crashes
  if (ctx?.update?.my_chat_member?.old_chat_member?.status === "kicked") {
    const { first_name: firstName, last_name: lastName, id: telegramId } = ctx.update?.my_chat_member?.from;
    const isUserFound = await isUserInDb(telegramId);

    if (isUserFound) {
      await ctx.reply(`Welcome back ${firstName} ${lastName}. Your account is now active on Mellins i.Bot`);
    }

    try {
      await userRestartedBot(telegramId);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  try {
    const { customerId: rsaId, joinedPrivateChannel: joinedMellinsChannel } = ctx;
    let { message_id: messageId = "", text: userCommand = "" } = ctx.update?.message;
    const { first_name: firstName, last_name: lastName, id: telegramId } = ctx.update?.message?.from;
    const botAnswer = firstName ? `Hi, ${firstName}.\n\n${message}` : message;

    // If the user sent us their `Contact` when requesting a callback we
    // need to manually set the user command value
    if (ctx?.update?.message?.contact) {
      userCommand = "User `Contact` Sent";
    }

    await ctx.reply(botAnswer, keyboard);
  } catch (err) {
    console.error(err);
  }
}

export async function botReplyWithLocation(ctx: any, { latitude, longitude }: { latitude: number; longitude: number }) {
  try {
    const { customerId: rsaId, joinedPrivateChannel: joinedMellinsChannel } = ctx;
    const { message_id: messageId, text: userCommand } = ctx.update?.message;
    const { firstName, lastName, id: telegramId } = ctx.update?.message?.from;
    const botAnswer = `${latitude}, ${longitude}`;

    await ctx.replyWithLocation(latitude, longitude);
  } catch (err) {
    console.error(err);
  }
}

export async function botReplyWithDocument(
  ctx: any,
  { source, filename }: { source: Buffer; filename: string },
  keyboard = {},
) {
  try {
    const { customerId: rsaId, joinedPrivateChannel: joinedMellinsChannel } = ctx;
    const { message_id: messageId, text: userCommand } = ctx.update?.message;
    const { firstName, lastName, id: telegramId } = ctx.update?.message?.from;
    const botAnswer = `"Encoded statement", ${filename}`;

    await ctx.replyWithDocument({ source, filename }, keyboard);
  } catch (err) {
    console.error(err);
  }
}

export async function botReplyWithInlineKeyboard(ctx: any, message: string, keyboard = {}) {
  try {
    const { customerId: rsaId, joinedPrivateChannel: joinedMellinsChannel } = ctx;
    const { message_id: messageId, text: userCommand } = ctx.update?.message;
    const { firstName, lastName, id: telegramId } = ctx.update?.message?.from;
    const botAnswer = firstName ? `Hi, ${firstName}.\n\n${message}` : message;

    await ctx.reply(botAnswer, {
      parse_mode: "HTML",
      ...keyboard,
    });
  } catch (err) {
    console.error(err);
  }
}
