import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { FiLogOut, FiFolder, FiEdit3, FiUsers, FiPieChart, FiSettings } from 'react-icons/fi';
import { Tooltip } from 'react-tippy';

import { Heading } from '../../typography';
import { Flex, Box } from '../base';
import { Button } from '../../misc';
import { removeAuthToken } from '../../../../cookies';
import {
  GetUserQuery,
  GetUserQueryVariables,
  GetTeamQuery,
  GetTeamQueryVariables,
} from '../../../../types/generated/graphql';
import { GET_USER, GET_TEAM } from '../../../../api/query/auth';

import * as S from './Navigation.styles';
import UserAvatar from './UserAvatar.tsx/UserAvatar';

/* <Navigation />
============================================================================= */
const Navigation: React.FunctionComponent = () => {
  const { data: userData } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER);
  const { data: teamData } = useQuery<GetTeamQuery, GetTeamQueryVariables>(GET_TEAM);
  const router = useRouter();

  const user = userData?.getUser;
  const team = teamData?.getTeam;

  if (user && team) {
    return (
      <S.Wrapper>
        <Flex alignItems="center" justifyContent="space-between" p="s6" mb="s4">
          <Flex alignItems="center">
            <UserAvatar name={user.name} src={user.image_72} />
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
                removeAuthToken();
                router.push('/');
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
            <Link href="/posts" passHref>
              <S.NavLink>
                <Box mr="s4">
                  <FiEdit3 size={20} />
                </Box>
                <span>Posts</span>
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

        <Box pt="s4" px="s4">
          <Flex alignItems="center" justifyContent="space-between" mb="s4">
            <Heading as="h4" mb={0} color="base.20" fontWeight="normal">
              Latest posts
            </Heading>

            <Link href="/posts" passHref>
              <S.ShowMoreLink>Show more</S.ShowMoreLink>
            </Link>
          </Flex>

          <Link href="/" passHref>
            <S.PostWrapper>
              <S.PostTitle>Post title</S.PostTitle>
              <S.PostMeta>
                <span>Jozef Hruška</span>, 14:34 8. 3. 2019
              </S.PostMeta>
            </S.PostWrapper>
          </Link>
        </Box>
      </S.Wrapper>
    );
  }

  return null;
};

export default Navigation;
