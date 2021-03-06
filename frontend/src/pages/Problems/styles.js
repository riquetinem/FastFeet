import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 42px;
    margin-left: 10%;
    font-size: 24px;
  }
`;

export const Content = styled.table`
  width: 80%;
  align-self: center;

  h1 {
    display: flex;
    position: absolute;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 75%;
    margin-top: 2%;
    color: #999;
  }

  th {
    width: 10%;
    color: #444;
    text-align: left;
    padding: 8px;
    font-size: 16px;

    &:last-child {
      text-align: center;
    }
  }

  td {
    padding: 8px;
    border-bottom: 1px;
    color: #666;
    font-size: 16px;

    &:last-child {
      text-align: center;
    }
  }
`;

export const PageButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10%;
  width: 80%;
  margin-top: 1%;

  button {
    margin-right: 30px;
    display: flex;
    justify-content: center;
    width: 50px;
    height: 36px;
    border-radius: 4px;
    background: #7519c1;
    color: #fff;
    font-weight: bold;
  }

  button#next {
    margin-left: 90%;
  }

  button#thisDisable {
    opacity: 0.5;
    cursor: default;
  }
`;
