// Importando as bibliotecas necessárias
import React, { useState } from "react";
import styled from "styled-components";

// Definindo estilos para os componentes usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  width: 100%;
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 20px;
`;
const ExpenseBox = styled.div`
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  padding: 15px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 135px;
  & span {
    color: ${(props) => (props.isIncome ? "green" : "red")};
    font-weight: bold;
    font-size: 20px;
  }
`;
const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;
const AddTransaction = styled.div`
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
const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: ${(props) => (props.isAddTxnVisible ? "flex" : "none")};
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;
const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

// Componente funcional que lida com a adição de transações
const AddTransactionView = (props) => {
  // Estados locais para a quantia, descrição e tipo da transação
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("EXPENSE");

  return (
    <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
      {/* Entrada para a quantia */}
      <input
        placeholder="Quantia"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {/* Entrada para a descrição */}
      <input
        placeholder="Descrição"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {/* Seleção de tipo de transação (despesa ou renda) */}
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Despesa</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Renda</label> {}
      </RadioBox>

      {/* Botão para adicionar a transação */}
      <AddTransaction
        onClick={() =>
          props.addTransaction({
            id: Date.now(),
            amount: Number(amount),
            desc,
            type
          })
        }
      >
        Adicionar transação
      </AddTransaction>
    </AddTransactionContainer>
  );
};

// Componente funcional para a visão geral
const OverViewComponent = (props) => {
  // Estado local para controlar a visibilidade do formulário de adição de transação
  const [isAddTxnVisible, toggleAddTXn] = useState(false);
  return (
    <Container>
      {/* Caixa de saldo */}
      <BalanceBox>
        Saldo: R${props.income - props.expense}
        {/* Botão para alternar a visibilidade do formulário de adição */}
        <AddTransaction onClick={() => toggleAddTXn((isVisible) => !isVisible)}>
          {isAddTxnVisible ? "-" : "+"}
        </AddTransaction>
      </BalanceBox>
      {/* Renderiza o formulário de adição se a visibilidade estiver ativada */}
      {isAddTxnVisible && (
      {isAddTxnVisible && (
        <AddTransactionView
          isAddTxnVisible={isAddTxnVisible}
          addTransaction={(payload) => {
            props.addTransaction(payload);
            toggleAddTXn((isVisible) => !isVisible);
          }}
        />
      )}
      {/* Containers para despesa e renda */}
      <ExpenseContainer>
        <ExpenseBox>
          Despesa<span>R${props.expense}</span>
        </ExpenseBox>
        <ExpenseBox isIncome={true}>
          Renda<span>R${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

// Exporta o componente de visão geral
export default OverViewComponent;
