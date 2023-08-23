import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const HomeComponent = (props) => {
  const [transactions, updateTransaction] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  const calculateBalance = useCallback(() => {
    let exp = 0;
    let inc = 0;
    transactions.forEach((payload) => {
      if (payload.type === "EXPENSE") {
        exp += payload.amount;
      } else {
        inc += payload.amount;
      }
    });
    updateExpense(exp);
    updateIncome(inc);
  }, [transactions]);

  useEffect(() => {
    calculateBalance();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, calculateBalance]);

  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };

  return (
    <Container>
      <OverViewComponent
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />
      {transactions.length ? (
        <TransactionsComponent transactions={transactions} />
      ) : null}
    </Container>
  );
};

export default HomeComponent;
