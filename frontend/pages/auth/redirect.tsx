import { useEffect } from 'react';
import { NextPage } from 'next';
import { useMutation } from '@apollo/react-hooks';

import { withApollo } from '../../src/api';
import { Flex, Box } from '../../src/components/common/layout/base';
import { Block } from '../../src/components/common/layout';
import { Paragraph } from '../../src/components/common/typography';
import { Loader } from '../../src/components/common/misc';
import { SignIn, SignInVariables } from '../../src/types/generated/schema';
import { SIGN_IN } from '../../src/api/mutations/auth';
import { setAuthToken } from '../../src/cookies';

/* Props - <RedirectPage />
============================================================================= */
type Props = {
  code: string;
};

/* <RedirectPage />
============================================================================= */
const RedirectPage: NextPage<Props> = ({ code }) => {
  const [signIn, { loading, error }] = useMutation<SignIn, SignInVariables>(SIGN_IN);

  useEffect(() => {
    (async () => {
      const { data } = await signIn({
        variables: {
          code,
        },
      });

      const authToken = data?.signIn;
      if (authToken) {
        setAuthToken(authToken);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
        <Block>
          <Box textAlign="center">
            <Paragraph mb={0}>Please wait, we're signing you in...</Paragraph>
            <Loader />
          </Box>
        </Block>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex alignItems="center" justifyContent="center" mx="auto" minHeight="100vh" padding="s2">
        <Block>
          <Box textAlign="center">
            <Paragraph mb={0}>{error.message}</Paragraph>
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

/* getInitialProps - <RedirectPage />
============================================================================= */
RedirectPage.getInitialProps = async ({ query: { code } }) => {
  return { code: code as string };
};

export default withApollo(RedirectPage);
