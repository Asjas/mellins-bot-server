import { Context } from "telegraf";

interface MyContext extends Context {
  customerId?: string;
}

export default MyContext;
