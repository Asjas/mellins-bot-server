import { Context } from "telegraf";

interface MyContext extends Context {
  customerId?: string;
  joinedPrivateChannel?: boolean;
}

export default MyContext;

export type LogUserActionsInDb = {
  firstName?: string;
  lastName?: string;
  rsaId?: string;
  userTelegramId: number;
  userJoinedChannel?: boolean;
  messageId: number;
  userCommand: string;
  botAnswer: string;
};
