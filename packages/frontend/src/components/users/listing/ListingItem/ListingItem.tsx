import React from 'react';

import UserAvatar from '../../../common/layout/Sidebar/UserAvatar/UserAvatar';
import { Box, Flex } from '../../../common/layout/base';
import { Heading } from '../../../common/typography';
import { Label, Select } from '../../../common/forms';
import { UserPreviewFragment } from '../../../../types/generated/graphql';

import * as S from './ListingItem.styles';

/* Props - <ListingItem />
============================================================================= */
type Props = {
  user: UserPreviewFragment;
};

/* <ListingItem />
============================================================================= */
const ListingItem: React.FC<Props> = ({ user }) => {
  return (
    <S.Wrapper>
      <Box mb="s6">
        <UserAvatar user={user} />
      </Box>

      <Heading as="h2" mb="s2">
        {user.name}
      </Heading>

      <Flex flexDirection="column" width="100%" mt="s6">
        <Label>Change role:</Label>
        <Select>
          <option value="AUTHOR">Author</option>
        </Select>
      </Flex>
    </S.Wrapper>
  );
};

export default ListingItem;
