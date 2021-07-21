import { performance } from "perf_hooks";
import { createPrismaRedisCache } from "prisma-redis-middleware";

import { telegramDb } from "../db/telegram";
import config from "../config";

export function prismaDevMiddleware() {
  // this is used to measure the performance of the database requests during development
  telegramDb.$use(async (params, next) => {
    const before = performance.now();
    const result = await next(params);
    const after = performance.now();

    console.log(`🔍 Prisma: Query ${params.model}.${params.action} took ${after - before}ms 🚦`);

    return result;
  });

  // @ts-ignore
  telegramDb.$use(
    // @ts-ignore
    createPrismaRedisCache(
      { model: `TelegramUser`, cacheTime: 40 },
      { REDIS_HOST: config.REDIS_HOST, REDIS_PORT: config.REDIS_PORT, REDIS_AUTH: config.REDIS_AUTH },
    ),
  );
}
