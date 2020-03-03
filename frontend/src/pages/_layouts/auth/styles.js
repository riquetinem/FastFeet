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
