import envSchema from "env-schema";
import S from "fluent-json-schema";

const schema = S.object()
  .prop("PORT", S.number().required())
  .prop("NODE_ENV", S.string().default("development"))
  .prop("LOG_LEVEL", S.string().default("info"))
  .prop("PRETTY_PRINT", S.boolean())
  .prop("MELLINS_DB_HOST", S.string().required())
  .prop("MELLINS_DB_USER", S.string().required())
  .prop("MELLINS_DB_PASS", S.string().required())
  .prop("MELLINS_DB", S.string().required())
  .prop("REDIS_HOST", S.string().required())
  .prop("REDIS_PORT", S.string().required())
  .prop("REDIS_AUTH", S.string().required())
  .prop("TELEGRAM_BOT_TOKEN", S.string().required())
  .prop("ATLAS_HTTP_URL", S.string().required())
  .prop("ATLAS_HTTP_ENDPOINT", S.string().required())
  .prop("ATLAS_AUTH_TOKEN", S.string().required())
  .prop("FRESHDESK_HTTP_URL", S.string().required())
  .prop("FRESHDESK_TICKET_ENDPOINT", S.string().required())
  .prop("FRESHDESK_AUTH_TOKEN", S.string().required());

export type Config = {
  logger: boolean;
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;
  PRETTY_PRINT: boolean;
  MELLINS_DB_HOST: string;
  MELLINS_DB_USER: string;
  MELLINS_DB_PASS: string;
  MELLINS_DB: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_AUTH: string;
  TELEGRAM_BOT_TOKEN: string;
  ATLAS_HTTP_URL: string;
  ATLAS_HTTP_ENDPOINT: string;
  ATLAS_AUTH_TOKEN: string;
  FRESHDESK_HTTP_URL: string;
  FRESHDESK_TICKET_ENDPOINT: string;
  FRESHDESK_AUTH_TOKEN: string;
};

export default envSchema({
  schema,
  dotenv: true,
}) as Config;
