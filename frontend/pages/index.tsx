import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import { Flex, Box } from '../src/components/common/layout/base';
import { Block, Navigation, Content, Header, PageHeader } from '../src/components/common/layout';
import { Paragraph } from '../src/components/common/typography';
import { withApollo } from '../src/api';
import { loadUserData } from '../src/utils';
import { User } from '../src/types/generated/graphql';
import { StoreUser } from '../src/actions/auth';

/* Props - <HomePage />
============================================================================= */
type Props = {
  user: User;
};

/* <HomePage />
============================================================================= */
const HomePage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();
  console.log(user);

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  if (user) {
    return (
      <>
        <Header />
        <Navigation />

        <Content>
          <PageHeader heading="Dashboard" />
        </Content>
      </>
    );
  }

  return (
    <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" px="s2">
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

/* getInitialProps - <HomePage />
============================================================================= */
HomePage.getInitialProps = async (ctx) => loadUserData(ctx, false);

export default withApollo()(HomePage);
