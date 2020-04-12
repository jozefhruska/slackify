import styled, { css } from 'styled-components';
import { PopperProps } from 'react-popper';

const resolveChildButtonWrapperStyles = (placement: PopperProps['placement']) => {
  switch (placement) {
    case 'left': {
      return css`
        margin-right: ${({ theme }) => theme.space.s3};
      `;
    }

    case 'right': {
      return css`
        margin-left: ${({ theme }) => theme.space.s3};
      `;
    }

    case 'bottom': {
      return css`
        margin-top: ${({ theme }) => theme.space.s3};
      `;
    }

    default:
    case 'top': {
      return css`
        margin-bottom: ${({ theme }) => theme.space.s3};
      `;
    }
  }
};

export const PopperWrapper = styled.div<{ 'data-placement': PopperProps['placement'] }>`
  display: flex;
  flex-direction: ${({ 'data-placement': placement }) =>
    placement == 'left' || placement == 'right' ? 'row' : 'column'};
`;

export const ChildButtonWrapper = styled.div<{ 'data-placement': PopperProps['placement'] }>`
  ${(props) => resolveChildButtonWrapperStyles(props?.['data-placement'])};
`;
