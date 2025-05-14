import React, { useState, useEffect } from "react";
import CustomerCard from "./CustomerCard";

export default function Customer() {
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    fetch("customer.json")
      .then((response) => response.json())
      .then((data) => setCustomer(data));
  }, []);

  return (
    <div className="customer-grid">
      {customers.map((customer) => (
        <CustomerCard
          customer={customer}
          key={customer.customerId}
        ></CustomerCard>
      ))}
    </div>
  );
}
