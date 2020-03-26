import React from 'react';
import Link, { LinkProps } from 'next/link';

import { Box, Flex, Grid } from '../base';
import { Heading } from '../../typography';

import * as S from './PageHeader.styles';
import { Button } from '../../misc';
import { ButtonProps } from '../../misc/Button/Button';

/* Props - <PageHeader />
============================================================================= */
type Props = {
  heading: string;
  breadcrumbs?: Array<{
    text: string;
    link?: LinkProps;
  }>;
  primaryButton?: {
    text: string;
  } & ButtonProps;
  secondaryButton?: {
    text: string;
  } & ButtonProps;
};

/* <PageHeader />
============================================================================= */
const PageHeader: React.FC<Props> = ({ heading, breadcrumbs, primaryButton, secondaryButton }) => {
  return (
    <Box as="header" mb="s10">
      {breadcrumbs && (
        <S.Breadcrumbs>
          <S.BreadcrumbsItem>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
          </S.BreadcrumbsItem>

          {breadcrumbs.map((crumb, key) => (
            <S.BreadcrumbsItem key={key}>
              {crumb?.link ? (
                <Link {...crumb.link}>
                  <a>{crumb.text}</a>
                </Link>
              ) : (
                <>{crumb.text}</>
              )}
            </S.BreadcrumbsItem>
          ))}
        </S.Breadcrumbs>
      )}

      <Flex
        flexDirection={['column', null, 'row']}
        alignItems={[null, null, 'center']}
        justifyContent="space-between"
        mt={breadcrumbs ? 's6' : 0}
      >
        <Flex alignItems="center">
          <Heading mb={[primaryButton || secondaryButton ? 's6' : 0, null, 0]}>{heading}</Heading>

          <Box display={['none', null, 'block']} ml="s4">
            {secondaryButton && <Button {...secondaryButton}>{secondaryButton.text}</Button>}
          </Box>
        </Flex>

        <Box display={['none', null, 'block']}>
          {primaryButton && (
            <Button variant="brand" {...primaryButton}>
              {primaryButton.text}
            </Button>
          )}
        </Box>

        <Grid display={['grid', null, 'none']} gridAutoColumns="1fr" gridGap="s4">
          {secondaryButton && <Button {...secondaryButton}></Button>}
          {primaryButton && (
            <Button variant="brand" {...primaryButton}>
              {!secondaryButton ? primaryButton.text : ''}
            </Button>
          )}
        </Grid>
      </Flex>
    </Box>
  );
};

export default PageHeader;
