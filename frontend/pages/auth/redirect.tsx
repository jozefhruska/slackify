import { NextPage } from 'next';

/* <RedirectPage />
============================================================================= */
const RedirectPage: NextPage = () => {
  return (
    <div>
      <span>Welcome back!</span>
    </div>
  );
};

/* getInitialProps - <RedirectPage />
============================================================================= */
RedirectPage.getInitialProps = async ({ query }) => {
  console.log(query);

  return {};
};

export default RedirectPage;
