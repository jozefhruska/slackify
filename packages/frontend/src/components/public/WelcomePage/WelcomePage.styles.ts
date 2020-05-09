import styled from 'styled-components';

export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const WelcomeSide = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 24rem;
    padding: ${({ theme }) => theme.space.s8} ${({ theme }) => theme.space.s12};
    background: ${({ theme }) => theme.colors.gray[9]};
  }
`;

export const WelcomeMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  max-width: 32rem;
  padding: ${({ theme }) => theme.space.s8} ${({ theme }) => theme.space.s4};
  margin: 0 auto;
  ${({ theme }) => theme.space.s12};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: ${({ theme }) => theme.space.s8} ${({ theme }) => theme.space.s8};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    align-content: flex-start;
    padding: ${({ theme }) => theme.space.s8} ${({ theme }) => theme.space.s20};
    margin: 0;
  }
`;

export const MainActionButton = styled.a`
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.radii.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.s6};
  }

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand};

    > span {
      opacity: 1;
    }
  }

  > span {
    transition: opacity 0.2s ease-out;
    opacity: 0;
  }
`;

export const VersionBadge = styled.span`
  display: block;
  transition: color 0.2s ease-out;
  padding: ${({ theme }) => theme.space.s1} ${({ theme }) => theme.space.s2};
  margin-left: ${({ theme }) => theme.space.s4};
  font-size: 0.7rem;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.brand};
  border-radius: ${({ theme }) => theme.radii.small};
`;

export const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.s10};
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
