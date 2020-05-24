import React from 'react';

import { ComponentType, Component } from '../../../../../../types/generated/graphql';
import { Box, Grid } from '../../../../../common/layout/base';
import { Paragraph, Heading } from '../../../../../common/typography';
import { humanizeComponentType, getShortenedText } from '../../../../../../utils';

import * as S from '../../ListingItem.styles';

/* Props - <ArticleContent />
============================================================================= */
type Props = {
  component: Partial<Component>;
};

/* <ArticleContent />
============================================================================= */
const ArticleContent: React.FC<Props> = ({ component }) => {
  if (component?.type !== ComponentType.Article) {
    return null;
  }

  return (
    <>
      <Box>
        <Box mb="s8">
          <Heading as="h3" mb="s6">
            {component.articleData?.title}
          </Heading>

          <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4">
            <Box>
              <S.MetaTitle>Type</S.MetaTitle>
              <span>{humanizeComponentType(component.type)}</span>
            </Box>

            <Box>
              <S.MetaTitle>Author</S.MetaTitle>
              <span>{component.author.name}</span>
            </Box>
          </Grid>
        </Box>

        {component.articleData?.lead && (
          <Paragraph>{getShortenedText(component.articleData.lead)}</Paragraph>
        )}
      </Box>
    </>
  );
};

export default ArticleContent;
