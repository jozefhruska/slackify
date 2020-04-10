import styled from 'styled-components';

export const Divider = styled.div`
  display: block;
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.space.s6} 0;
  background: ${({ theme }) => theme.colors.gray[7]}};
`;
