import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram.js";

export default function RequestACallbackCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  // wip still
  // need to do some stuff with freshdesk to log a ticket using the API
  // also need to fetch data from database to send to freshdesk

  bot.action("Request a Callback", async (ctx: MyContext) => {
    await ctx.answerCbQuery(
      "A support ticket has been logged and an agent will contact you shortly.\n\n(this is a fake notification - the freshdesk integration isn't working yet)",
      {
        show_alert: true,
      },
    );

    await ctx.reply(
      "A support ticket has been logged and an agent will contact you shortly.\n\n(this is a fake notification - the freshdesk integration isn't working yet)",
    );
  });

  bot.hears("Request a Callback", async (ctx: MyContext) => {
    await ctx.reply(
      "A support ticket has been logged and an agent will contact you shortly.\n\n(this is a fake notification - the freshdesk integration isn't working yet)",
    );
  });
}
