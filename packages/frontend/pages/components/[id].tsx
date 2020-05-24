import React, { Dispatch, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { useMutation, useQuery, NormalizedCacheObject } from '@apollo/client';
import { FiTrash2, FiMoreVertical, FiEye, FiEdit, FiPlus, FiEyeOff } from 'react-icons/fi';

import {
  GetComponentDetailQuery,
  GetComponentDetailQueryVariables,
  UserDetailFragment,
  UpdateOneComponentMutation,
  UpdateOneComponentMutationVariables,
  DeleteOneComponentMutation,
  DeleteOneComponentMutationVariables,
} from '../../src/types/generated/graphql';
import { checkAuthentication } from '../../src/utils';
import { getAuthToken, removeAuthToken } from '../../src/cookies';
import withApollo, { createApolloClient } from '../../src/api';
import { StoreUser } from '../../src/actions/auth';
import {
  Header,
  Navigation,
  Sidebar,
  PageHeader,
  Content,
} from '../../src/components/common/layout';
import { GET_COMPONENT_DETAIL } from '../../src/api/query/components';
import { Button, PopperButton, PageLoader, Alert } from '../../src/components/common/misc';
import { Grid, Flex } from '../../src/components/common/layout/base';
import { UPDATE_ONE_COMPONENT, DELETE_ONE_COMPONENT } from '../../src/api/mutation/components';
import { OpenCreateUpdateModal } from '../../src/actions/components';
import Detail from '../../src/components/components/detail/Detail';
import CreateUpdateModal from '../../src/components/components/CreateUpdateModal/CreateUpdateModal';
import { canManageComponents, canCreateComponents } from '../../src/utils/users';
import { useRouter } from 'next/router';

/* Local types
============================================================================= */
type Query = {
  id: string;
};

/* Props - <ComponentDetailPage />
============================================================================= */
type Props = {
  id: string;
  user: UserDetailFragment;
  apolloState: NormalizedCacheObject;
};

/* <ComponentDetailPage />
============================================================================= */
const ComponentDetailPage: React.FC<Props> = ({ id, user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser | OpenCreateUpdateModal>>();

  const { push } = useRouter();

  const { data, loading: detailLoading } = useQuery<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >(GET_COMPONENT_DETAIL, {
    variables: {
      where: {
        id: id,
      },
    },
    pollInterval: 4000,
  });

  const [deleteComponent, { loading: deleteLoading }] = useMutation<
    DeleteOneComponentMutation,
    DeleteOneComponentMutationVariables
  >(DELETE_ONE_COMPONENT, {
    variables: {
      where: {
        id,
      },
    },
    onCompleted: () => push('/components'),
  });

  const [updateComponent, { loading: updateLoading }] = useMutation<
    UpdateOneComponentMutation,
    UpdateOneComponentMutationVariables
  >(UPDATE_ONE_COMPONENT);

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  const renderDetailContent = () => {
    if (detailLoading) {
      return <PageLoader />;
    }

    if (!data?.component) {
      return (
        <Alert type="danger">
          Sorry, we were not able to get the requested component. This might be caused because of an
          error or the requested component does not exist.
        </Alert>
      );
    }

    return (
      <>
        <PageHeader
          heading="Component detail"
          breadcrumbs={[
            {
              text: 'Components',
              link: {
                href: '/components',
              },
            },
            {
              text: data.component.id,
            },
          ]}
        >
          <Grid gridTemplateColumns={[null, 'auto auto']} gridGap="s4">
            <Grid display={['grid', 'none']} gridTemplateColumns="repeat(3, 1fr)" gridGap="s4">
              <Button
                icon={data.component.published ? <FiEye /> : <FiEyeOff />}
                disabled={!canManageComponents(user?.role)}
                isLoading={updateLoading}
                onClick={async () => {
                  await updateComponent({
                    variables: {
                      data: {
                        published: !data.component?.published,
                      },
                      where: {
                        id: data.component.id,
                      },
                    },
                  });
                }}
              />
              <Button
                icon={<FiEdit />}
                disabled={!canCreateComponents(user?.role)}
                variant="info"
                onClick={() => {
                  dispatch({
                    type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                    payload: {
                      state: {
                        mode: 'update',
                        component: data.component,
                      },
                    },
                  });
                }}
              />
              <Button
                icon={<FiPlus />}
                disabled={!canCreateComponents(user?.role)}
                variant="brand"
                onClick={() => {
                  dispatch({
                    type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
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
                    icon: data.component.published ? <FiEye /> : <FiEyeOff />,
                    disabled: !canManageComponents(user?.role),
                    isLoading: updateLoading,
                    onClick: async () => {
                      await updateComponent({
                        variables: {
                          data: {
                            published: !data.component?.published,
                          },
                          where: {
                            id: data.component.id,
                          },
                        },
                      });
                    },
                  },
                  {
                    icon: <FiEdit />,
                    disabled: !canCreateComponents(user?.role),
                    variant: 'info',
                    onClick: () => {
                      dispatch({
                        type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                        payload: {
                          state: {
                            mode: 'update',
                            component: data.component,
                          },
                        },
                      });

                      closePopper();
                    },
                  },
                  {
                    icon: <FiPlus />,
                    disabled: !canCreateComponents(user?.role),
                    variant: 'brand',
                    onClick: async () => {
                      dispatch({
                        type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
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
                {(ref, onClick) => (
                  <Button
                    ref={ref}
                    onClick={onClick}
                    icon={<FiMoreVertical />}
                    disabled={!canCreateComponents(user?.role)}
                  />
                )}
              </PopperButton>
            </Flex>

            <Button
              icon={<FiTrash2 />}
              onClick={() => deleteComponent()}
              isLoading={deleteLoading}
              disabled={!canManageComponents(user?.role)}
              variant="danger"
            >
              Delete component
            </Button>
          </Grid>
        </PageHeader>

        <Detail component={data.component} />
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

/* getServerSideProps - <ComponentDetailPage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props, Query> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Check if user is authenticated */
  checkAuthentication(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user and component data */
  const { data } = await apolloClient.query<
    GetComponentDetailQuery,
    GetComponentDetailQueryVariables
  >({
    query: GET_COMPONENT_DETAIL,
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
    ctx?.res.writeHead(302, { Location: '/' });
    ctx?.res.end();
    return;
  }

  return {
    props: {
      id: data.component?.id ?? null,
      user: data.getUser,
      apolloState: {
        data: apolloClient.extract(),
      },
    },
  };
};

export default withApollo(ComponentDetailPage);
