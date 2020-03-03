import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
`;

export const Content = styled.div`
  background: #fff;
  height: 425px;
  width: 360px;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 10px 10px rgba(2, 2, 2, 0.4);

  img {
    height: 50px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      font-weight: bold;
      align-self: flex-start;
      margin-bottom: 10px;
      margin-top: 10px;
      color: #222222;
    }

    input {
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #222222;
      margin: 0 0 5px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin-bottom: 10px;
      font-weight: bold;
    }

    button {
      margin-top: 10px;
      height: 44px;
      background: #7159c1;
      color: #fff;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.3, '#7159c1')};
      }
    }
  }
`;
