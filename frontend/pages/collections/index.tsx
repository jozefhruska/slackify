import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NextPage } from 'next';
import { FiPlus } from 'react-icons/fi';

import { Content, Navigation, PageHeader, Header } from '../../src/components/common/layout';
import { withApollo } from '../../src/api';
import { loadUserData } from '../../src/utils';
import ListingPage from '../../src/components/collections/listing/ListingPage/ListingPage';
import { User } from '../../src/types/generated/graphql';
import { StoreUser } from '../../src/actions/auth';
import { OpenCreateUpdateModal } from '../../src/actions/collections';
import Sidebar from '../../src/components/common/layout/Sidebar/Sidebar';

/* Props - <CollectionsPage />
============================================================================= */
type Props = {
  user: User;
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
          primaryButton={{
            icon: <FiPlus />,
            text: 'Add new collection',
            onClick: () => {
              dispatch({
                type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                payload: {
                  state: {
                    mode: 'create',
                  },
                },
              });
            },
          }}
        />

        <ListingPage />
      </Content>
    </>
  );
};

/* getInitialProps - <CollectionsPage />
============================================================================= */
CollectionsPage.getInitialProps = async (ctx) => loadUserData(ctx);

export default withApollo()(CollectionsPage);
