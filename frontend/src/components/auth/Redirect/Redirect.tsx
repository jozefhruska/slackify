import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SignIn, SignInVariables } from '../../../types/generated/schema';
import { SIGN_IN } from '../../../api/mutations/auth';
import { setAuthToken } from '../../../cookies';

/* Props - <Redirect />
============================================================================= */
type Props = {
  code: string;
};

/* <Redirect />
============================================================================= */
const Redirect: React.FunctionComponent<Props> = ({ code }) => {
  const [signIn, { loading, error, data }] = useMutation<SignIn, SignInVariables>(SIGN_IN);

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

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return <span>Success!</span>;
};

export default Redirect;
