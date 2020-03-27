import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { withApollo } from '../../src/api';
import { Flex, Box } from '../../src/components/common/layout/base';
import { Block } from '../../src/components/common/layout';
import { Paragraph } from '../../src/components/common/typography';
import { Loader } from '../../src/components/common/misc';
import { SIGN_IN } from '../../src/api/mutation/auth';
import { setAuthToken } from '../../src/cookies';
import {
  SignInMutation,
  SignInMutationVariables,
  UserQuery,
  UserQueryVariables,
} from '../../src/types/generated/graphql';
import { USER } from '../../src/schema/auth';

/* <RedirectPage />
============================================================================= */
const RedirectPage: NextPage = () => {
  const apolloClient = useApolloClient();
  const [signIn, { loading: signInLoading, error: signInError }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);

  const { query, push } = useRouter();

  useEffect(() => {
    (async () => {
      const code = query?.code as string;

      try {
        const { data } = await signIn({
          variables: {
            code,
          },
        });

        /* Set auth token cookie */
        const authToken = data?.signIn?.authToken;
        setAuthToken(authToken);

        /* Store user into local storage */
        apolloClient.writeQuery<UserQuery, UserQueryVariables>({
          query: USER,
          data: {
            user: data?.signIn?.user,
          },
        });

        push('/');
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (signInLoading) {
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

  if (signInError) {
    return (
      <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
        <Block>
          <Box textAlign="center">
            <Paragraph mb={0}>{signInError.message}</Paragraph>
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

export default withApollo({ ssr: true })(RedirectPage);
