import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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

    &:first-child,
    &:last-child {
      width: 3%;
    }

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

    > p {
      width: 50%;
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
  margin-top: 1%;

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

  button#next {
    margin-left: 90%;
  }

  button#thisDisable {
    opacity: 0.5;
    cursor: default;
  }
`;
