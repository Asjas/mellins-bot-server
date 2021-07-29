import { postFreshdeskTicket } from "../api/freshdesk";

export default async function createFreshdeskTicket({ firstName, lastName, contactNo }) {
  try {
    const data = await postFreshdeskTicket({ firstName, lastName, contactNo });

    return data;
  } catch (err) {
    console.error(err);
  }
}
