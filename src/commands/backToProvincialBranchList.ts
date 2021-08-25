import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function BackToProvincialBranchListCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Back to provincial branch list", async (ctx: MyContext) => {
    try {
      await botReply(
        ctx,
        "Thank you for using @Mellinsbot's\n\nPlease select an action to continue:",
        keyboards.provincialBranchListKeyboard(),
      );
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });
}
