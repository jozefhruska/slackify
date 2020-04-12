import React, { Dispatch, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';

import {
  GetComponentDetailQuery,
  GetComponentDetailQueryVariables,
  UserDetailFragment,
  ComponentDetailFragment,
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
import Detail from '../../src/components/components/detail/Detail';
import { Button } from '../../src/components/common/misc';
import { FiTrash2, FiMoreVertical, FiEye, FiEdit, FiPlus } from 'react-icons/fi';
import { Grid, Flex } from '../../src/components/common/layout/base';

/* Local types
============================================================================= */
type Query = {
  id: string;
};

/* Props - <ComponentDetailPage />
============================================================================= */
type Props = {
  user: UserDetailFragment;
  component: ComponentDetailFragment;
};

/* <ComponentDetailPage />
============================================================================= */
const ComponentDetailPage: React.FC<Props> = ({ user, component }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <Sidebar user={user} />

      <Content>
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
              text: component.id,
            },
          ]}
        >
          <Grid gridTemplateColumns={[null, 'auto auto']} gridGap="s4">
            <Grid display={['grid', 'none']} gridTemplateColumns="repeat(3, 1fr)" gridGap="s4">
              <Button icon={<FiEye />} />
              <Button icon={<FiEdit />} variant="info" />
              <Button icon={<FiPlus />} variant="brand" />
            </Grid>

            <Flex display={['none', 'flex']}>
              <Button icon={<FiMoreVertical />} />
            </Flex>

            <Button icon={<FiTrash2 />} variant="danger">
              Delete component
            </Button>
          </Grid>
        </PageHeader>

        <Detail component={component} />
      </Content>
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
    if (ctx?.req && ctx?.res) {
      ctx?.res.writeHead(302, { Location: '/' });
      ctx?.res.end();
      return;
    }
  }

  return { props: { user: data.getUser, component: data.component } };
};

export default withApollo(ComponentDetailPage);
