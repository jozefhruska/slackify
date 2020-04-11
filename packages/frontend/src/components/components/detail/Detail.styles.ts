import styled from 'styled-components';

export const MetaWrapper = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.space.s6};
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};
  word-break: break-all;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MetaTitle = styled.span`
  display: block;
  margin-bottom: ${({ theme }) => theme.space.s2};
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray[4]};
`;

export const InCollectionComponentPreview = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.s4};
  background: ${({ theme }) => theme.colors.gray[9]};
  border-radius: ${({ theme }) => theme.radii.medium};

  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.s4};
  }
`;

export const InCollectionComponentPreviewInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray[4]};
`;
