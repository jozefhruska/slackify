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
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 100vh;
  background: ${({ theme }) => theme.colors.base[40]};
  box-shadow: ${({ theme }) => theme.shadows.box.large()};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 360px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    transform: none;
  }
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0 ${({ theme }) => theme.space.s6};
  list-style: none;
`;

export const NavItem = styled.li`
  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.s3};
  }
`;

export const NavLink = styled.a<NavLinkProps>`
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.small};
  color: ${({ theme }) => theme.colors.base[20]};
  text-decoration: none;

  :focus,
  :hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.base[30]};
    box-shadow: ${({ theme }) => theme.shadows.box.medium()};
    color: ${({ theme }) => theme.colors.base[10]};
    outline: none;
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.colors.success} !important;
      box-shadow: ${theme.shadows.box.medium(theme.colors.success)} !important;
      color: ${theme.colors.base[10]} !important;
    `};
`;

export const Divider = styled.div`
  display: block;
  height: 1px;
  margin: ${({ theme }) => theme.space.s4};
  background: ${({ theme }) => theme.colors.base[30]};
`;

export const ShowMoreLink = styled.a`
  font-size: 0.8rem;
`;

export const ComponentTitle = styled.div`
  transition: color 0.2s ease-out;
  padding-bottom: ${({ theme }) => theme.space.s2};
  font-weight: bold;
`;

export const ComponentMeta = styled.div`
  font-size: 0.8rem;

  span {
    font-style: italic;
  }
`;

export const ComponentWrapper = styled.a`
  transition: box-shadow 0.2s ease-out;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.s4};
  border-radius: ${({ theme }) => theme.radii.small};
  background: ${({ theme }) => theme.colors.base[50]};

  :not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space.s3};
  }

  :focus,
  :hover {
    box-shadow: ${({ theme }) => theme.shadows.box.medium()};

    ${ComponentMeta} {
      color: ${({ theme }) => theme.colors.base[20]};
    }
  }
`;

export const MenuToggle = styled(Button)`
  position: fixed;
  bottom: ${({ theme }) => theme.space.s4};
  left: ${({ theme }) => theme.space.s4};

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    display: none;
  }
`;
