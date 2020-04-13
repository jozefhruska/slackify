import React, { useEffect } from 'react';
import { NormalizedCacheObject, useQuery, useMutation } from '@apollo/client';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import { FiEye, FiEdit, FiPlus, FiTrash2, FiMoreVertical, FiEyeOff } from 'react-icons/fi';

import {
  UserDetailFragment,
  GetCollectionDetailQueryVariables,
  GetCollectionDetailQuery,
  UpdateOneCollectionMutation,
  UpdateOneCollectionMutationVariables,
} from '../../src/types/generated/graphql';
import { StoreUser } from '../../src/actions/auth';
import { OpenCreateUpdateModal } from '../../src/actions/collections';
import { getAuthToken, removeAuthToken } from '../../src/cookies';
import { checkAuthentication } from '../../src/utils';
import withApollo, { createApolloClient } from '../../src/api';
import { GET_COLLECTION_DETAIL } from '../../src/api/query/collections';
import { PageLoader, Alert, Button, PopperButton } from '../../src/components/common/misc';
import {
  PageHeader,
  Header,
  Navigation,
  Sidebar,
  Content,
} from '../../src/components/common/layout';
import CreateUpdateModal from '../../src/components/collections/CreateUpdateModal/CreateUpdateModal';
import { Grid, Flex } from '../../src/components/common/layout/base';
import { UPDATE_ONE_COLLECTION } from '../../src/api/mutation/collections';
import Detail from '../../src/components/collections/detail/Detail';

/* Local types
============================================================================= */
type Query = {
  id: string;
};

/* Props - <CollectionDetailPage />
============================================================================= */
type Props = {
  id: string;
  user: UserDetailFragment;
  apolloState: NormalizedCacheObject;
};

/* <CollectionDetailPage />
============================================================================= */
const CollectionDetailPage: React.FC<Props> = ({ id, user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser | OpenCreateUpdateModal>>();

  const { data, loading: detailLoading } = useQuery<
    GetCollectionDetailQuery,
    GetCollectionDetailQueryVariables
  >(GET_COLLECTION_DETAIL, {
    variables: {
      where: {
        id: id,
      },
    },
  });

  const [updateCollection, { loading: updateLoading }] = useMutation<
    UpdateOneCollectionMutation,
    UpdateOneCollectionMutationVariables
  >(UPDATE_ONE_COLLECTION);

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  const renderDetailContent = () => {
    if (detailLoading) {
      return <PageLoader />;
    }

    if (!data?.collection) {
      return (
        <Alert type="danger">
          Sorry, we were not able to get the requested collection. This might be caused because of
          an error or the requested collection does not exist.
        </Alert>
      );
    }

    return (
      <>
        <PageHeader
          heading={data.collection.name}
          breadcrumbs={[
            {
              text: 'Collections',
              link: {
                href: '/collections',
              },
            },
            {
              text: data.collection.name,
            },
          ]}
        >
          <Grid gridTemplateColumns={[null, 'auto auto']} gridGap="s4">
            <Grid display={['grid', 'none']} gridTemplateColumns="repeat(3, 1fr)" gridGap="s4">
              <Button
                icon={data.collection.published ? <FiEye /> : <FiEyeOff />}
                isLoading={updateLoading}
                onClick={async () => {
                  await updateCollection({
                    variables: {
                      data: {
                        published: !data.collection?.published,
                      },
                      where: {
                        id: data.collection.id,
                      },
                    },
                  });
                }}
              />
              <Button
                icon={<FiEdit />}
                variant="info"
                onClick={() => {
                  dispatch({
                    type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                    payload: {
                      state: {
                        mode: 'update',
                        collection: data.collection,
                      },
                    },
                  });
                }}
              />
              <Button
                icon={<FiPlus />}
                variant="brand"
                onClick={() => {
                  dispatch({
                    type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                    payload: {
                      state: {
                        mode: 'create',
                      },
                    },
                  });
                }}
              />
            </Grid>

            <Flex display={['none', 'flex']}>
              <PopperButton
                placement="left"
                options={(closePopper) => [
                  {
                    icon: data.collection.published ? <FiEye /> : <FiEyeOff />,
                    isLoading: updateLoading,
                    onClick: async () => {
                      await updateCollection({
                        variables: {
                          data: {
                            published: !data.collection?.published,
                          },
                          where: {
                            id: data.collection.id,
                          },
                        },
                      });
                    },
                  },
                  {
                    icon: <FiEdit />,
                    variant: 'info',
                    onClick: () => {
                      dispatch({
                        type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                        payload: {
                          state: {
                            mode: 'update',
                            collection: data.collection,
                          },
                        },
                      });

                      closePopper();
                    },
                  },
                  {
                    icon: <FiPlus />,
                    variant: 'brand',
                    onClick: async () => {
                      dispatch({
                        type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                        payload: {
                          state: {
                            mode: 'create',
                          },
                        },
                      });

                      closePopper();
                    },
                  },
                ]}
              >
                {(ref, onClick) => <Button ref={ref} onClick={onClick} icon={<FiMoreVertical />} />}
              </PopperButton>
            </Flex>

            <Button icon={<FiTrash2 />} variant="danger">
              Delete collection
            </Button>
          </Grid>
        </PageHeader>

        <Detail collection={data.collection} />
      </>
    );
  };

  return (
    <>
      <Header />
      <Navigation />
      <Sidebar user={user} />

      <Content>{renderDetailContent()}</Content>

      <CreateUpdateModal />
    </>
  );
};

/* getServerSideProps - <CollectionDetailPage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props, Query> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Check if user is authenticated */
  checkAuthentication(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user and collection data */
  const { data } = await apolloClient.query<
    GetCollectionDetailQuery,
    GetCollectionDetailQueryVariables
  >({
    query: GET_COLLECTION_DETAIL,
    variables: {
      where: {
        id: ctx.params?.id,
      },
    },
  });

  /* Check if user data were returned */
  if (!data?.getUser) {
    removeAuthToken(ctx);

    /* Redirect */
    if (ctx?.req && ctx?.res) {
      ctx?.res.writeHead(302, { Location: '/' });
      ctx?.res.end();
      return;
    }
  }

  return {
    props: {
      id: data.collection?.id ?? null,
      user: data.getUser,
      apolloState: {
        data: apolloClient.extract(),
      },
    },
  };
};

export default withApollo(CollectionDetailPage);
