import { Context } from "telegraf";

interface MyContext extends Context {
  customerId?: string;
  joinedPrivateChannel?: boolean;
}

export default MyContext;
