import styled from 'styled-components';

type ContentProps = {
  isPadded?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.base[40]};
`;

export const TitleBar = styled.div`
  padding: ${({ theme }) => `${theme.space.s6} ${theme.space.s6} ${theme.space.s2}`};
`;

export const Content = styled.div<ContentProps>`
  padding: ${({ theme, isPadded }) => (isPadded ? theme.space.s6 : 0)};
`;
