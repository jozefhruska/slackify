import React from 'react';
import Link, { LinkProps } from 'next/link';

import { Box, Flex } from '../base';
import { Heading } from '../../typography';

import * as S from './PageHeader.styles';

/* Props - <PageHeader />
============================================================================= */
type Props = {
  heading: string;
  breadcrumbs?: Array<{
    text: string;
    link?: LinkProps;
  }>;
};

/* <PageHeader />
============================================================================= */
const PageHeader: React.FC<Props> = ({ heading, breadcrumbs, children }) => {
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
        flexDirection={['column', 'row']}
        alignItems={[null, null, 'center']}
        justifyContent="space-between"
        mt={breadcrumbs ? 's6' : 0}
      >
        <Heading mb={[null, 0]}>{heading}</Heading>

        <Box ml={[0, 's4']}>{children}</Box>
      </Flex>
    </Box>
  );
};

export default PageHeader;
