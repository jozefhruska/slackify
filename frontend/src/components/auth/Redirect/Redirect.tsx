import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { signIn, signInVariables } from '../../../types/generated/schema';
import { SIGN_IN } from '../../../api/mutations/auth';

/* Props - <Redirect />
============================================================================= */
type Props = {
  code: string;
};

/* <Redirect />
============================================================================= */
const Redirect: React.FunctionComponent<Props> = ({ code }) => {
  const [signInMutation, { loading, error, data }] = useMutation<signIn, signInVariables>(SIGN_IN);

  useEffect(() => {
    signInMutation({
      variables: {
        code,
      },
    });
  }, []);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  if (data?.signIn) {
    return (
      <span>
        Success! ID: {data.signIn.id} ({data.signIn.email})
      </span>
    );
  }

  return null;
};

export default Redirect;
