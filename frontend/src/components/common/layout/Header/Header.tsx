import React from 'react';
import { Dispatch } from 'redux';
import { FiLogOut } from 'react-icons/fi';

import { Box } from '../base';
import UserAvatar from './UserAvatar/UserAvatar';
import { removeAuthToken } from '../../../../cookies';
import { Paragraph } from '../../typography';
import { Button } from '../../misc';
import { useDispatch } from 'react-redux';
import { SignOut } from '../../../../actions/auth';
import { User } from '../../../../types/generated/graphql';

import * as S from './Header.styles';

/* Props - <Header />
============================================================================= */
type Props = {
  user: User;
};

/* <Header />
============================================================================= */
const Header: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<SignOut>>();

  return (
    <>
      <S.Wrapper>
        <S.Logo>
          Slackify
          <S.VersionBadge>PRE-ALPHA</S.VersionBadge>
        </S.Logo>

        {user && (
          <S.UserArea>
            <UserAvatar />

            <Box mx="s6">
              <Paragraph mb="s1" fontWeight="bold" color="gray.0">
                {user?.name}
              </Paragraph>
              <span>{user?.team?.name}</span>
            </Box>

            <Button
              icon={<FiLogOut />}
              onClick={() => {
                /* Remove auth token from cookies */
                removeAuthToken();

                /* Remove user data from app state */
                dispatch({ type: '[AUTH] SIGN_OUT' });
              }}
            >
              Sign out
            </Button>
          </S.UserArea>
        )}
      </S.Wrapper>

      <S.Dummy />
    </>
  );
};

export default Header;
