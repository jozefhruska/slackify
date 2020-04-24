import styled, { css } from 'styled-components';

type WrapperProps = {
  border?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};

  ${({ border, theme }) =>
    border &&
    css`
      border: 1px solid ${theme.colors.gray[3]};
    `};
`;

export const Tag = styled.span`
  padding: ${({ theme }) => theme.space.s2} ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.medium};
  color: ${({ theme }) => theme.colors.gray[0]};
  background: ${({ theme }) => theme.colors.gray[7]};
`;
