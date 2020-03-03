import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 200px;
      width: 200px;
      border-radius: 50%;
      border: 3px dashed #7159c1;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
