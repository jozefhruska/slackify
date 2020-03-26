import React from 'react';
import { useQuery } from '@apollo/client';

import { UserQuery, UserQueryVariables } from '../../../../../types/generated/graphql';
import { USER } from '../../../../../schema/auth';

import * as S from './UserAvatar.styles';

/* <UserAvatar />
============================================================================= */
const UserAvatar: React.FunctionComponent = () => {
  const { data } = useQuery<UserQuery, UserQueryVariables>(USER);

  const image = data?.user?.image_72;
  const name = data?.user?.name;

  if (image) {
    return (
      <S.ImageWrapper>
        <img src={image} alt="user_avatar" />
      </S.ImageWrapper>
    );
  }

  if (name) {
    return <S.Wrapper>{name.substring(0, 2).toUpperCase()}</S.Wrapper>;
  }

  return null;
};

export default UserAvatar;
