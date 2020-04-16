import styled, { css } from 'styled-components';
import { Button } from '../../misc';

type WrapperProps = {
  isOpen: boolean;
};

type NavLinkProps = {
  isActive?: boolean;
};

export const Wrapper = styled.nav<WrapperProps>`
  transition: transform 0.3s ease-out;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 400;
  width: 100%;
  top: 5.5rem;
  left: 0;
  height: calc(100vh - 5.5rem);
  background: ${({ theme }) => theme.colors.gray[9]};
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    max-width: 20rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    transform: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    max-width: 22rem;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 ${({ theme }) => theme.space.s4};
  list-style: none;

  :first-child {
    margin-top: ${({ theme }) => theme.space.s8};
  }
`;

export const NavItem = styled.li`
  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.s3};
  }
`;

export const NavLink = styled.a<NavLinkProps>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.medium};
  color: ${({ theme }) => theme.colors.gray[3]};
  text-decoration: none;

  :focus,
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.gray[8]};
    color: ${({ theme }) => theme.colors.gray[0]};
    outline: none;
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.colors.brand} !important;
      color: ${theme.colors.gray[1]} !important;
    `};
`;

export const Divider = styled.div`
  display: block;
  height: 1px;
  margin: ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[8]};
`;

export const MenuToggle = styled(Button)`
  position: fixed;
  z-index: 390;
  bottom: ${({ theme }) => theme.space.s6};
  left: ${({ theme }) => theme.space.s6};

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    display: none;
  }
`;
