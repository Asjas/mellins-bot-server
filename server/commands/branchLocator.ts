import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function BranchLocatorCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Branch Locator", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.BRANCH_LOCATOR_MESSAGE, keyboards.branchLocatorKeyboard());
    } catch (err) {
      console.error(err);
    }
  });
}
