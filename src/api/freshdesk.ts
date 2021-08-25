import { Client } from "undici";
import config from "../config";

import type { PostFreshdesk } from "../types/freshdesk";

const freshdeskClient = new Client(config.FRESHDESK_HTTP_URL);

export async function postFreshdeskTicket({ firstName, lastName, contactNo }) {
  try {
    const bufferAuthToken = Buffer.from(config.FRESHDESK_AUTH_TOKEN, "utf-8");
    const base64AuthToken = bufferAuthToken.toString("base64");

    const { body } = await freshdeskClient.request({
      origin: "http://127.0.0.1:3000",
      path: config.FRESHDESK_TICKET_ENDPOINT,
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Basic ${base64AuthToken}`,
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        description: `A new @MellinsBot customer callback request has been made by: ${firstName} ${lastName}.\n\nCellphone Number: ${contactNo}`,
        subject: "New Customer Callback Request",
        email: "aj@pienaarconsulting.co.za",
        phone: contactNo,
        priority: 1,
        status: 2,
      }),
    });

    let data = "";

    for await (const chunk of body) {
      data += chunk;
    }

    const parsedData: PostFreshdesk = JSON.parse(data);

    return parsedData;
  } catch (err) {
    console.error(err);
  }
}
