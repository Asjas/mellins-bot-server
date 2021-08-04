import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerNearestBranch from "../services/getCustomerNearestBranch";
import * as keyboards from "../messages/botKeyboards";
import { botReply, botReplyWithLocation } from "./reply";

export default function ShareLocationCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  // When the user drops a `pin` to their location it comes in as a normal message, that is why
  // we have to register a middleware plugin to check if the `location` object exists in any message
  bot.use(async (ctx: MyContext, next) => {
    try {
      const { location } = ctx.message as any;

      if (!location) {
        await next();
        return;
      }

      // Because sharing your location isn't an actual bot command we
      // need to manually pass it as a bot command to `ctx`
      const userCommand = Object.assign(ctx, {
        update: { ...ctx.update, message: { ...ctx.message, text: "Share location" } },
      });

      if (location?.latitude && location?.longitude) {
        // the user just sent us their location
        const {
          name: branchName,
          latitude: branchLatitude,
          longitude: branchLongitude,
          distance,
        } = await getCustomerNearestBranch(location);

        await botReply(
          userCommand,
          `The closest branch to you is:\n\nMellins ${branchName}\nDistance: ${Math.round(Number(distance))}km`,
          keyboards.fullBotKeyboard(ctx),
        );

        await botReplyWithLocation(userCommand, {
          latitude: Number(branchLatitude),
          longitude: Number(branchLongitude),
        });
      }
    } catch (err) {
      console.error(err);
    }

    await next();
  });
}
