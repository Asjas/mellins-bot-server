import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getProvincialBranches from "../services/getProvincialBranches";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function KwazuluNatalBranchesBotCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("KwaZulu-Natal", async (ctx: MyContext) => {
    try {
      const provincialCode = 4;
      const data = await getProvincialBranches(provincialCode);

      // If there are no practices in the province, send a message and redirect the user back
      if (data?.error?.code === 10002) {
        await botReply(ctx, data.error.description, keyboards.provincialBranchListKeyboard());
        return;
      }

      const branches = Object.values(data.branches);

      await botReply(ctx, constants.BRANCH_SELECTION_MESSAGE, await keyboards.branchListKeyboard(bot, branches));
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });
}
