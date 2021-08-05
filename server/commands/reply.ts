import { isUserInDb, userStoppedBot, userRestartedBot } from "../db/telegram";

export async function botReply(ctx: any, message: string, keyboard = {}) {
  // Incoming message from a user that just deleted the bot
  // We need to handle this as a special case or else the bot crashes
  if (ctx?.update?.my_chat_member?.new_chat_member?.status === "kicked") {
    try {
      await userStoppedBot(ctx);
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
      await userRestartedBot(ctx);
    } catch (err) {
      console.error(err);
    }

    return;
  }

  try {
    if (!ctx?.update?.message) return;

    const { first_name: firstName = "" } = ctx.update?.message?.from;
    const botAnswer = firstName ? `Hi, ${firstName}.\n\n${message}` : message;

    await ctx.reply(botAnswer, keyboard);
  } catch (err) {
    console.error(err);
  }
}

export async function botReplyWithLocation(ctx: any, { latitude, longitude }: { latitude: number; longitude: number }) {
  try {
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
    await ctx.replyWithDocument({ source, filename }, keyboard);
  } catch (err) {
    console.error(err);
  }
}

export async function botReplyWithInlineKeyboard(ctx: any, message: string, keyboard = {}) {
  try {
    const { first_name: firstName = "" } = ctx.update?.message?.from;
    const botAnswer = firstName ? `Hi, ${firstName}.\n\n${message}` : message;

    await ctx.reply(botAnswer, {
      parse_mode: "HTML",
      ...keyboard,
    });
  } catch (err) {
    console.error(err);
  }
}
