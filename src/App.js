// App.js
import React, { useState } from "react";

const CorporationTaxCalculator = () => {
  const [customerId, setCustomerId] = useState("");
  const [baseTariff, setBaseTariff] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [totalTax, setTotalTax] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [billAfterDiscount, setBillAfterDiscount] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  // Calculate taxes dynamically
  const calculateTotalTax = (tariff) => {
    const base = parseFloat(tariff) || 0;
    const houseTax = 0.10 * base;
    const drainageTax = 0.06 * (base + houseTax);
    const maintenanceTax = 0.05 * base;
    const total = base + houseTax + drainageTax + maintenanceTax;

    setTotalTax(total);
  };

  // Check discount based on total tax
  const applyDiscount = () => {
    let discountPercent = 0;

    if (totalTax >= 100 && totalTax <= 4000) discountPercent = 5;
    else if (totalTax >= 4001 && totalTax <= 5000) discountPercent = 10;
    else if (totalTax >= 5001 && totalTax <= 6000) discountPercent = 12;
    else if (totalTax >= 6001 && totalTax <= 7000) discountPercent = 14;

    const discount = (discountPercent / 100) * totalTax;
    setDiscountAmount(discount);
    setBillAfterDiscount(totalTax - discount);
  };

  // Check late payment fine
  const applyLateFee = () => {
    const payment = new Date(paymentDate);
    const due = new Date(dueDate);
    const daysLate = Math.floor((payment - due) / (1000 * 60 * 60 * 24));

    let finePercent = 0;
    if (daysLate < 30) finePercent = 10;
    else if (daysLate >= 31 && daysLate <= 60) finePercent = 15;
    else if (daysLate > 60) finePercent = 25;

    const fineAmount = (finePercent / 100) * (totalTax - discountAmount);
    setLateFee(fineAmount);
    setTotalBill(totalTax - discountAmount + fineAmount);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>Corporation Tax Bill Calculator</h2>

      <label>Customer ID:</label>
      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <label>Base Tariff:</label>
      <input
        type="number"
        value={baseTariff}
        onChange={(e) => {
          setBaseTariff(e.target.value);
          calculateTotalTax(e.target.value);
        }}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <label>Advance Payment:</label>
      <input
        type="number"
        value={advancePayment}
        onChange={(e) => setAdvancePayment(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <label>Date of Payment:</label>
      <input
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <label>Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <h3>Total Tax: {totalTax.toFixed(2)}</h3>

      <button onClick={applyDiscount} style={{ marginRight: "10px" }}>
        Check Discount
      </button>
      {discountAmount > 0 && (
        <p>
          Discount: {discountAmount.toFixed(2)}, Bill after discount:{" "}
          {billAfterDiscount.toFixed(2)}
        </p>
      )}

      <button onClick={applyLateFee} style={{ marginTop: "10px" }}>
        Check Payment
      </button>
      {totalBill > 0 && (
        <p>
          Late Fee: {lateFee.toFixed(2)}, Total Bill to be Paid:{" "}
          {totalBill.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default CorporationTaxCalculator;
