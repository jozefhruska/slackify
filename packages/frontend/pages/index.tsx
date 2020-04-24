import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import { Flex, Box } from '../src/components/common/layout/base';
import {
  Block,
  Navigation,
  Content,
  Header,
  PageHeader,
  Sidebar,
} from '../src/components/common/layout';
import { Paragraph } from '../src/components/common/typography';
import { User, GetUserQuery, GetUserQueryVariables } from '../src/types/generated/graphql';
import { StoreUser } from '../src/actions/auth';
import withApollo, { createApolloClient } from '../src/api';
import { getAuthToken } from '../src/cookies';
import { GET_USER } from '../src/api/query/users';

/* Props - <HomePage />
============================================================================= */
type Props = {
  user: User;
};

/* <HomePage />
============================================================================= */
const HomePage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  if (user) {
    return (
      <>
        <Header />
        <Navigation />
        <Sidebar user={user} />

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

          <a
            id="sign-in-button"
            href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar&client_id=791343423090.804137961685"
          >
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

/* getServerSideProps - <HomePage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user data */
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
  });

  return { props: { user: data?.getUser } };
};

export default withApollo(HomePage);
