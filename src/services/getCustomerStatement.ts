import { getStatement } from "../api/qm";

async function getCustomerStatement(customerId: string) {
  try {
    const data = await getStatement(customerId);

    if (data?.error?.code === 2000) {
      return { error: 2000, description: data.error.description };
    }

    return data.branches;
  } catch (err) {
    console.error(err);
  }
}

export default getCustomerStatement;
