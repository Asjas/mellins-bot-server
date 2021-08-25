import { Context } from "telegraf";

interface MyContext extends Context {
  customerId?: string;
  joinedMellinsChannel?: string;
  botSessionId?: string;
  channelSessionId?: string;
}

export default MyContext;
