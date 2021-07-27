import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getProvincialBranches from "../services/getProvincialBranches";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function WesternCapeBranchesBotCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Western Cape", async (ctx: MyContext) => {
    const provincialCode = 9;
    const data = await getProvincialBranches(provincialCode);

    // If there are no practices in the province, send a message and redirect the user back
    if (data?.error?.code === 10002) {
      await ctx.reply(data.error.description, keyboards.provincialBranchListKeyboard());
      return;
    }

    const branches = Object.values(data.branches);

    await botReply(ctx, constants.BRANCH_SELECTION_MESSAGE, await keyboards.branchListKeyboard(bot, branches));
  });
}
