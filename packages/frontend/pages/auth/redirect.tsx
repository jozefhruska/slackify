import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import withApollo from '../../src/api';
import { Flex, Box } from '../../src/components/common/layout/base';
import { Block } from '../../src/components/common/layout';
import { Paragraph } from '../../src/components/common/typography';
import { Loader } from '../../src/components/common/misc';
import { SIGN_IN } from '../../src/api/mutation/auth';
import { setAuthToken } from '../../src/cookies';
import { SignInMutation, SignInMutationVariables } from '../../src/types/generated/graphql';
import { StoreUser } from '../../src/actions/auth';

/* <RedirectPage />
============================================================================= */
const RedirectPage: NextPage = () => {
  const [signIn, { loading: signInLoading, error: signInError }] = useMutation<
    SignInMutation,
    SignInMutationVariables
  >(SIGN_IN);

  const dispatch = useDispatch<Dispatch<StoreUser>>();

  const { query, push } = useRouter();

  useEffect(() => {
    const code = query?.code as string;

    if (code) {
      (async () => {
        try {
          const { data } = await signIn({
            variables: {
              code,
            },
          });

          const authToken = data?.signIn?.authToken;
          if (authToken && data?.signIn) {
            /* Set auth token cookie */
            setAuthToken(authToken);

            /* Store user into local state */
            dispatch({ type: '[AUTH] STORE_USER', payload: { user: data?.signIn?.user } });

            push('/');
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [query]);

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

export default withApollo(RedirectPage);
