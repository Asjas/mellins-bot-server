import { getBranchList } from "../api/qm";

async function getProvincialBranches(provincialCode: number) {
  const data = await getBranchList(provincialCode);

  return data;
}

export default getProvincialBranches;
