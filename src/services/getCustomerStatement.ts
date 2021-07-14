import { Client } from "undici";
import config from "../config";

type CustomerStatement = {
  response: {
    error: {
      code: number;
      description: string;
    };
    branches: {
      [key: string]: {
        branch_code: string;
        branch_name: string;
        customer_number: string;
        customer_balance: string;
        patient_name: string;
        statement: string;
      };
    };
    total_balance: string;
    customer_name: string;
    last_exam_date: string;
    exam_due_date: string;
  };
};

async function getCustomerStatement(customerId: string) {
  const client = new Client(config.ATLAS_HTTP_URL);

  const { body } = await client.request({
    origin: "http://127.0.0.1:3000",
    path: config.ATLAS_HTTP_PATH,
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

  const parsedData: CustomerStatement = JSON.parse(data);

  if (parsedData?.response?.error?.code === 2000) {
    return { error: 2000, description: parsedData.response.error.description };
  }

  return parsedData.response.branches;
}

export default getCustomerStatement;
