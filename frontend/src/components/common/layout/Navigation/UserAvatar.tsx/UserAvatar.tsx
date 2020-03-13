import React from 'react';

import { User } from '../../../../../types/generated/graphql';

import * as S from './UserAvatar.styles';

/* Props - <UserAvatar />
============================================================================= */
type Props = {
  name: User['name'];
  src: User['image_72'];
};

/* <UserAvatar />
============================================================================= */
const UserAvatar: React.FunctionComponent<Props> = ({ name, src }) => {
  if (src) {
    return (
      <S.ImageWrapper>
        <img src={src} alt="user_avatar" />
      </S.ImageWrapper>
    );
  }

  if (name) {
    return <S.Wrapper>{name.substring(0, 2).toUpperCase()}</S.Wrapper>;
  }

  return null;
};

/* Default props - <UserAvatar />
============================================================================= */
UserAvatar.defaultProps = {};

export default UserAvatar;
