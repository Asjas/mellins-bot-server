import { postFreshdeskTicket } from "../api/freshdesk";

export default async function createFreshdeskTicket({ firstName, lastName, contactNo }) {
  const data = await postFreshdeskTicket({ firstName, lastName, contactNo });

  return data;
}
