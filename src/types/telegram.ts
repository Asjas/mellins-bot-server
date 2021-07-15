import { Context } from "telegraf";
import { Update } from "typegram";

// interface LocationMessage extends Context<Update> {
//   message: Update.New & Update.NonChannel & Update.MessageUpdate & {
//     location: {
//       longitude: string;
//       latitude: string;
//     };
//   }
// }

interface MyContext extends Context {
  customerId?: string;
}

export default MyContext;
