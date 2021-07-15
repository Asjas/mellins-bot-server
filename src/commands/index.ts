import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import BackCommand from "./back";
import StartCommand from "./start";
import RegisterCommand from "./register";
import CustomerIdCommand from "./customerId";
import BalanceCommand from "./balance";
import StatementsCommand from "./statements";
import AppointmentsCommand from "./appointments";
import CheckUpcomingAppointmentCommand from "./checkUpcomingAppointments";
import BookAppointmentCommand from "./bookAppointment";
import ShopOnlineCommand from "./shopOnline";
import RequestACallbackCommand from "./requestACallback";
import BranchLocatorCommand from "./branchLocator";
import FindClosestBranchCommand from "./findClosestBranch";
import ShareLocationCommand from "./shareLocation";
import SocialMediaCommand from "./socialMedia";
import FacebookCommand from "./facebook";
import InstagramCommand from "./instagram";
import JoinMellinsChannelCommand from "./joinMellinsChannel";
import YesJoinChannelCommand from "./yesJoinChannel";
import ShareContactCommand from "./shareContact";

function registerBotCommands(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  BackCommand(bot);
  StartCommand(bot);
  RegisterCommand(bot);
  CustomerIdCommand(bot);
  BalanceCommand(bot);
  StatementsCommand(bot);
  AppointmentsCommand(bot);
  CheckUpcomingAppointmentCommand(bot);
  BookAppointmentCommand(bot);
  ShopOnlineCommand(bot);
  RequestACallbackCommand(bot);
  ShareContactCommand(bot);
  BranchLocatorCommand(bot);
  FindClosestBranchCommand(bot);
  ShareLocationCommand(bot);
  JoinMellinsChannelCommand(bot);
  YesJoinChannelCommand(bot);
  SocialMediaCommand(bot);
  FacebookCommand(bot);
  InstagramCommand(bot);
}

export default registerBotCommands;
