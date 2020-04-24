import React from 'react';
import moment from 'moment';
import { FiEye, FiEyeOff, FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { useMutation } from '@apollo/client';
import Link from 'next/link';

import {
  ComponentType,
  UpdateOneComponentMutationVariables,
  DeleteOneComponentMutation,
  DeleteOneComponentMutationVariables,
  UpdateOneComponentMutation,
  ComponentListingFragment,
  GetComponentsListingQuery,
  GetComponentsListingQueryVariables,
  Collection,
} from '../../../../types/generated/graphql';
import { PlainTextContent, ArticleContent, LinkContent } from './types';
import { Grid, Flex } from '../../../common/layout/base';
import { Button, PopperButton } from '../../../common/misc';
import { OpenCreateUpdateModal } from '../../../../actions/components';
import { UPDATE_ONE_COMPONENT, DELETE_ONE_COMPONENT } from '../../../../api/mutation/components';
import { GET_COMPONENTS_LISTING } from '../../../../api/query/components';
import { selectUser } from '../../../../selectors/auth';

import * as S from './ListingItem.styles';
import { canManageComponents, canCreateComponents } from '../../../../utils/users';

/* Props - <ListingItem />
============================================================================= */
type Props = {
  component: ComponentListingFragment;
  collectionId?: Collection['id'];
};

/* <ListingItem />
============================================================================= */
const ListingItem: React.FC<Props> = ({ component, collectionId }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<OpenCreateUpdateModal>>();

  const [deleteComponent, { loading: deleteLoading }] = useMutation<
    DeleteOneComponentMutation,
    DeleteOneComponentMutationVariables
  >(DELETE_ONE_COMPONENT, {
    update: (cache, { data: { deleteOneComponent } }) => {
      const { components: components } = cache.readQuery<
        GetComponentsListingQuery,
        GetComponentsListingQueryVariables
      >({
        query: GET_COMPONENTS_LISTING,
        variables: {
          where: {
            team: {
              id: {
                equals: user?.team.id,
              },
            },
            collection: {
              id: {
                equals: collectionId,
              },
            },
          },
          first: 40,
        },
      });

      cache.writeQuery<GetComponentsListingQuery, GetComponentsListingQueryVariables>({
        query: GET_COMPONENTS_LISTING,
        data: {
          components: components.filter((component) => component.id !== deleteOneComponent?.id),
        },
        variables: {
          where: {
            team: {
              id: {
                equals: user?.team.id,
              },
            },
            collection: {
              id: {
                equals: collectionId,
              },
            },
          },
          first: 40,
        },
      });

      cache.gc();
    },
  });

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
            options={(closePopper) => [
              {
                icon: component.published ? <FiEye /> : <FiEyeOff />,
                isLoading: updateLoading,
                disabled: !canManageComponents(user?.role),
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
                disabled: !canCreateComponents(user?.role),
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

                  closePopper();
                },
              },
              {
                icon: <FiTrash2 />,
                isLoading: deleteLoading,
                disabled: !canManageComponents(user?.role),
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

                    closePopper();
                  }
                },
              },
            ]}
          >
            {(ref, onClick) => (
              <Button
                ref={ref}
                onClick={onClick}
                icon={<FiMoreVertical />}
                disabled={!canCreateComponents(user?.role)}
              />
            )}
          </PopperButton>
        </Grid>
      </Grid>
    </S.Wrapper>
  );
};

export default ListingItem;
