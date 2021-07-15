import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";

export default async function BranchRegisterCallback(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>, branches) {
  branches.forEach((branch: any) => {
    bot.hears(branch.name, async (ctx: MyContext) => {
      await ctx.reply(`Here is the Map pin for: ${branch.name}`, keyboards.fullBotKeyboard());
      await ctx.replyWithLocation(branch.latitude, branch.longitude);
    });
  });

  // if the user provided text doesn't match any of our middleware or commands,
  // we then redirect them and display the full bot keyboard
  bot.use(async (ctx: any, next) => {
    const { first_name: firstName } = ctx.message.from;

    // since the individual branch commands are registered dynamically, the route isn't
    // immediately accessible. So we loop the user back into the back so that the request
    // can be handled when the route is accessible.
    if (ctx.message?.text?.includes("Mellins i-Style")) {
      await next();
      return;
    }

    await ctx.reply(
      `Hi ${firstName},\n\nThank you for using @Mellinsbot's\n\nPlease select an action to continue:`,
      keyboards.fullBotKeyboard(),
    );
    await next();
  });
}
