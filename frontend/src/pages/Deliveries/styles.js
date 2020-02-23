import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 42px;
    margin-left: 10%;
    font-size: 24px;
  }

  div#first-row {
    display: flex;
    justify-content: space-between;
    margin-left: 10%;
    margin-bottom: 30px;
    width: 80%;

    form {
      display: flex;
      align-items: center;

      border: 1px solid #dddddd;
      border-radius: 4px;
    }

    input {
      font-size: 14px;
      width: 237px;
      height: 36px;
      border: 0;
      padding: 5px;
    }

    button {
      margin-right: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 142px;
      height: 36px;
      border-radius: 4px;
      background: #7d40e7;
      color: #fff;
      font-weight: bold;
    }
  }
`;

export const Content = styled.table`
  width: 80%;
  align-self: center;

  thead th:first-child,
  thead th:last-child {
    width: 3%;
  }

  thead th:last-child,
  tbody td:last-child {
    text-align: center;
  }

  thead th {
    width: 10%;
    color: #444;
    text-align: left;
    padding: 8px;
    font-size: 16px;
  }

  tbody td {
    padding: 8px;
    border-bottom: 1px;
    color: #666;
    font-size: 16px;

    > p {
      border-radius: 16px;
      width: 40%;
      font-weight: bold;

      background: rgba(0, 0, 0, 0.1);

      /**TODO:
        Verificar o status que esta vindo do corpo da pagina e trocar aqui no styled
        para a cor certa:
        Entregue: #2CA42B
        Pendente: #C1BC35
        Cancelado: #DE3B3B
        Retirada: #4D85EE
      */
    }

    ul {
      display: flex;
      list-style: none;

      li {
        display: flex;
        align-items: center;

        img {
          align-items: center;
          border-radius: 50%;
          width: 21px;
          height: 21px;
          margin-right: 13px;
        }
      }
    }
  }
`;

export const PageButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10%;
  width: 80%;

  button {
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 36px;
    border-radius: 4px;
    background: #7519c1;
    color: #fff;
    font-weight: bold;
  }

  button#prev {
    color: red;
  }

  button#thisDisable {
    opacity: 0.5;
    cursor: default;
  }

  button#next {
    margin-left: 90%;
  }
`;
