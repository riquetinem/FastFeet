import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 1px 1px #ddd;
  margin-bottom: 34px;

  position: relative;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 30px;
    }

    a {
      font-weight: bold;
      color: #999999;
      margin-right: 15px;
      transition: color 0.3s;

      &:hover {
        color: #444444;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    button {
      display: block;
      border: none;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
      background: #f5f5f5;
    }
  }
`;
