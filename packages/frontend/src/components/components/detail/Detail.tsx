import React from 'react';
import moment from 'moment';
import Link from 'next/link';

import { ComponentDetailFragment } from '../../../types/generated/graphql';
import { Grid } from '../../common/layout/base';
import { humanizeComponentType } from '../../../utils';
import Fields from './Fields';
import InCollection from './InCollection';

import * as S from './Detail.styles';

/* Props - <Detail />
============================================================================= */
type Props = {
  component: ComponentDetailFragment;
};

/* <Detail />
============================================================================= */
const Detail: React.FC<Props> = ({ component }) => {
  return (
    <>
      <Grid gridTemplateColumns={[null, null, '2fr 1fr']} gridGap="s6">
        <S.MetaWrapper>
          <div>
            <S.MetaTitle>ID:</S.MetaTitle>
            <span>{component.id}</span>
          </div>

          <div>
            <S.MetaTitle>Type:</S.MetaTitle>
            <span>{humanizeComponentType(component.type)}</span>
          </div>

          <div>
            <S.MetaTitle>Collection:</S.MetaTitle>
            <Link href={`/collections/${component.collection.id}`}>
              <a>{component.collection.name}</a>
            </Link>
          </div>

          <div>
            <S.MetaTitle>Author:</S.MetaTitle>
            <span>{component.author.name}</span>
          </div>

          <div>
            <S.MetaTitle>Created at:</S.MetaTitle>
            <span> {moment(component.createdAt).fromNow()}</span>
          </div>

          <div>
            <S.MetaTitle>Updated at:</S.MetaTitle>
            <span> {moment(component.updatedAt).fromNow()}</span>
          </div>
        </S.MetaWrapper>

        <div>how to get</div>
      </Grid>

      <Grid gridTemplateColumns={[null, 'repeat(3, 1fr)']} gridGap="s6" mt="s6">
        <Fields component={component} />

        <div>stats</div>

        <InCollection component={component} />
      </Grid>
    </>
  );
};

export default Detail;
