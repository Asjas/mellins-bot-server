import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import StartCommand from "./start";
import RegisterCommand from "./register";
import CustomerIDCommand from "./id";
import BalanceCommand from "./balance";
import StatementCommand from "./statement";
import RequestACallbackCommand from "./callback";

function registerBotCommands(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  StartCommand(bot);
  RegisterCommand(bot);
  CustomerIDCommand(bot);
  BalanceCommand(bot);
  StatementCommand(bot);
  RequestACallbackCommand(bot);
}

export default registerBotCommands;
