import styled from 'styled-components';

export const Content = styled.div`
  margin: 50px auto;
  width: 70%;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    align-items: center;

    div#first-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      width: 100%;

      button {
        margin-right: 16px;
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

      button#back {
        color: #000;
        background: #cccccc;
      }
    }

    ul#nav-buttons {
      list-style: none;
      display: flex;
      flex-direction: row;
    }

    label {
      align-self: flex-start;
      font-weight: bold;
      color: #222222;
      font-size: 16px;
      margin-bottom: 10px;
      margin-top: 20px;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: #f5f5f5;
      border-radius: 4px;
      height: 44px;
      padding: 0 20px;
      color: #222222;
      width: 100%;
      font-size: 18px;

      &::placeholder {
        color: #999999;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin-bottom: 15px;
      font-weight: bold;
    }
  }
`;
