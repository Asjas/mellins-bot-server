import TelegrafPKG from "telegraf";
import registerBotCommands from "./registerBotCommands";
import botMiddleware from "../middleware/botMiddleware";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "../commands/reply";

const { Telegraf } = TelegrafPKG;

async function mellinsBot(TELEGRAM_BOT_TOKEN: string) {
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

  botMiddleware(bot);

  registerBotCommands(bot);

  await bot.launch();

  // if the user provided text doesn't match any of our middleware or commands,
  // we then redirect them and display the full bot keyboard
  bot.use(async (ctx: any, next) => {
    // since the individual branch commands are registered dynamically, the route isn't
    // immediately accessible. So we loop the user back into the back so that the request
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

    await next();
  });

  return bot;
}

export default mellinsBot;
