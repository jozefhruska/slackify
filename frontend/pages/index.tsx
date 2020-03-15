import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';

import { Flex, Box } from '../src/components/common/layout/base';
import { Block, Navigation } from '../src/components/common/layout';
import { Paragraph } from '../src/components/common/typography';
import { withApollo } from '../src/api';
import { USER } from '../src/schema/auth';
import { loadUserData } from '../src/utils';

/* <HomePage />
============================================================================= */
const HomePage: NextPage = () => {
  const { data } = useQuery(USER);

  if (data?.user) {
    return <Navigation />;
  }

  return (
    <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
      <Block>
        <Box textAlign="center">
          <Paragraph>To continue, please sign in with your Slack account:</Paragraph>

          <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar&client_id=791343423090.804137961685">
            <img
              alt="Sign in with Slack"
              height="40"
              width="172"
              src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
              srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
            />
          </a>
        </Box>
      </Block>
    </Flex>
  );
};

/* <HomePage /> - getInitialProps
============================================================================= */
HomePage.getInitialProps = async ctx => loadUserData(ctx);

export default withApollo({ ssr: true })(HomePage);
