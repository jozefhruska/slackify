import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import { withApollo } from '../../src/api';

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
  return { code: code as string };
};

export default withApollo(RedirectPage);
