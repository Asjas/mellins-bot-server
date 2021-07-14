import { performance } from "perf_hooks";

import { telegramDb } from "../db/telegram";
import config from "../config";

function prismaMiddleware() {
  // this is used to measure the performance of the database requests during development
  telegramDb.$use(async (params, next) => {
    const before = performance.now();
    const result = await next(params);
    const after = performance.now();

    console.log(`🔍 Prisma: Query ${params.model}.${params.action} took ${after - before}ms 🚦`);

    return result;
  });
}

if (config.NODE_ENV !== "production") {
  prismaMiddleware();
}
