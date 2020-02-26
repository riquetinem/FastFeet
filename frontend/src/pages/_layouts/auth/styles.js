import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(
    -90deg,
    ${darken(0.07, '#7159c1')},
    ${darken(0.3, '#7159c1')},
    ${darken(0.07, '#7159c1')}
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  div#component {
    background: #fff;
    height: 425px;
    width: 360px;
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px 20px;
    justify-content: center;
    border-radius: 16px;

    strong {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    img {
      height: 50px;
    }

    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;

      input {
        background: rgba(0, 0, 0, 0.1);
        border: 0;
        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        color: #fff;
        margin: 0 0 10px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
      }

      span {
        color: #fb6f91;
        align-self: flex-start;
        margin: 0 0 10px;
        font-weight: bold;
      }

      button {
        margin: 5px 0 0;
        height: 44px;
        background: #3b9eff;
        color: #fff;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.2, '#3b9eff')};
        }
      }
    }
  }
`;
