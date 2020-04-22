import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};
`;

export const Tag = styled.span`
  padding: ${({ theme }) => theme.space.s2} ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.medium};
  color: ${({ theme }) => theme.colors.gray[0]};
  background: ${({ theme }) => theme.colors.gray[7]};
`;
