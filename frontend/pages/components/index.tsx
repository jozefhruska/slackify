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

/* Props - <ComponentsPage />
============================================================================= */
type Props = {
  user: User;
};

/* <ComponentsPage />
============================================================================= */
const ComponentsPage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  return (
    <>
      <Header user={user} />
      <Navigation user={user} />

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
            onClick: () => null,
          }}
        />
      </Content>
    </>
  );
};

/* getInitialProps - <ComponentsPage />
============================================================================= */
ComponentsPage.getInitialProps = async ctx => loadUserData(ctx);

export default withApollo()(ComponentsPage);
