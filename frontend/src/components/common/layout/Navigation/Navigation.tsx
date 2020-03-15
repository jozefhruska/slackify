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
} from 'react-icons/fi';
import { Tooltip } from 'react-tippy';

import { Heading } from '../../typography';
import { Flex, Box } from '../base';
import { Button } from '../../misc';
import { removeAuthToken } from '../../../../cookies';
import { UserQuery, UserQueryVariables } from '../../../../types/generated/graphql';
import UserAvatar from './UserAvatar.tsx/UserAvatar';
import { USER } from '../../../../schema/auth';

import * as S from './Navigation.styles';

/* <Navigation />
============================================================================= */
const Navigation: React.FunctionComponent = () => {
  const { data } = useQuery<UserQuery, UserQueryVariables>(USER);
  const [isOpen, setOpen] = useState<boolean>(false);
  const client = useApolloClient();

  const user = data?.user;
  const team = user?.team;

  if (user && team) {
    return (
      <>
        <S.Wrapper isOpen={isOpen}>
          <Flex alignItems="center" justifyContent="space-between" p="s6" mb="s4">
            <Flex alignItems="center">
              <UserAvatar />

              <Box ml="s4">
                <Heading as="h3" mb="s1">
                  {user.name}
                </Heading>
                <span>{team.name}</span>
              </Box>
            </Flex>

            <Tooltip title="Sign out" animation="fade">
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
              />
            </Tooltip>
          </Flex>

          <S.NavList>
            <S.NavItem>
              <Link href="/collections" passHref>
                <S.NavLink isActive={true}>
                  <Box mr="s4">
                    <FiFolder size={20} />
                  </Box>
                  <span>Collections</span>
                </S.NavLink>
              </Link>
            </S.NavItem>

            <S.NavItem>
              <Link href="/components" passHref>
                <S.NavLink>
                  <Box mr="s4">
                    <FiEdit3 size={20} />
                  </Box>
                  <span>Components</span>
                </S.NavLink>
              </Link>
            </S.NavItem>

            <S.NavItem>
              <Link href="/users" passHref>
                <S.NavLink>
                  <Box mr="s4">
                    <FiUsers size={20} />
                  </Box>
                  <span>Users</span>
                </S.NavLink>
              </Link>
            </S.NavItem>

            <S.NavItem>
              <Link href="/statistics" passHref>
                <S.NavLink>
                  <Box mr="s4">
                    <FiPieChart size={20} />
                  </Box>
                  <span>Statistics</span>
                </S.NavLink>
              </Link>
            </S.NavItem>
          </S.NavList>

          <S.Divider />

          <S.NavList>
            <S.NavItem>
              <Link href="/settings" passHref>
                <S.NavLink>
                  <Box mr="s4">
                    <FiSettings size={20} />
                  </Box>
                  <span>Settings</span>
                </S.NavLink>
              </Link>
            </S.NavItem>
          </S.NavList>

          <S.Divider />

          <Box display={['none', null, null, null, null, 'block']} pt="s4" px="s4">
            <Flex alignItems="center" justifyContent="space-between" mb="s4">
              <Heading as="h4" mb={0} color="base.20" fontWeight="normal">
                Latest components
              </Heading>

              <Link href="/components" passHref>
                <S.ShowMoreLink>Show more</S.ShowMoreLink>
              </Link>
            </Flex>

            <Link href="/" passHref>
              <S.ComponentWrapper>
                <S.ComponentTitle>Component title</S.ComponentTitle>
                <S.ComponentMeta>
                  <span>Jozef Hruška</span>, 14:34 8. 3. 2019
                </S.ComponentMeta>
              </S.ComponentWrapper>
            </Link>
          </Box>

          <Flex
            display={['block', null, null, null, null, 'none']}
            flexDirection="column"
            mt="auto"
            p="s4"
          >
            <Button
              onClick={() => {
                setOpen(!isOpen);
              }}
              icon={<FiArrowLeft />}
            >
              Hide menu
            </Button>
          </Flex>
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
