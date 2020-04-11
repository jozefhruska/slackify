import styled from 'styled-components';

import { Box } from '../base';

type ContentProps = {
  isPadded?: boolean;
};

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme }) => theme.colors.gray[8]};
`;

export const TitleBar = styled.div`
  padding: ${({ theme }) => `${theme.space.s6} ${theme.space.s6} 0`};
`;

export const Content = styled.div<ContentProps>`
  padding: ${({ theme, isPadded }) => (isPadded ? theme.space.s6 : 0)};
`;
