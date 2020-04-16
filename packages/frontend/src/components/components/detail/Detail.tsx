import React, { useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { FiCopy, FiCheck } from 'react-icons/fi';

import { ComponentDetailFragment } from '../../../types/generated/graphql';
import { Grid } from '../../common/layout/base';
import { humanizeComponentType, getComponentQueryExample } from '../../../utils';
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
  const [isCopySuccessful, setCopySuccessful] = useState(false);

  const queryCode = getComponentQueryExample(component);

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

        <div>stats</div>
      </Grid>

      <Grid
        gridTemplateColumns={[null, null, 'repeat(2, 1fr)', null, null, 'repeat(3, 1fr)']}
        gridGap="s6"
        mt="s6"
      >
        <Fields component={component} />

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

        <InCollection component={component} />
      </Grid>
    </>
  );
};

export default Detail;
