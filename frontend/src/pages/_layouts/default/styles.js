import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #f5f5f5;

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

    button#back {
      color: #000;
      background: #cccccc;
    }
  }
`;
