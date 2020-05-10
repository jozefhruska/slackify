import React, { useState } from 'react';
import moment from 'moment';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { FiCheck, FiCopy } from 'react-icons/fi';

import { CollectionDetailFragment, UserDetailFragment } from '../../../types/generated/graphql';
import { Grid, Box } from '../../common/layout/base';
import { humanizeComponentType } from '../../../utils';
import ListingPage from '../../components/listing/ListingPage/ListingPage';
import { Heading } from '../../common/typography';

import * as S from './Detail.styles';

/* Props - <Detail />
============================================================================= */
type Props = {
  user: UserDetailFragment;
  collection: CollectionDetailFragment;
};

/* <Detail />
============================================================================= */
const Detail: React.FC<Props> = ({ user, collection }) => {
  const [isCopySuccessful, setCopySuccessful] = useState(false);

  const queryCode = [
    'query {',
    `  collection(where: { id: "${collection.id}" }) {`,
    '    id',
    '    ... # Any collection properties',
    '  }',
    '}',
  ].join('\n');

  return (
    <>
      <Grid gridTemplateColumns={[null, null, null, '6fr 4fr']} gridGap="s6">
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

        <S.QueryWrapper>
          <S.QueryLabelBar>
            <S.QueryCopyButton
              data-clipboard-text={queryCode}
              onSuccess={() => {
                setCopySuccessful(true);

                setTimeout(() => {
                  setCopySuccessful(false);
                }, 1500);
              }}
            >
              {isCopySuccessful ? <FiCheck /> : <FiCopy />}
            </S.QueryCopyButton>
            <S.QueryLabel>{isCopySuccessful ? 'Copied...' : 'Query example'}</S.QueryLabel>
          </S.QueryLabelBar>

          <Highlight {...defaultProps} code={queryCode} language="graphql">
            {({ className, tokens, getLineProps, getTokenProps }) => (
              <pre className={className}>
                {tokens.map((line, i) => (
                  // eslint-disable-next-line react/jsx-key
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      // eslint-disable-next-line react/jsx-key
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </S.QueryWrapper>
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
