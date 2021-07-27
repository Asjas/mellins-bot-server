import { getNearestBranch } from "../api/qm";

async function getCustomerNearestBranch({ latitude, longitude }: { latitude: number; longitude: number }) {
  const data = await getNearestBranch({ latitude, longitude });

  return data.branch;
}

export default getCustomerNearestBranch;
