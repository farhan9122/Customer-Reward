import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { calculateMonthlyRewards } from "../utils/calculateMonthlyRewards";
import { fetchTransactionData } from "../api/fetchTransactionData";
import { Table, Title, Container } from "../styles/StyledComponents";
import { logInfo, logError } from "../utils/logger";

const CustomerList = ({
  transactions,
  setTransactions,
  onSelectCustomer,
  month,
  year,
}) => {
  const customers = useMemo(() => {
    return [...new Set(transactions.map((tx) => tx.customerId))];
  }, [transactions]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const customerRewards = useMemo(() => {
    const rewardsMap = {};
    customers.forEach((customerId) => {
      const userTx = transactions.filter((tx) => tx.customerId === customerId);
      rewardsMap[customerId] = calculateMonthlyRewards(userTx, month, year);
    });
    return rewardsMap;
  }, [transactions, customers, month, year]);

  useEffect(() => {
    const loadData = async () => {
      try {
        logInfo("Fetching transaction data...");
        const data = await fetchTransactionData();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load transactions.");
        setLoading(false);
        logError(err);
        console.error(err);
      }
    };
    loadData();
  }, []);

  if (loading)
    return <div style={{ padding: "2rem" }}>🔄 Loading transactions...</div>;
  if (error)
    return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  return (
    <Container>
      <Title>All Customers</Title>
      <Table>
        <thead>
          <tr>
            <th>Customer ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {customers.map((id) => {
              return (
                <li
                  key={id}
                  onClick={() => onSelectCustomer(id)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Customer {id}</strong>: {customerRewards[id].total}{" "}
                  points
                </li>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

CustomerList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default CustomerList;
