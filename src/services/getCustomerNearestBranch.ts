import { getNearestBranch } from "../api/qm";

async function getCustomerNearestBranch({ latitude, longitude }: { latitude: number; longitude: number }) {
  try {
    const data = await getNearestBranch({ latitude, longitude });

    return data.branch;
  } catch (err) {
    console.error(err);
  }
}

export default getCustomerNearestBranch;
