import React from 'react';

import { Heading, Paragraph } from '../../common/typography';
import { Box, Flex } from '../../common/layout/base';
import { FiHeart, FiArrowRight, FiSlack } from 'react-icons/fi';
import theme from '../../../theme';

import * as S from './WelcomePage.styles';

/* <WelcomePage />
============================================================================= */
const WelcomePage: React.FC = () => {
  return (
    <>
      <S.WelcomeWrapper>
        <S.WelcomeSide>
          <S.Logo>
            Slackify
            <S.VersionBadge>PRE-ALPHA</S.VersionBadge>
          </S.Logo>

          <Box mb="s6">
            <Heading>Slackify is seamlessly connected with Slack.</Heading>
            <Paragraph>
              The first headless CMS designed around Slack. Manage and distribute your content in
              your favorite team messaging app.
            </Paragraph>
          </Box>

          <Flex alignItems="center" color="gray.5">
            Slackify &nbsp;
            <FiHeart />
            &nbsp; Slack.
          </Flex>
        </S.WelcomeSide>

        <S.WelcomeMain>
          <Box display={[null, null, 'none']}>
            <S.Logo>
              Slackify
              <S.VersionBadge>PRE-ALPHA</S.VersionBadge>
            </S.Logo>
          </Box>

          <Paragraph>
            To start using Slackify you need to <b>add it to your Slack workplace</b>. If you have
            already added Slackify, sign in to manage your content.
          </Paragraph>

          <S.MainActionButton href="https://slack.com/oauth/v2/authorize?scope=commands&client_id=791343423090.804137961685">
            <Flex alignItems="center">
              <FiSlack size={50} color={theme.colors.gray[4]} />
              <Box ml="s6">
                <Paragraph fontWeight="bold" mb="s1" color="gray.1">
                  Add to Slack
                </Paragraph>
                <Paragraph as="span" color="gray.3">
                  Connect Slackify with your workspace.
                </Paragraph>
              </Box>
            </Flex>

            <span>
              <FiArrowRight />
            </span>
          </S.MainActionButton>

          <S.MainActionButton href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.avatar&client_id=791343423090.804137961685">
            <Flex alignItems="center">
              <FiSlack size={50} color={theme.colors.gray[4]} />
              <Box ml="s6">
                <Paragraph fontWeight="bold" mb="s1" color="gray.1">
                  Sign in with Slack
                </Paragraph>
                <Paragraph as="span" color="gray.3">
                  Manage your content.
                </Paragraph>
              </Box>
            </Flex>

            <span>
              <FiArrowRight />
            </span>
          </S.MainActionButton>
        </S.WelcomeMain>
      </S.WelcomeWrapper>
    </>
  );
};

export default WelcomePage;
