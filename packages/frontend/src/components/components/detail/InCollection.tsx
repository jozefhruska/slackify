import React from 'react';
import Link from 'next/link';
import moment from 'moment';

import { ComponentDetailFragment } from '../../../types/generated/graphql';
import { Block } from '../../common/layout';
import { Box } from '../../common/layout/base';
import { Paragraph } from '../../common/typography';
import { Alert } from '../../common/misc';

import * as S from './Detail.styles';

/* Props - <InCollection />
============================================================================= */
type Props = {
  component: ComponentDetailFragment;
};

/* <InCollection />
============================================================================= */
const InCollection: React.FC<Props> = ({ component: displayedComponent }) => {
  if (!displayedComponent) {
    return null;
  }

  /* Filter out currently displayed component */
  const filteredComponents = displayedComponent.collection?.components.filter(
    (component) => component.id !== displayedComponent.id
  );

  return (
    <Block title={displayedComponent.collection.name}>
      {Boolean(filteredComponents.length) ? (
        <>
          {filteredComponents.map((component) => (
            <Link key={component.id} href="/components/[id]" as={`/components/${component.id}`}>
              <S.InCollectionComponentPreview>
                <Box>
                  <Paragraph mb="s2" fontWeight="bold">
                    {component.type}
                  </Paragraph>
                  <S.InCollectionComponentPreviewInfo>
                    {displayedComponent.collection.name}
                  </S.InCollectionComponentPreviewInfo>
                </Box>

                <S.InCollectionComponentPreviewInfo>
                  {moment(component.updatedAt).fromNow()}
                </S.InCollectionComponentPreviewInfo>
              </S.InCollectionComponentPreview>
            </Link>
          ))}
        </>
      ) : (
        <Alert>
          There are no other components in &quot;{displayedComponent.collection.name}&quot;
        </Alert>
      )}
    </Block>
  );
};

export default InCollection;
