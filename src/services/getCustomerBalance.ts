import { Client } from "undici";
import config from "../config";

type CustomerBalance = {
  response: {
    error: {
      code: number;
      description: string;
    };
    customer: {
      customer_id: string;
      branches: {
        [key: string]: {
          branch_code: string;
          branch_name: string;
          customer_number: string;
          customer_balance: string;
          patient_name: string;
        };
      };
      total_balance: string;
      customer_name: string;
      last_exam_date: string;
      exam_due_date: string;
    };
  };
};

async function getCustomerBalance(customerId: string) {
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
      request: { function: "GetBalance", parameters: { account_prefix: "MELLIN", customer_id: customerId } },
    }),
  });

  let data = "";

  for await (const chunk of body) {
    data += chunk;
  }

  const parsedData: CustomerBalance = JSON.parse(data);

  return parsedData.response.customer;
}

export default getCustomerBalance;
