import React from 'react';

import {
  GetComponentsListingQuery,
  ComponentType,
} from '../../../../../../types/generated/graphql';
import { Box, Grid } from '../../../../../common/layout/base';
import { Paragraph } from '../../../../../common/typography';
import { humanizeComponentType, getShortenedText } from '../../../../../../utils';

import * as S from '../../ListingItem.styles';

/* Props - <LinkContent />
============================================================================= */
type Props = {
  component: GetComponentsListingQuery['components'][0];
};

/* <LinkContent />
============================================================================= */
const LinkContent: React.FC<Props> = ({ component }) => {
  if (component?.type !== ComponentType.Link) {
    return null;
  }

  return (
    <>
      <Box>
        <Box mb="s8">
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

        <Paragraph>
          <a href={component.linkData.url} target="_blank" rel="noopener noreferrer">
            {component.linkData.url}
          </a>
        </Paragraph>

        {component.linkData?.text && (
          <Paragraph>{getShortenedText(component.linkData.text)}</Paragraph>
        )}
      </Box>
    </>
  );
};

export default LinkContent;
