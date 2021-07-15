import { getBalance } from "../api/qm";

async function getCustomerBalance(customerId: string) {
  const data = await getBalance(customerId);

  return data.customer;
}

export default getCustomerBalance;
