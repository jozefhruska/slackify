import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { AuthorizeWithSlack, AuthorizeWithSlackVariables } from '../../../types/generated/schema';
import { AUTHORIZE_WITH_SLACK } from '../../../api/mutations/auth';

/* Props - <Redirect />
============================================================================= */
type Props = {
  code: string;
};

/* <Redirect />
============================================================================= */
const Redirect: React.FunctionComponent<Props> = ({ code }) => {
  const [authorizeWithSlack, { loading, error, data }] = useMutation<
    AuthorizeWithSlack,
    AuthorizeWithSlackVariables
  >(AUTHORIZE_WITH_SLACK);

  useEffect(() => {
    authorizeWithSlack({
      variables: {
        code,
      },
    });
  }, []);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  if (data?.authorizeWithSlack) {
    return (
      <span>
        Success! ID: {data.authorizeWithSlack.id} ({data.authorizeWithSlack.email})
      </span>
    );
  }

  return null;
};

export default Redirect;
