import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../../selectors/auth';

import * as S from './UserAvatar.styles';

/* <UserAvatar />
============================================================================= */
const UserAvatar: React.FunctionComponent = () => {
  const user = useSelector(selectUser);

  const image = user?.image_72;
  const name = user?.name;

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
