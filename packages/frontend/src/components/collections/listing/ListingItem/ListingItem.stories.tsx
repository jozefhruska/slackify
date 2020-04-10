import React from 'react';

import ListingItem from './ListingItem';
import { Collection, ComponentType } from '../../../../types/generated/graphql';
import { Box } from '../../../common/layout/base';

const collection: Collection = {
  id: 'test-id',
  type: ComponentType['PlainText'],
  name: 'Collection #1',
  description: 'Description of this collection.',
  team: null,
  components: null,
};

export default {
  component: ListingItem,
  title: 'Collections/Listing/ListingItem',
};

export const normal = () => (
  <Box maxWidth="440px" p="s6">
    <ListingItem collection={collection} />
  </Box>
);
