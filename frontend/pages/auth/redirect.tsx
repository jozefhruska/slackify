import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useMutation } from '@apollo/react-hooks';

import { withApollo } from '../../src/api';
import { AUTHORIZE_WITH_SLACK } from '../../src/api/mutations/auth';
import { AuthorizeWithSlack, AuthorizeWithSlackVariables } from '../../src/types/generated/schema';

const Redirect = dynamic(() => import('../../src/components/auth').then(mod => mod.Redirect), {
  ssr: false,
});

/* Props - <RedirectPage />
============================================================================= */
type Props = {
  code: string;
};

/* <RedirectPage />
============================================================================= */
const RedirectPage: NextPage<Props> = ({ code }) => <Redirect code={code} />;

/* getInitialProps - <RedirectPage />
============================================================================= */
RedirectPage.getInitialProps = async ({ query: { code } }) => {
  return { code: typeof code === 'string' ? code : '' };
};

export default withApollo(RedirectPage);
