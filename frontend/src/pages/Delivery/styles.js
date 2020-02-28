import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;

    div#first-row {
      margin-left: -10%;
    }

    ul#nav-buttons {
      list-style: none;
      display: flex;
      flex-direction: row;
    }

    /*TODO: Arrumar os strong, colocar labels mais bonitas e que nao fique desentralizadas

    e arrumar tbm o layout pq ta bem estranho
   */
    strong {
      margin-bottom: 10px;
      margin-top: 10px;
      margin-left: -58%;
    }

    strong#complemento {
      margin-left: -55%;
    }

    strong#numero {
      margin-left: -57%;
    }

    span {
      color: #fb4142;
      margin-bottom: 20px;
      margin-top: 10px;
      font-weight: bold;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      height: 44px;
      padding: 0 20px;
      color: #000;
      margin: 0 0 10px;
      width: 60%;
      font-size: 18px;
    }

    div.endereco {
      input#cep {
        width: 130px;
      }

      button {
        margin-left: 10px;
        background: #3b9eff;
        height: 44px;
        width: 100px;
        color: #fff;
      }
    }
  }
`;
