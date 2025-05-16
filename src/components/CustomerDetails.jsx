import PropTypes from "prop-types";
import { calculateMonthlyRewards } from "../utils/calculateMonthlyRewards";
import { Table } from "../styles/StyledComponents";

const CustomerDetails = ({ transactions, customerId, month, year, onBack }) => {
  const userTx = transactions.filter((tx) => tx.customerId === customerId);
  const rewards = calculateMonthlyRewards(userTx, month, year);
  const txs = rewards.filteredTxs;

  return (
    <div>
      <button onClick={onBack}>⬅ Back</button>
      <h2>Customer {customerId} Details</h2>
      <p>
        <strong>Total Rewards:</strong> {rewards.total} points
      </p>
      {rewards.monthly &&
        Object.keys(rewards.monthly).map((monthKey) => (
          <p key={monthKey}>
            <strong>{monthKey}:</strong> {rewards.monthly[monthKey]} pts
          </p>
        ))}

      <h3>Transactions ({month || "All Months"})</h3>
      {txs.length === 0 ? (
        <p>No transactions</p>
      ) : (
        <Table>
          {" "}
          <thead>
            {" "}
            <tr>
              {" "}
              <th>ID</th> <th>Amount</th> <th>Date</th> <th>Points</th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4">No transactions</td>
              </tr>
            ) : (
              txs.map((tx) => (
                <tr key={tx.transactionId}>
                  {" "}
                  <td>{tx.transactionId}</td> <td>{tx.amount}</td>{" "}
                  <td>{tx.date}</td> <td>{tx.points}</td>{" "}
                </tr>
              ))
            )}{" "}
          </tbody>{" "}
        </Table>
      )}
    </div>
  );
};

CustomerDetails.propTypes = {
  transactions: PropTypes.array.isRequired,
  customerId: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default CustomerDetails;
