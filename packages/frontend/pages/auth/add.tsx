import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { createApolloClient } from '../../src/api';
import { Flex, Box } from '../../src/components/common/layout/base';
import { Block } from '../../src/components/common/layout';
import { Paragraph } from '../../src/components/common/typography';
import { getAuthToken } from '../../src/cookies';
import {
  GetUserQuery,
  GetUserQueryVariables,
  AddToSlackMutation,
  AddToSlackMutationVariables,
} from '../../src/types/generated/graphql';
import { GET_USER } from '../../src/api/query/users';
import { Loader } from '../../src/components/common/misc';
import { ADD_TO_SLACK } from '../../src/api/mutation/auth';

/* Props - <AddToSlackPage />
============================================================================= */
type Props = {
  success: boolean;
  errorMessage: string;
};

/* <AddToSlackPage />
============================================================================= */
const AddToSlackPage: NextPage<Props> = ({ success, errorMessage }) => {
  const { push } = useRouter();

  useEffect(() => {
    if (success) {
      push('/?addToSlackSuccess=true');
    }
  }, [success]);

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

  if (success) {
    return (
      <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
        <Block>
          <Box textAlign="center">
            <Paragraph mb={0}>Success</Paragraph>
          </Box>
        </Block>
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
      <Block>
        <Box textAlign="center">
          <Paragraph mb={0}>{'Please wait...'}</Paragraph>
          <Loader />
        </Box>
      </Block>
    </Flex>
  );
};

/* getServerSideProps - <AddToSlackPage />
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

  let success = false;
  let errorMessage = null;
  await apolloClient
    .mutate<AddToSlackMutation, AddToSlackMutationVariables>({
      mutation: ADD_TO_SLACK,
      variables: {
        code: ctx?.query?.code as string,
      },
    })
    .then(() => {
      success = true;
    })
    .catch(({ message }) => {
      errorMessage = message;
    });

  return { props: { success, errorMessage } };
};

export default AddToSlackPage;
