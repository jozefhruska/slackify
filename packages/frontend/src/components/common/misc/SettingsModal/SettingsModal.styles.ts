import styled from 'styled-components';

export const TokenWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.space.s4};
  word-break: break-all;
  background: ${({ theme }) => theme.colors.gray[9]};
  border-radius: ${({ theme }) => theme.radii.medium};
  box-sizing: border-box;
`;
