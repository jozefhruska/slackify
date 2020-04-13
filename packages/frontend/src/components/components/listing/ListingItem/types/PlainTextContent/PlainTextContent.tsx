import React from 'react';

import {
  GetComponentsListingQuery,
  ComponentType,
} from '../../../../../../types/generated/graphql';
import { Box, Grid } from '../../../../../common/layout/base';
import { Paragraph } from '../../../../../common/typography';
import { humanizeComponentType, getShortenedText } from '../../../../../../utils';

import * as S from '../../ListingItem.styles';

/* Props - <PlainTextContent />
============================================================================= */
type Props = {
  component: GetComponentsListingQuery['components'][0];
};

/* <PlainTextContent />
============================================================================= */
const PlainTextContent: React.FC<Props> = ({ component }) => {
  if (component?.type !== ComponentType.PlainText) {
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

        <Paragraph>{getShortenedText(component.plainTextData?.text)}</Paragraph>
      </Box>
    </>
  );
};

export default PlainTextContent;
