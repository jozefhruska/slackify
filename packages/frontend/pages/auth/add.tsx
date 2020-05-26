import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { createApolloClient } from '../../src/api';
import { Flex } from '../../src/components/common/layout/base';
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
import { REDIRECT_HOST } from '../../src/config';
import { ApolloError } from '@apollo/client';

/* Props - <AddToSlackPage />
============================================================================= */
type Props = {
  success: boolean;
  errorCode: 'TEAM_ALREADY_CONNECTED';
  errorMessage: string;
};

/* <AddToSlackPage />
============================================================================= */
const AddToSlackPage: NextPage<Props> = ({ success, errorCode, errorMessage }) => {
  const { push } = useRouter();

  useEffect(() => {
    if (success) {
      push('/?addToSlackSuccess=true');
      return;
    }

    if (errorCode === 'TEAM_ALREADY_CONNECTED') {
      push('/?teamAlreadyConnected=true');
      return;
    }

    if (errorMessage) {
      console.error(errorMessage);
      push('/?error=true');
    }
  }, [success, errorCode, errorMessage]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      mx="auto"
      minHeight="100vh"
      padding="s2"
      textAlign="center"
    >
      <Block>
        <Flex
          width={['100%', '20rem']}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Loader />
          <Paragraph mb={0}>
            {'Please wait while we are connecting your workspace with Slackify...'}
          </Paragraph>
        </Flex>
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
  let errorCode = null;
  let errorMessage = null;

  await apolloClient
    .mutate<AddToSlackMutation, AddToSlackMutationVariables>({
      mutation: ADD_TO_SLACK,
      variables: {
        code: ctx?.query?.code as string,
        // eslint-disable-next-line @typescript-eslint/camelcase
        redirect_host: REDIRECT_HOST,
      },
    })
    .then(() => {
      success = true;
    })
    .catch(({ message, graphQLErrors }: ApolloError) => {
      errorCode = graphQLErrors[0].extensions?.code ?? null;
      errorMessage = message ?? null;
    });

  return { props: { success, errorCode, errorMessage } };
};

export default AddToSlackPage;
