import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;
  height: 5.5rem;
  padding: 0 ${({ theme }) => theme.space.s4};
  background: ${({ theme }) => theme.colors.gray[9]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[7]};

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 0 ${({ theme }) => theme.space.s8};
  }
`;

export const VersionBadge = styled.span`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: block;
    transition: color 0.2s ease-out;
    padding: ${({ theme }) => theme.space.s1} ${({ theme }) => theme.space.s2};
    margin-left: ${({ theme }) => theme.space.s4};
    font-size: 0.7rem;
    text-transform: uppercase;
    background: ${({ theme }) => theme.colors.brand};
    border-radius: ${({ theme }) => theme.radii.small};
  }
`;

export const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  color: ${({ theme }) => theme.colors.gray[1]};

  ${VersionBadge} {
    color: ${({ theme }) => theme.colors.gray[1]};
  }

  :hover {
    color: ${({ theme }) => theme.colors.gray[0]};

    ${VersionBadge} {
      color: ${({ theme }) => theme.colors.gray[0]};
    }
  }
`;

export const UserArea = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: flex;
    align-items: center;
  }
`;

export const Dummy = styled.div`
  display: block;
  width: 100%;
  height: 5.5rem;
`;
