import { logError } from "../utils/logger";

export const fetchTransactionData = async () => {
  try {
    const res = await fetch("/mock data/transactions.json");
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch (err) {
    logError.error(err);
    throw err;
  }
};
