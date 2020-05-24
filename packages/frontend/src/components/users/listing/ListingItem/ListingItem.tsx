import React from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import UserAvatar from '../../../common/layout/Sidebar/UserAvatar/UserAvatar';
import { Box, Flex } from '../../../common/layout/base';
import { Paragraph } from '../../../common/typography';
import { Label, Select } from '../../../common/forms';
import {
  UserPreviewFragment,
  UserRole,
  UpdateOneUserMutation,
  UpdateOneUserMutationVariables,
} from '../../../../types/generated/graphql';
import { canManageUsers } from '../../../../utils/users';
import { selectUser } from '../../../../selectors/auth';
import { UPDATE_ONE_USER } from '../../../../api/mutation/users';

import * as S from './ListingItem.styles';

/* Props - <ListingItem />
============================================================================= */
type Props = {
  user: UserPreviewFragment;
};

/* <ListingItem />
============================================================================= */
const ListingItem: React.FC<Props> = ({ user }) => {
  const signedInUser = useSelector(selectUser);

  const [updateUser, { loading }] = useMutation<
    UpdateOneUserMutation,
    UpdateOneUserMutationVariables
  >(UPDATE_ONE_USER);

  return (
    <S.Wrapper isCurrentUser={user.id === signedInUser?.id}>
      <Box mb="s6">
        <UserAvatar user={user} />
      </Box>

      <Paragraph as="strong" mb="s2" fontSize="1.3rem" color="gray.0">
        {user.name}
      </Paragraph>

      {loading && 'Updating...'}

      <Flex flexDirection="column" width="100%" mt="s6">
        <Label htmlFor={`role-${user?.id}`}>Role:</Label>
        <Select
          id={`role-${user?.id}`}
          value={user.role}
          onChange={({ target }) => {
            updateUser({
              variables: {
                data: {
                  role: target?.value as UserRole,
                },
                where: {
                  id: user.id,
                },
              },
            });
          }}
          disabled={!canManageUsers(signedInUser?.role) || user.id === signedInUser?.id || loading}
        >
          <option value={UserRole.Owner}>Owner</option>
          <option value={UserRole.Editor}>Editor</option>
          <option value={UserRole.Author}>Author</option>
          <option value={UserRole.Viewer}>Viewer</option>
        </Select>
      </Flex>
    </S.Wrapper>
  );
};

export default ListingItem;
