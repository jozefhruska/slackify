import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};
`;

export const MetaTitle = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.space.s2};
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray[4]};
`;
