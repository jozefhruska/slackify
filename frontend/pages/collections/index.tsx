import React from 'react';
import { NextPage } from 'next';

import { Content, Navigation, PageHeader, Header } from '../../src/components/common/layout';
import { withApollo } from '../../src/api';
import { loadUserData } from '../../src/utils';
import ListingPage from '../../src/components/collections/listing/ListingPage/ListingPage';
import { FiPlus } from 'react-icons/fi';

/* <CollectionsPage />
============================================================================= */
const CollectionsPage: NextPage = () => {
  return (
    <>
      <Header />
      <Navigation />

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
          }}
        />

        <ListingPage />
      </Content>
    </>
  );
};

/* <CollectionsPage /> - getInitialProps
============================================================================= */
CollectionsPage.getInitialProps = async ctx => loadUserData(ctx);

export default withApollo()(CollectionsPage);
