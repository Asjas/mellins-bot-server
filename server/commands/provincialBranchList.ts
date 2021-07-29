import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function RegisterCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Provincial Branch List", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.PROVINCIAL_BRANCHES_MESSAGE, keyboards.provincialBranchListKeyboard());
    } catch (err) {
      console.error(err);
    }
  });
}
