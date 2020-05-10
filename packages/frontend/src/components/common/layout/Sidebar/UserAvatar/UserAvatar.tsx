import React from 'react';

import { User } from '../../../../../types/generated/graphql';

import * as S from './UserAvatar.styles';

/* Props - <UserAvatar />
============================================================================= */
type Props = {
  user: Pick<User, 'name' | 'avatar'>;
};

/* <UserAvatar />
============================================================================= */
const UserAvatar: React.FC<Props> = ({ user }) => {
  const image = user?.avatar;
  const name = user?.name;

  if (!image && !name) {
    return null;
  }

  if (image) {
    return (
      <S.BorderRing>
        <S.Wrapper>
          <img src={image} alt="user_avatar" />
        </S.Wrapper>
      </S.BorderRing>
    );
  }

  return (
    <S.BorderRing>
      <S.Wrapper>{name.substring(0, 2).toUpperCase()}</S.Wrapper>
    </S.BorderRing>
  );
};

export default UserAvatar;
