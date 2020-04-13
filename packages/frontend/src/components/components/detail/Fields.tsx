import React from 'react';

import { ComponentDetailFragment, ComponentType } from '../../../types/generated/graphql';
import { Block } from '../../common/layout';
import { Grid } from '../../common/layout/base';

import * as S from './Detail.styles';

/* Props - <Fields />
============================================================================= */
type Props = {
  component: ComponentDetailFragment;
};

/* <Fields />
============================================================================= */
const Fields: React.FC<Props> = ({ component }) => (
  <Block title="Fields">
    <Grid gridGap="s6">
      {component.type === ComponentType.PlainText && (
        <div>
          <S.MetaTitle>Text</S.MetaTitle>
          <span>{component.plainTextData.text}</span>
        </div>
      )}

      {component.type === ComponentType.Article && (
        <>
          <div>
            <S.MetaTitle>Title</S.MetaTitle>
            <span>{component.articleData.title}</span>
          </div>

          {component.articleData.lead && (
            <div>
              <S.MetaTitle>Lead</S.MetaTitle>
              <span>{component.articleData.lead}</span>
            </div>
          )}

          <div>
            <S.MetaTitle>Content</S.MetaTitle>
            <span>{component.articleData.content}</span>
          </div>
        </>
      )}

      {component.type === ComponentType.Link && (
        <>
          <div>
            <S.MetaTitle>URL</S.MetaTitle>
            <a href={component.linkData.url} target="_blank" rel="noopener noreferrer">
              {component.linkData.url}
            </a>
          </div>

          {component.linkData.text && (
            <div>
              <S.MetaTitle>Text</S.MetaTitle>
              <span>{component.linkData.text}</span>
            </div>
          )}
        </>
      )}
    </Grid>
  </Block>
);

export default Fields;
