import React from 'react';
import Link from 'next/link';
import { FiFolder, FiUsers, FiPieChart, FiSettings, FiGrid, FiTag } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { Box } from '../base';
import ActiveLink from '../../misc/ActiveLink/ActiveLink';
import { selectIsNavigationOpen } from '../../../../selectors/ui';

import * as S from './Navigation.styles';

/* <Navigation />
============================================================================= */
const Navigation: React.FC = () => {
  const isOpen = useSelector(selectIsNavigationOpen);

  return (
    <>
      <S.Wrapper isOpen={isOpen}>
        <Box>
          <S.NavList>
            <S.NavItem>
              <ActiveLink href="/">
                {(isActive) => (
                  <Link href="/" passHref>
                    <S.NavLink isActive={isActive}>
                      <Box mr="s4">
                        <FiGrid size={20} />
                      </Box>
                      <span>Dashboard</span>
                    </S.NavLink>
                  </Link>
                )}
              </ActiveLink>
            </S.NavItem>

            <S.NavItem>
              <ActiveLink href="/collections">
                {(isActive) => (
                  <Link href="/collections" passHref>
                    <S.NavLink isActive={isActive}>
                      <Box mr="s4">
                        <FiFolder size={20} />
                      </Box>
                      <span>Collections</span>
                    </S.NavLink>
                  </Link>
                )}
              </ActiveLink>
            </S.NavItem>

            <S.NavItem>
              <ActiveLink href="/components">
                {(isActive) => (
                  <Link href="/components" passHref>
                    <S.NavLink isActive={isActive}>
                      <Box mr="s4">
                        <FiTag size={20} />
                      </Box>
                      <span>Components</span>
                    </S.NavLink>
                  </Link>
                )}
              </ActiveLink>
            </S.NavItem>

            <S.NavItem>
              <ActiveLink href="/users">
                {(isActive) => (
                  <Link href="/users" passHref>
                    <S.NavLink isActive={isActive}>
                      <Box mr="s4">
                        <FiUsers size={20} />
                      </Box>
                      <span>Users</span>
                    </S.NavLink>
                  </Link>
                )}
              </ActiveLink>
            </S.NavItem>

            <S.NavItem>
              <ActiveLink href="/users">
                {(isActive) => (
                  <Link href="/users" passHref>
                    <S.NavLink isActive={isActive}>
                      <Box mr="s4">
                        <FiPieChart size={20} />
                      </Box>
                      <span>Statistics</span>
                    </S.NavLink>
                  </Link>
                )}
              </ActiveLink>
            </S.NavItem>
          </S.NavList>

          <S.Divider />

          <S.NavList>
            <S.NavItem>
              <ActiveLink href="/settings">
                {(isActive) => (
                  <Link href="/settings" passHref>
                    <S.NavLink isActive={isActive}>
                      <Box mr="s4">
                        <FiSettings size={20} />
                      </Box>
                      <span>Settings</span>
                    </S.NavLink>
                  </Link>
                )}
              </ActiveLink>
            </S.NavItem>
          </S.NavList>
        </Box>
      </S.Wrapper>
    </>
  );
};

export default Navigation;
