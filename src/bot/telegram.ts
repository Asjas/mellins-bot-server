import { Telegraf } from "telegraf";
import registerBotCommands from "./registerBotCommands";
import botMiddleware from "../middleware/botMiddleware";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "../commands/reply";

async function mellinsBot(TELEGRAM_BOT_TOKEN: string) {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

  botMiddleware(bot);

  registerBotCommands(bot);

  await bot.launch();

  bot.hears("Mellins Channel", async (ctx) => {
    try {
      await ctx.reply("Open Mellins Channel", keyboards.inlineChannelLinkKeyboard());
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });

  // if the user provided text doesn't match any of our middleware or commands,
  // we then redirect them and display the full bot keyboard
  bot.use(async (ctx: any, next) => {
    try {
      // since the individual branch commands are registered dynamically, the route isn't
      // immediately accessible. So we loop the user back into the bot so that the request
      // can be handled when the route is accessible.
      if (ctx.message?.text?.includes("Mellins i-Style")) {
        await next();
        return;
      }

      await botReply(
        ctx,
        `Thank you for using @Mellinsbot's\n\nPlease select an action to continue:`,
        keyboards.fullBotKeyboard(ctx),
      );
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }

    await next();
  });

  // Gracefully shutdown the bot when neccessary.
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  return bot;
}

export default mellinsBot;
