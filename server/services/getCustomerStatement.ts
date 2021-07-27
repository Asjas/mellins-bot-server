import { getStatement } from "../api/qm";

async function getCustomerStatement(customerId: string) {
  const data = await getStatement(customerId);

  if (data?.error?.code === 2000) {
    return { error: 2000, description: data.error.description };
  }

  return data.branches;
}

export default getCustomerStatement;
