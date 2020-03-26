import React from 'react';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import { FiLogOut } from 'react-icons/fi';

import { Box } from '../base';
import { UserQuery, UserQueryVariables } from '../../../../types/generated/graphql';
import { USER } from '../../../../schema/auth';
import UserAvatar from './UserAvatar/UserAvatar';
import { removeAuthToken } from '../../../../cookies';
import { Paragraph } from '../../typography';
import { Button } from '../../misc';

import * as S from './Header.styles';

/* <Header />
============================================================================= */
const Header: React.FC = () => {
  const { data } = useQuery<UserQuery, UserQueryVariables>(USER);
  const client = useApolloClient();

  const user = data?.user;
  const team = user?.team;

  return (
    <>
      <S.Wrapper>
        <S.Logo>
          Slackify
          <S.VersionBadge>PRE-ALPHA</S.VersionBadge>
        </S.Logo>

        <S.UserArea>
          <UserAvatar />

          <Box mx="s6">
            <Paragraph mb="s1" fontWeight="bold" color="gray.0">
              {user.name}
            </Paragraph>
            <span>{team.name}</span>
          </Box>

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
          >
            Sign out
          </Button>
        </S.UserArea>
      </S.Wrapper>

      <S.Dummy />
    </>
  );
};

export default Header;
