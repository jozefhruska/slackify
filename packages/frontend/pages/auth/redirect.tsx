import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import withApollo, { createApolloClient } from '../../src/api';
import { Flex, Box } from '../../src/components/common/layout/base';
import { Block } from '../../src/components/common/layout';
import { Paragraph } from '../../src/components/common/typography';
import { SIGN_IN } from '../../src/api/mutation/auth';
import { getAuthToken, setAuthToken } from '../../src/cookies';
import {
  SignInMutation,
  SignInMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from '../../src/types/generated/graphql';
import { GET_USER } from '../../src/api/query/auth';
import { Loader } from '../../src/components/common/misc';
import { StoreUser } from '../../src/actions/auth';

/* Props - <RedirectPage />
============================================================================= */
type Props = {
  data: SignInMutation;
  errorMessage: string;
};

/* <RedirectPage />
============================================================================= */
const RedirectPage: NextPage<Props> = ({ data, errorMessage }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();

  const { push } = useRouter();

  useEffect(() => {
    if (data?.signIn) {
      /* Set auth token cookie */
      setAuthToken(data.signIn?.authToken);

      /* Store user into local state */
      dispatch({ type: '[AUTH] STORE_USER', payload: { user: data.signIn?.user } });

      push('/');
    }
  }, [data]);

  if (!data && !errorMessage) {
    return (
      <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
        <Block>
          <Box textAlign="center">
            <Paragraph mb={0}>{"Please wait, we're signing you in..."}</Paragraph>
            <Loader />
          </Box>
        </Block>
      </Flex>
    );
  }

  if (errorMessage) {
    return (
      <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
        <Block>
          <Box textAlign="center">
            <Paragraph mb={0}>{errorMessage}</Paragraph>
          </Box>
        </Block>
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
      <Block>
        <Box textAlign="center">
          <Paragraph mb={0}>Success</Paragraph>
        </Box>
      </Block>
    </Flex>
  );
};

/* getServerSideProps - <RedirectPage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user data */
  const { data: userData } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
  });

  /* Check if user data were returned */
  if (userData?.getUser) {
    ctx?.res.writeHead(302, { Location: '/' });
    ctx?.res.end();
    return;
  }

  let data = null;
  let errorMessage = null;
  await apolloClient
    .mutate<SignInMutation, SignInMutationVariables>({
      mutation: SIGN_IN,
      variables: {
        code: ctx?.query?.code as string,
      },
    })
    .then(({ data: signInData }) => {
      data = signInData;
    })
    .catch(({ message }) => {
      errorMessage = message;
    });

  return { props: { data, errorMessage } };
};

export default withApollo(RedirectPage);
