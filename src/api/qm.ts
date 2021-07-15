import { Client } from "undici";
import config from "../config";

import type { GetBalance, GetNearestBranch, GetStatement } from "../types/qm";

const qmClient = new Client(config.ATLAS_HTTP_URL);

export async function getBalance(customerId: string) {
  const { body } = await qmClient.request({
    origin: "http://127.0.0.1:3000",
    path: config.ATLAS_HTTP_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Basic ${config.ATLAS_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      request: { function: "GetBalance", parameters: { account_prefix: "MELLIN", customer_id: customerId } },
    }),
  });

  let data = "";

  for await (const chunk of body) {
    data += chunk;
  }

  const parsedData: GetBalance = JSON.parse(data);

  return parsedData.response;
}

export async function getStatement(customerId: string) {
  const { body } = await qmClient.request({
    origin: "http://127.0.0.1:3000",
    path: config.ATLAS_HTTP_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Basic ${config.ATLAS_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      request: { function: "GetStatement", parameters: { account_prefix: "MELLIN", customer_id: customerId } },
    }),
  });

  let data = "";

  for await (const chunk of body) {
    data += chunk;
  }

  const parsedData: GetStatement = JSON.parse(data);

  return parsedData.response;
}

export async function getNearestBranch({ latitude, longitude }: { latitude: number; longitude: number }) {
  const { body } = await qmClient.request({
    origin: "http://127.0.0.1:3000",
    path: config.ATLAS_HTTP_ENDPOINT,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Basic ${config.ATLAS_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      request: {
        function: "GetNearestBranch",
        parameters: { account_prefix: "MELLIN", Location: { latitude, longitude } },
      },
    }),
  });

  let data = "";

  for await (const chunk of body) {
    data += chunk;
  }

  const parsedData: GetNearestBranch = JSON.parse(data);

  return parsedData.response;
}
