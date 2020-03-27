import React from 'react';

import {
  Collection,
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables,
  GetCollectionsListingQuery,
  GetCollectionsListingQueryVariables,
} from '../../../../types/generated/graphql';
import { Heading, Paragraph } from '../../../common/typography';
import { Grid, Box, Flex } from '../../../common/layout/base';
import { Button, PopperButton } from '../../../common/misc';
import { FiMoreVertical, FiTrash2, FiEdit } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import { DELETE_COLLECTION } from '../../../../api/mutation/collections';
import { GET_COLLECTIONS_LISTING } from '../../../../api/query/collections';
import { humanizeComponentType } from '../../../../utils';

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
        <Box mb="s8">
          <Heading as="h2" mb="s6">
            {collection.name}
          </Heading>
          <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4">
            <Box>
              <S.MetaTitle>Type</S.MetaTitle>
              <span>{humanizeComponentType(collection.type)}</span>
            </Box>

            <Box>
              <S.MetaTitle>Components</S.MetaTitle>
              <span>{collection.componentsCount}</span>
            </Box>
          </Grid>
        </Box>

        {collection.description && <Paragraph>{collection.description}</Paragraph>}
      </Box>

      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4">
        <Flex alignItems="center" color="gray.5">
          Updated 1 day ago
        </Flex>

        <Grid gridTemplateColumns="1fr auto" gridColumnGap="s4">
          <Button variant="brand">View</Button>

          <PopperButton
            options={[
              {
                icon: <FiEdit />,
              },
              {
                onClick: async () => {
                  if (confirm(`Are you sure you want do delete "${collection.name}"?`)) {
                    await deleteCollection({
                      variables: {
                        collectionId: collection?.id,
                      },
                      update: (cache, { data: { deleteCollection } }) => {
                        const { getCollectionsListing: collections } = cache.readQuery<
                          GetCollectionsListingQuery,
                          GetCollectionsListingQueryVariables
                        >({ query: GET_COLLECTIONS_LISTING });

                        cache.writeQuery<
                          GetCollectionsListingQuery,
                          GetCollectionsListingQueryVariables
                        >({
                          query: GET_COLLECTIONS_LISTING,
                          data: {
                            getCollectionsListing: collections.filter(
                              collection => collection.id !== deleteCollection.id
                            ),
                          },
                        });
                      },
                    });
                  }
                },
                icon: <FiTrash2 />,
                isLoading: loading,
                variant: 'danger',
              },
            ]}
          >
            {(ref, onClick) => <Button ref={ref} onClick={onClick} icon={<FiMoreVertical />} />}
          </PopperButton>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};

export default ListingItem;
