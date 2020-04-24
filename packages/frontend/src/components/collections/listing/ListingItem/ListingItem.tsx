import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { FiMoreVertical, FiTrash2, FiEdit, FiEye, FiEyeOff } from 'react-icons/fi';
import { useMutation } from '@apollo/client';
import Link from 'next/link';

import {
  DeleteOneCollectionMutation,
  DeleteOneCollectionMutationVariables,
  GetCollectionsListingQuery,
  GetCollectionsListingQueryVariables,
  UpdateOneCollectionMutation,
  UpdateOneCollectionMutationVariables,
  CollectionListingFragment,
} from '../../../../types/generated/graphql';
import { Heading, Paragraph } from '../../../common/typography';
import { Grid, Box, Flex } from '../../../common/layout/base';
import { Button, PopperButton } from '../../../common/misc';
import { DELETE_ONE_COLLECTION, UPDATE_ONE_COLLECTION } from '../../../../api/mutation/collections';
import { GET_COLLECTIONS_LISTING } from '../../../../api/query/collections';
import { humanizeComponentType, getShortenedText } from '../../../../utils';
import { OpenCreateUpdateModal } from '../../../../actions/collections';
import { selectUser } from '../../../../selectors/auth';
import { canManageCollections, canCreateCollections } from '../../../../utils/users';

import * as S from './ListingItem.styles';

/* Props - <ListingItem />
============================================================================= */
type Props = {
  collection: CollectionListingFragment;
};

/* <ListingItem />
============================================================================= */
const ListingItem: React.FC<Props> = ({ collection }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<OpenCreateUpdateModal>>();

  const [deleteCollection, { loading: deleteLoading }] = useMutation<
    DeleteOneCollectionMutation,
    DeleteOneCollectionMutationVariables
  >(DELETE_ONE_COLLECTION);

  const [updateCollection, { loading: updateLoading }] = useMutation<
    UpdateOneCollectionMutation,
    UpdateOneCollectionMutationVariables
  >(UPDATE_ONE_COLLECTION);

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

        {collection.description && (
          <Paragraph>{getShortenedText(collection.description)}</Paragraph>
        )}
      </Box>

      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4">
        <Flex alignItems="center" color="gray.5">
          {moment(collection.updatedAt).fromNow()}
        </Flex>

        <Grid gridTemplateColumns="1fr auto" gridColumnGap="s4">
          <Link href="/collections/[id]" as={`/collections/${collection.id}`}>
            <Button variant="brand">View</Button>
          </Link>

          <PopperButton
            options={(closePopper) => [
              {
                icon: collection.published ? <FiEye /> : <FiEyeOff />,
                onClick: async () => {
                  await updateCollection({
                    variables: {
                      data: {
                        published: !collection?.published,
                      },
                      where: {
                        id: collection.id,
                      },
                    },
                  });
                },
                isLoading: updateLoading,
                disabled: !canManageCollections(user?.role),
              },
              {
                icon: <FiEdit />,
                disabled: !canCreateCollections(user?.role),
                variant: 'info',
                onClick: () => {
                  dispatch({
                    type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                    payload: {
                      state: {
                        mode: 'update',
                        collection,
                      },
                    },
                  });

                  closePopper();
                },
              },
              {
                onClick: async () => {
                  if (
                    confirm(
                      `Are you sure you want do delete "${collection.name}" and all components assigned to this collection?`
                    )
                  ) {
                    await deleteCollection({
                      variables: {
                        where: {
                          id: collection?.id,
                        },
                      },
                      update: (cache, { data: { deleteOneCollection } }) => {
                        const { collections: collections } = cache.readQuery<
                          GetCollectionsListingQuery,
                          GetCollectionsListingQueryVariables
                        >({
                          query: GET_COLLECTIONS_LISTING,
                          variables: {
                            where: {
                              team: {
                                id: {
                                  equals: user?.team?.id,
                                },
                              },
                            },
                            first: 40,
                          },
                        });

                        cache.writeQuery<
                          GetCollectionsListingQuery,
                          GetCollectionsListingQueryVariables
                        >({
                          query: GET_COLLECTIONS_LISTING,
                          data: {
                            collections: collections.filter(
                              (collection) => collection.id !== deleteOneCollection?.id
                            ),
                          },
                          variables: {
                            where: {
                              team: {
                                id: {
                                  equals: user?.team?.id,
                                },
                              },
                            },
                            first: 40,
                          },
                        });

                        cache.gc();
                      },
                    });

                    closePopper();
                  }
                },
                icon: <FiTrash2 />,
                isLoading: deleteLoading,
                disabled: !canManageCollections(user?.role),
                variant: 'danger',
              },
            ]}
          >
            {(ref, onClick) => (
              <Button
                ref={ref}
                onClick={onClick}
                icon={<FiMoreVertical />}
                disabled={!canCreateCollections(user?.role)}
              />
            )}
          </PopperButton>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};

export default ListingItem;
