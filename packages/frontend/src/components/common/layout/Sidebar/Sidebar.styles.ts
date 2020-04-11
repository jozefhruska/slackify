import styled from 'styled-components';

type WrapperProps = {
  isOpen: boolean;
};

export const Wrapper = styled.nav<WrapperProps>`
  transition: transform 0.3s ease-out;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 400;
  width: 100%;
  top: 5.5rem;
  right: 0;
  height: calc(100vh - 5.5rem);
  background: ${({ theme }) => theme.colors.gray[9]};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 26rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    transform: none;
  }
`;

export const SignOutLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin-right: ${({ theme }) => theme.space.s2};
  }
`;

export const UserName = styled.div`
  margin-bottom: ${({ theme }) => theme.space.s2};
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray[0]};
`;

export const Divider = styled.div`
  display: block;
  height: 1px;
  margin: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
`;
