import React from "react";

export default function CustomerCard({ customer }) {
  return (
    <div key={customer.customerId} className="customer-card">
      <img src={`images/${customer.customerId}`} alt={customer.name} />
      <div>
        <h3>{customer.name}</h3>
        <p>{customer.amount}</p>
        <p>{customer.date}</p>
      </div>
    </div>
  );
}
