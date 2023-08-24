// Importando as bibliotecas necessárias
import styled from "styled-components";
import React, { useEffect, useState, useCallback } from "react";

// Definindo estilos para os componentes usando styled-components
const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

const Cell = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

// Componente funcional que exibe uma célula de transação
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      {/* Exibição da descrição e quantia da transação */}
      <span>{props.payload?.desc}</span>
      <span>R${props.payload?.amount}</span>
    </Cell>
  );
};

// Componente funcional para exibir a lista de transações
const TransactionsComponent = (props) => {
  // Estado local para controlar o texto de pesquisa
  const [searchText, updateSearchText] = useState("");
  // Estado local para armazenar as transações filtradas
  const [filteredTransaction, updateTxn] = useState(props.transactions);

  // Função de filtro de dados utilizando useCallback para otimização de performance
  const filterData = useCallback(
    (searchText) => {
      if (!searchText || !searchText.trim().length) {
        // Mostrar todas as transações se a caixa de pesquisa estiver vazia
        updateTxn(props.transactions);
        return;
      }
      // Filtrar as transações baseado no texto de pesquisa
      let txn = props.transactions.filter((payload) =>
        payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      updateTxn(txn);
    },
    [props.transactions]
  );

  // Efeito que executa o filtro de dados quando o texto de pesquisa é alterado
  useEffect(() => {
    filterData(searchText);
  }, [filterData, searchText]);

  return (
    <Container>
      {/* Título do componente */}
      Transações
      {/* Caixa de entrada para realizar a pesquisa */}
      <input
        placeholder="Procurar"
        onChange={(e) => {
          const inputValue = e.target.value;
          updateSearchText(inputValue);
          filterData(inputValue);
        }}
      />
      {/* Mapear e renderizar as transações filtradas */}
      {filteredTransaction.map((payload) => (
        <TransactionCell key={payload.id} payload={payload} />
      ))}
    </Container>
  );
};

// Exportar o componente de lista de transações
export default TransactionsComponent;
