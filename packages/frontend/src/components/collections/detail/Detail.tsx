import React from 'react';
import moment from 'moment';

import { CollectionDetailFragment } from '../../../types/generated/graphql';
import { Grid } from '../../common/layout/base';
import { humanizeComponentType } from '../../../utils';

import * as S from './Detail.styles';

/* Props - <Detail />
============================================================================= */
type Props = {
  collection: CollectionDetailFragment;
};

/* <Detail />
============================================================================= */
const Detail: React.FC<Props> = ({ collection }) => {
  return (
    <>
      <Grid gridTemplateColumns={[null, null, '2fr 1fr']} gridGap="s6">
        <S.MetaWrapper>
          <div>
            <S.MetaTitle>ID:</S.MetaTitle>
            <span>{collection.id}</span>
          </div>

          <div>
            <S.MetaTitle>Type:</S.MetaTitle>
            <span>{humanizeComponentType(collection.type)}</span>
          </div>

          <div>
            <S.MetaTitle>Name:</S.MetaTitle>
            <span>{collection.name}</span>
          </div>

          <div>
            <S.MetaTitle>Components:</S.MetaTitle>
            <span>{collection.componentsCount}</span>
          </div>

          <div>
            <S.MetaTitle>Created at:</S.MetaTitle>
            <span>{moment(collection.createdAt).fromNow()}</span>
          </div>

          <div>
            <S.MetaTitle>Updated at:</S.MetaTitle>
            <span>{moment(collection.updatedAt).fromNow()}</span>
          </div>
        </S.MetaWrapper>

        <S.QueryWrapper>how to get</S.QueryWrapper>
      </Grid>
    </>
  );
};

export default Detail;
