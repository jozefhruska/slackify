import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import {
  FiLogOut,
  FiFolder,
  FiEdit3,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiArrowLeft,
  FiMenu,
  FiGrid,
} from 'react-icons/fi';

import { Flex, Box, Grid } from '../base';
import { Button } from '../../misc';
import { removeAuthToken } from '../../../../cookies';
import { UserQuery, UserQueryVariables } from '../../../../types/generated/graphql';
import { USER } from '../../../../schema/auth';

import * as S from './Navigation.styles';
import UserAvatar from '../Header/UserAvatar/UserAvatar';
import { Paragraph } from '../../typography';
import ActiveLink from '../../misc/ActiveLink/ActiveLink';

/* <Navigation />
============================================================================= */
const Navigation: React.FunctionComponent = () => {
  const { data } = useQuery<UserQuery, UserQueryVariables>(USER);

  const [isOpen, setOpen] = useState<boolean>(false);
  const client = useApolloClient();

  const user = data?.user;
  const team = user?.team;

  if (user) {
    return (
      <>
        <S.Wrapper isOpen={isOpen}>
          <Box>
            <S.NavList>
              <S.NavItem>
                <ActiveLink href="/">
                  {isActive => (
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
                  {isActive => (
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
                  {isActive => (
                    <Link href="/components" passHref>
                      <S.NavLink isActive={isActive}>
                        <Box mr="s4">
                          <FiEdit3 size={20} />
                        </Box>
                        <span>Components</span>
                      </S.NavLink>
                    </Link>
                  )}
                </ActiveLink>
              </S.NavItem>

              <S.NavItem>
                <ActiveLink href="/users">
                  {isActive => (
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
                  {isActive => (
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
                  {isActive => (
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

          <Box>
            <Flex display={['block', null, null, 'none']} alignItems="center" m="s6">
              <UserAvatar />

              <Box mx="s6">
                <Paragraph mb="s1" fontWeight="bold" color="gray.0">
                  {user.name}
                </Paragraph>
                <span>{team.name}</span>
              </Box>
            </Flex>

            <Grid gridTemplateColumns={['1fr 1fr', null, null, '1fr']} gridColumnGap="s4" m="s6">
              <Box display={['block', null, null, null, null, 'none']}>
                <Button
                  onClick={() => {
                    setOpen(!isOpen);
                  }}
                  icon={<FiArrowLeft />}
                  width="100%"
                >
                  Hide menu
                </Button>
              </Box>

              <Box display={['block', null, null, 'none']}>
                <Button
                  icon={<FiLogOut />}
                  onClick={() => {
                    /* Remove auth token from cookies */
                    removeAuthToken();

                    /* Remove user from local state */
                    client.writeQuery({
                      query: gql`
                        {
                          user @client
                        }
                      `,
                      data: {
                        user: null,
                      },
                    });

                    /* Remove user from cache */
                    client.cache.evict('User:' + user.id);
                  }}
                  width="100%"
                >
                  Sign out
                </Button>
              </Box>
            </Grid>
          </Box>
        </S.Wrapper>

        {!isOpen && (
          <S.MenuToggle
            onClick={() => {
              setOpen(!isOpen);
            }}
            icon={<FiMenu />}
          />
        )}
      </>
    );
  }

  return null;
};

export default Navigation;
