// Importando as bibliotecas necessárias
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";

// Definindo estilos para os componentes
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

const ClearButton = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
`;

// Componente funcional que representa a página inicial
const HomeComponent = (props) => {
  // Estado local para armazenar as transações (inicializado com os dados do localStorage ou vazio)
  const [transactions, updateTransaction] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  
  // Estados locais para despesa e renda
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  // Função que calcula o saldo total a partir das transações
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

  // Efeito que é disparado quando as transações são alteradas ou quando o componente é montado
  useEffect(() => {
    calculateBalance();
    // Armazenando as transações no localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, calculateBalance]);

  // Função para adicionar uma nova transação
  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };

  // Função para limpar a lista de transações
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Container>
      {/* Componente de visão geral */}
      <OverViewComponent
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />
      {/* Renderiza o componente de lista de transações apenas se houver transações */}
      {transactions.length ? (
        <TransactionsComponent transactions={transactions} />
      ) : null}
      <ClearButton onClick={clearLocalStorage}>LIMPAR</ClearButton>
    </Container>
  );
};

// Exporta o componente da página inicial
export default HomeComponent;
