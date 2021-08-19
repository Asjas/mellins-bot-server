import { Message } from "typegram";

// types
type TBotMiddlewareFun = (msg: Message, meta: any, sendMessage: TSendMessage, next?: TBotNextFun) => any;
type TBotNextFun = () => any;
type TSendMessage = (message: string) => Promise<Message>;

// middleware creator
export const applyBotMiddleware =
  (...fns: Array<TBotMiddlewareFun>) =>
  <T>(msg: Message, meta: T) => {
    const callNext = (fn: TBotMiddlewareFun, fnIndex: number) => {
      // exit when there is no next middleware
      if (fnIndex > fns.length - 1) return;

      fn(
        msg,
        meta,
        // A small helper to reply to current user
        (message: string) => bot.telegram.sendMessage(msg.chat.id, message),
        // this calls the next middleware
        async () => {
          callNext(fns[++fnIndex], fnIndex);
        },
      );
    };

    // calling first middleware
    callNext(fns[0], 0);
  };
