import { getBalance } from "../api/qm";

async function getCustomerBalance(customerId: string) {
  try {
    const data = await getBalance(customerId);

    return data.customer;
  } catch (err) {
    console.error(err);
  }
}

export default getCustomerBalance;
