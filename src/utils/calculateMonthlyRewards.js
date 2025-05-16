import { calculatePoints } from "./rewardRules";
import { getMonthYear } from "./dateUtils";

export const calculateMonthlyRewards = (
  transactions,
  filterMonth,
  filterYear
) => {
  const monthly = {};
  let total = 0;
  const filteredTxs = [];

  transactions.forEach((tx) => {
    const monthYear = getMonthYear(tx.date);
    const [month, year] = monthYear.split(" ");
    const points = calculatePoints(tx.amount);
    tx.points = points;

    if (!filterMonth || (month === filterMonth && year === filterYear)) {
      filteredTxs.push(tx);
    }

    if (!monthly[monthYear]) monthly[monthYear] = 0;
    monthly[monthYear] += points;
    total += points;
  });

  return { total, monthly, filteredTxs };
};
