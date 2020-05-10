import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NextPage, GetServerSideProps } from 'next';
import { FiPlus } from 'react-icons/fi';

import {
  Content,
  Navigation,
  PageHeader,
  Header,
  Sidebar,
} from '../../src/components/common/layout';
import withApollo, { createApolloClient } from '../../src/api';
import ListingPage from '../../src/components/collections/listing/ListingPage/ListingPage';
import {
  UserDetailFragment,
  GetUserQuery,
  GetUserQueryVariables,
} from '../../src/types/generated/graphql';
import { StoreUser } from '../../src/actions/auth';
import { OpenCreateUpdateModal } from '../../src/actions/collections';
import { getAuthToken, removeAuthToken } from '../../src/cookies';
import { GET_USER } from '../../src/api/query/users';
import { checkAuthentication } from '../../src/utils';
import { Button } from '../../src/components/common/misc';
import { canCreateCollections } from '../../src/utils/users';

/* Props - <CollectionsPage />
============================================================================= */
type Props = {
  user: UserDetailFragment;
};

/* <CollectionsPage />
============================================================================= */
const CollectionsPage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser | OpenCreateUpdateModal>>();

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
          heading="Collections"
          breadcrumbs={[
            {
              text: 'Collections',
            },
          ]}
        >
          <Button
            icon={<FiPlus />}
            variant="brand"
            width="100%"
            disabled={!canCreateCollections(user.role)}
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
          >
            Create new collection
          </Button>
        </PageHeader>

        <ListingPage user={user} />
      </Content>
    </>
  );
};

/* getServerSideProps - <CollectionsPage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Check if user is authenticated */
  checkAuthentication(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user data */
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
  });

  /* Check if user data were returned */
  if (!data?.getUser) {
    removeAuthToken(ctx);

    /* Redirect */
    ctx?.res.writeHead(302, { Location: '/' });
    ctx?.res.end();
    return;
  }

  return { props: { user: data?.getUser } };
};

export default withApollo(CollectionsPage);
