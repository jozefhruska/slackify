import styled from 'styled-components';

export const RCPreview = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.s4};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};

  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.s4};
  }
`;

export const RCPreviewInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray[4]};
`;
