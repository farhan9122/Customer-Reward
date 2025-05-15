import React from 'react';
import PropTypes from 'prop-types';
import { calculateMonthlyRewards } from '../utils/rewardUtils';
import { Table, Title, Container } from '../styles/StyledComponents';

const CustomerList = ({ transactions, onSelectCustomer, month, year }) => {
  const customers = [...new Set(transactions.map(tx => tx.customerId))];

  const calculateCustomerRewards = (customerId) => {
    const userTx = transactions.filter(tx => tx.customerId === customerId);
    return calculateMonthlyRewards(userTx, month, year);
  };

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
      <ul>
        {customers.map(id => {
          const rewards = calculateCustomerRewards(id);
          return (
            <li key={id} onClick={() => onSelectCustomer(id)} style={{ cursor: 'pointer' }}>
              <strong>Customer {id}</strong>: {rewards.total} points
            </li>
          );
        })}
      </ul>
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