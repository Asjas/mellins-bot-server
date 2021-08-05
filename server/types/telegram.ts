import { Context } from "telegraf";

interface MyContext extends Context {
  customerId?: string;
  joinedPrivateChannel?: string;
  sessionId?: string;
}

export default MyContext;
