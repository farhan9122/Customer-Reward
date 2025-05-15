import React from 'react';
import PropTypes from 'prop-types';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = [2025, 2024, 2023, 2022, 2021];

const Filter = ({ selectedMonth, selectedYear, onMonthChange, onYearChange, onReset }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>Month: </label>
      <select value={selectedMonth} onChange={e => onMonthChange(e.target.value)} style={styles.select}>
        <option value="">All</option>
        {months.map((month, idx) => (
          <option key={idx} value={month}>{month}</option>
        ))}
      </select>

      <label style={styles.label}>Year: </label>
      <select value={selectedYear} onChange={e => onYearChange(e.target.value)} style={styles.select}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      <button onClick={onReset} style={styles.button}>Reset Filters</button>
    </div>
  );
};

Filter.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.string.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  label: {
    fontWeight: 'bold'
  },
  select: {
    padding: '6px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Filter;
