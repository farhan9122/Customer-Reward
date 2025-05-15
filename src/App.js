import React, { useEffect, useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Filter from './components/Filter';
import { fetchTransactionData } from './utils/api';
import { getLastThreeMonths } from './utils/dateUtils';
import { logEvent } from './utils/logger';
import { Title,Container } from './styles/StyledComponents';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filteredMonth, setFilteredMonth] = useState('');
  const [filteredYear, setFilteredYear] = useState('2025');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        logEvent('Fetching transaction data...');
        const data = await fetchTransactionData();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load transactions.');
        setLoading(false);
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
    logEvent(`Selected Customer: ${customerId}`);
  };

  const handleBackToList = () => {
    setSelectedCustomer(null);
  };

  const handleMonthChange = (month) => {
    setFilteredMonth(month);
  };

  const handleYearChange = (year) => {
    setFilteredYear(year);
  };

  const handleResetFilters = () => {
    const [defaultMonth, defaultYear] = getLastThreeMonths()[0].split(' ');
    setFilteredMonth(defaultMonth);
    setFilteredYear(defaultYear);
  };

  if (loading) return <div style={{ padding: '2rem' }}>🔄 Loading transactions...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <Container>
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <Title>🛍️ Customer Rewards Dashboard</Title>

      <Filter
        selectedMonth={filteredMonth}
        selectedYear={filteredYear}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        onReset={handleResetFilters}
      />

      {!selectedCustomer ? (
        <CustomerList
          transactions={transactions}
          onSelectCustomer={handleCustomerSelect}
          month={filteredMonth}
          year={filteredYear}
        />
      ) : (
        <CustomerDetails
          transactions={transactions}
          customerId={selectedCustomer}
          month={filteredMonth}
          year={filteredYear}
          onBack={handleBackToList}
        />
      )}
    </div>
    </Container>
  );
};

export default App;
