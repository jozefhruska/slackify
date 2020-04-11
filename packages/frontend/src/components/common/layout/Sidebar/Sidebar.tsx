import React from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowRight, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

import { User } from '../../../../types/generated/graphql';
import { selectIsSidebarOpen } from '../../../../selectors/ui';
import { CloseSidebar } from '../../../../actions/ui';
import { Box, Flex } from '../base';
import { Button } from '../../misc';
import { Heading } from '../../typography';
import UserAvatar from './UserAvatar/UserAvatar';
import RecentComponents from './RecentComponents/RecentComponents';
import { removeAuthToken } from '../../../../cookies';
import { SignOut } from '../../../../actions/auth';

import * as S from './Sidebar.styles';

/* Props - <Sidebar />
============================================================================= */
type Props = {
  user: User;
};

/* <Sidebar />
============================================================================= */
const Sidebar: React.FC<Props> = ({ user }) => {
  const isOpen = useSelector(selectIsSidebarOpen);
  const dispatch = useDispatch<Dispatch<CloseSidebar | SignOut>>();

  if (!user) {
    return null;
  }

  return (
    <S.Wrapper isOpen={isOpen}>
      <Box>
        <Box mt="s8" px="s6">
          <Flex justifyContent="space-between" mb="s6">
            <Heading as="h3" mb={0}>
              My profile
            </Heading>

            <Link href="/" passHref>
              <S.SignOutLink
                onClick={() => {
                  /* Clear auth token from cookies */
                  removeAuthToken();

                  /* Clear user from local storage */
                  dispatch({ type: '[AUTH] SIGN_OUT' });
                }}
              >
                <span>
                  <FiLogOut />
                </span>
                Sign out{' '}
              </S.SignOutLink>
            </Link>
          </Flex>

          <Flex flexDirection="column" alignItems="center">
            <UserAvatar user={user} />

            <Flex flexDirection="column" alignItems="center" mt="s6">
              <S.UserName>{user.name}</S.UserName>
              <span>{user.team?.name}</span>
            </Flex>
          </Flex>
        </Box>

        <S.Divider />

        <Box px="s6">
          <Heading as="h3" mb="s6">
            Recently updated components
          </Heading>

          <RecentComponents user={user} />
        </Box>
      </Box>

      <Box display={['block', null, null, null, 'none']} p="s6">
        <Button
          onClick={() => {
            dispatch({ type: '[UI] CLOSE_SIDEBAR' });
          }}
          icon={<FiArrowRight />}
          width="100%"
        >
          Hide sidebar
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default Sidebar;
