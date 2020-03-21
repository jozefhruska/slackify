import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';

import { USER } from '../../src/schema/auth';
import { Content, Navigation, PageHeader } from '../../src/components/common/layout';
import { withApollo } from '../../src/api';
import { loadUserData } from '../../src/utils';

/* <CollectionsPage />
============================================================================= */
const CollectionsPage: NextPage = () => {
  const { data } = useQuery(USER);

  if (data?.user) {
    return (
      <>
        <Navigation />

        <Content>
          <PageHeader
            heading="Collections"
            breadcrumbs={[
              {
                text: 'Collections',
              },
            ]}
          />
        </Content>
      </>
    );
  }

  return null;
};

/* <CollectionsPage /> - getInitialProps
============================================================================= */
CollectionsPage.getInitialProps = async ctx => loadUserData(ctx);

export default withApollo()(CollectionsPage);
