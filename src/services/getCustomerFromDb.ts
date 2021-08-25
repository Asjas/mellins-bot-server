import { atlasDb } from "../db/atlas";

type Customer = {
  cmf_id?: string;
  cmf_pat_id?: string;
};

// Get the customer from atlas to see if they are a Mellins Patient or not
async function getCustomerFromDb(customerId: string) {
  try {
    const db = atlasDb();
    const [customerFound]: [Customer] = await db("SELECT cmf_id, cmf_pat_id FROM cmf WHERE cmf_id = ?", [customerId]);

    if (customerFound?.cmf_id || customerFound?.cmf_pat_id) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
}

export default getCustomerFromDb;
