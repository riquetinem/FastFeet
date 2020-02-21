import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  border-radius: 4px;
`;

export const Content = styled.table`
  width: 70%;
  align-items: center;

  thead th {
    color: #999;
    text-align: left;
    padding: 8px;
  }

  tbody td {
    padding: 8px;
    border-bottom: 1px;
  }
`;
