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

export const InCollectionWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-column: span 2;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    grid-column: auto;
  }
`;

export const InCollectionComponentPreview = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.space.s4};
  background: ${({ theme }) => theme.colors.gray[9]};
  border-radius: ${({ theme }) => theme.radii.medium};
`;

export const InCollectionComponentPreviewInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray[4]};
`;

export const QueryWrapper = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
  color: ${({ theme }) => theme.colors.gray[0]};
  overflow: hidden;

  ::after {
    content: 'Query';
    position: absolute;
    top: 0;
    right: 0;
    padding: ${({ theme }) => theme.space.s2} ${({ theme }) => theme.space.s4};
    background: ${({ theme }) => theme.colors.gray[3]};
    color: ${({ theme }) => theme.colors.gray[10]};
    border-bottom-left-radius: ${({ theme }) => theme.radii.medium};
  }
`;
