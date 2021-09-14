import S from "fluent-json-schema";

export const channelUsersSchema = {
  response: {
    200: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.null()).prop("description", S.null()).required())
        .prop(
          "data",
          S.object().prop(
            "users",
            S.array()
              .items(
                S.object()
                  .prop("telegramId", S.number().required())
                  .prop("firstName", S.string().required())
                  .prop("lastName", S.string().required())
                  .prop("rsaId", S.string().required())
                  .prop("joinedMellinsChannel", S.boolean().required())
                  .prop("kickedBot", S.boolean().required())
                  .prop(
                    "UserBotTime",
                    S.array().items(
                      S.object()
                        .prop("id", S.number().required())
                        .prop("sessionId", S.string().required())
                        .prop("joinedAt", S.string().required())
                        .prop("leftAt", S.oneOf([S.string(), S.null()]).required()),
                    ),
                  )
                  .prop(
                    "UserChannelTime",
                    S.array().items(
                      S.object()
                        .prop("id", S.number().required())
                        .prop("sessionId", S.string().required())
                        .prop("joinedAt", S.string().required())
                        .prop("leftAt", S.oneOf([S.string(), S.null()]).required()),
                    ),
                  ),
              )
              .required(),
          ),
        ),
    ),
  },
};

export const channelMessageSchema = {
  response: {
    200: S.object().prop(
      "response",
      S.object()
        .prop("error", S.object().prop("code", S.null()).prop("description", S.null()).required())
        .prop("message", S.object().required()),
    ),
  },
};
