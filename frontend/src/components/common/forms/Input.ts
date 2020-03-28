import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 0 ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.gray[6]};
  box-sizing: border-box;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[2]};

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.brand};
  }
`;
