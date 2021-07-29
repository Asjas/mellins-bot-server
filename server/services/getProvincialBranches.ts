import { getBranchList } from "../api/qm";

async function getProvincialBranches(provincialCode: number) {
  try {
    const data = await getBranchList(provincialCode);

    return data;
  } catch (err) {
    console.error(err);
  }
}

export default getProvincialBranches;
