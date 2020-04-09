import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.brand};
  color: ${({ theme }) => theme.colors.gray[0]};
  letter-spacing: 2px;
  user-select: none;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

export const BorderRing = styled.div`
  padding: ${({ theme }) => theme.space.s4};
  border: 1px solid ${({ theme }) => theme.colors.gray[7]};
  border-radius: 50%;
`;
