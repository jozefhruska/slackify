import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NextPage } from 'next';
import { FiPlus } from 'react-icons/fi';

import { Content, Navigation, PageHeader, Header } from '../../src/components/common/layout';
import { withApollo } from '../../src/api';
import { loadUserData } from '../../src/utils';
import { User } from '../../src/types/generated/graphql';
import { StoreUser } from '../../src/actions/auth';
import ListingPage from '../../src/components/components/listing/ListingPage/ListingPage';
import { OpenCreateUpdateModal } from '../../src/actions/components';

/* Props - <ComponentsPage />
============================================================================= */
type Props = {
  user: User;
};

/* <ComponentsPage />
============================================================================= */
const ComponentsPage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser | OpenCreateUpdateModal>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  return (
    <>
      <Header />
      <Navigation />

      <Content>
        <PageHeader
          heading="Components"
          breadcrumbs={[
            {
              text: 'Components',
            },
          ]}
          primaryButton={{
            icon: <FiPlus />,
            text: 'Add new component',
            onClick: () =>
              dispatch({
                type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                payload: {
                  state: {
                    mode: 'create',
                  },
                },
              }),
          }}
        />

        <ListingPage />
      </Content>
    </>
  );
};

/* getInitialProps - <ComponentsPage />
============================================================================= */
ComponentsPage.getInitialProps = async (ctx) => loadUserData(ctx);

export default withApollo()(ComponentsPage);
