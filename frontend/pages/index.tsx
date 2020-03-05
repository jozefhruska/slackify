import React from 'react';
import { NextPage } from 'next';
import { getAuthToken } from '../src/cookies';

/* <HomePage /> - Props
============================================================================= */
type Props = {
  authToken: string;
};

/* <HomePage />
============================================================================= */
const HomePage: NextPage<Props> = ({ authToken }) => {
  if (authToken) {
    return <span>Signed in.</span>;
  }

  return (
    <div>
      <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email&client_id=791343423090.804137961685">
        <img
          alt="Sign in with Slack"
          height="40"
          width="172"
          src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
          srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
        />
      </a>
    </div>
  );
};

/* <HomePage /> - getInitialProps
============================================================================= */
HomePage.getInitialProps = ctx => {
  const authToken = getAuthToken(ctx);

  return { authToken };
};

export default HomePage;
