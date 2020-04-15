import React from 'react';
import moment from 'moment';

import { CollectionDetailFragment, User } from '../../../types/generated/graphql';
import { Grid, Box } from '../../common/layout/base';
import { humanizeComponentType } from '../../../utils';
import ListingPage from '../../components/listing/ListingPage/ListingPage';

import * as S from './Detail.styles';
import { Heading } from '../../common/typography';

/* Props - <Detail />
============================================================================= */
type Props = {
  user: User;
  collection: CollectionDetailFragment;
};

/* <Detail />
============================================================================= */
const Detail: React.FC<Props> = ({ user, collection }) => {
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

      <Box mt="s6">
        <Heading as="h2" mb="s6">
          Components
        </Heading>
        <ListingPage user={user} collectionId={collection.id} />
      </Box>
    </>
  );
};

export default Detail;
