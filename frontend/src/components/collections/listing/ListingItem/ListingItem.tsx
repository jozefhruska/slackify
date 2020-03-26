import React from 'react';

import {
  Collection,
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables,
  GetCollectionsListingQuery,
  GetCollectionsListingQueryVariables,
} from '../../../../types/generated/graphql';
import { Heading, Paragraph } from '../../../common/typography';
import { Grid, Box } from '../../../common/layout/base';
import { Button } from '../../../common/misc';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import { DELETE_COLLECTION } from '../../../../api/mutation/collections';
import { GET_COLLECTIONS_LISTING } from '../../../../api/query/collections';

import * as S from './ListingItem.styles';

/* Props - <ListingItem />
============================================================================= */
type Props = {
  collection: Omit<Collection, 'team' | 'components'>;
};

/* <ListingItem />
============================================================================= */
const ListingItem: React.FC<Props> = ({ collection }) => {
  const [deleteCollection, { loading }] = useMutation<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >(DELETE_COLLECTION);

  if (!collection) {
    return null;
  }

  return (
    <S.Wrapper>
      <Box>
        <Heading as="h2">{collection.name}</Heading>
        {collection.description && <Paragraph>{collection.description}</Paragraph>}
      </Box>

      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4">
        <Button icon={<FiEdit />} variant="brand">
          Edit
        </Button>

        <Button
          onClick={async () => {
            if (confirm(`Are you sure you want do delete "${collection.name}"?`)) {
              await deleteCollection({
                variables: {
                  collectionId: collection?.id,
                },
                update: (cache, { data: { deleteCollection } }) => {
                  const { getCollections: collections } = cache.readQuery<
                    GetCollectionsListingQuery,
                    GetCollectionsListingQueryVariables
                  >({ query: GET_COLLECTIONS_LISTING });

                  cache.writeQuery<GetCollectionsListingQuery, GetCollectionsListingQueryVariables>(
                    {
                      query: GET_COLLECTIONS_LISTING,
                      data: {
                        getCollections: collections.filter(
                          collection => collection.id !== deleteCollection.id
                        ),
                      },
                    }
                  );
                },
              });
            }
          }}
          icon={<FiTrash2 />}
          variant="danger"
          isLoading={loading}
        >
          Delete
        </Button>
      </Grid>
    </S.Wrapper>
  );
};

export default ListingItem;
