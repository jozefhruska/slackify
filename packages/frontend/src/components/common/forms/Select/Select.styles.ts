import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const Select = styled.select`
  width: 100%;
  min-height: 44px;
  line-height: 44px;
  padding: 0 ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ disabled, theme }) => (disabled ? theme.colors.gray[7] : theme.colors.gray[6])};
  box-sizing: border-box;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[2]};
  appearance: none;

  :disabled {
    cursor: not-allowed;
  }

  :focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.brand};
  }

  ::-moz-focus-inner {
    border: 0;
    outline: none;
  }
`;

export const IconWrapper = styled.span<{ disabled: boolean }>`
  display: ${({ disabled }) => (disabled ? 'none' : 'block')};
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.space.s4};
  pointer-events: none;
`;
