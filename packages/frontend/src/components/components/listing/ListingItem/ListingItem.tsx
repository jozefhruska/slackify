import React from 'react';
import moment from 'moment';
import { FiEye, FiEyeOff, FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useMutation } from '@apollo/client';

import {
  GetComponentsListingQuery,
  ComponentType,
  UpdateOneComponentMutationVariables,
  DeleteOneComponentMutation,
  DeleteOneComponentMutationVariables,
  UpdateOneComponentMutation,
} from '../../../../types/generated/graphql';
import { PlainTextContent, ArticleContent, LinkContent } from './types';
import { Grid, Flex } from '../../../common/layout/base';
import { Button, PopperButton } from '../../../common/misc';
import { OpenCreateUpdateModal } from '../../../../actions/components';
import { UPDATE_ONE_COMPONENT, DELETE_ONE_COMPONENT } from '../../../../api/mutation/components';

import * as S from './ListingItem.styles';
import Link from 'next/link';

/* Props - <ListingItem />
============================================================================= */
type Props = {
  component: GetComponentsListingQuery['components'][0];
};

/* <ListingItem />
============================================================================= */
const ListingItem: React.FC<Props> = ({ component }) => {
  const dispatch = useDispatch<Dispatch<OpenCreateUpdateModal>>();

  const [deleteComponent, { loading: deleteLoading }] = useMutation<
    DeleteOneComponentMutation,
    DeleteOneComponentMutationVariables
  >(DELETE_ONE_COMPONENT);

  const [updateComponent, { loading: updateLoading }] = useMutation<
    UpdateOneComponentMutation,
    UpdateOneComponentMutationVariables
  >(UPDATE_ONE_COMPONENT);

  if (!component) {
    return null;
  }

  return (
    <S.Wrapper>
      {component.type === ComponentType.PlainText && <PlainTextContent component={component} />}
      {component.type === ComponentType.Article && <ArticleContent component={component} />}
      {component.type === ComponentType.Link && <LinkContent component={component} />}

      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4">
        <Flex alignItems="center" color="gray.5">
          {moment(component.updatedAt).fromNow()}
        </Flex>

        <Grid gridTemplateColumns="1fr auto" gridColumnGap="s4">
          <Link href="/components/[id]" as={`/components/${component.id}`}>
            <Button variant="brand">View</Button>
          </Link>

          <PopperButton
            options={[
              {
                icon: component.published ? <FiEye /> : <FiEyeOff />,
                isLoading: updateLoading,
                onClick: async () => {
                  await updateComponent({
                    variables: {
                      data: {
                        published: !component?.published,
                      },
                      where: {
                        id: component.id,
                      },
                    },
                  });
                },
              },
              {
                icon: <FiEdit />,
                variant: 'info',
                onClick: () => {
                  dispatch({
                    type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                    payload: {
                      state: {
                        mode: 'update',
                        component,
                      },
                    },
                  });
                },
              },
              {
                icon: <FiTrash2 />,
                isLoading: deleteLoading,
                variant: 'danger',
                onClick: async () => {
                  if (confirm('Are you sure you want do delete this component?')) {
                    await deleteComponent({
                      variables: {
                        where: {
                          id: component?.id,
                        },
                      },
                    });
                  }
                },
              },
            ]}
          >
            {(ref, onClick) => <Button ref={ref} onClick={onClick} icon={<FiMoreVertical />} />}
          </PopperButton>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};

export default ListingItem;
