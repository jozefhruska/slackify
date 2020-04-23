import React from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { useMutation } from '@apollo/client';

import {
  ComponentType,
  CreateOneComponentMutation,
  CreateOneComponentMutationVariables,
  UpdateOneComponentMutation,
  UpdateOneComponentMutationVariables,
  GetComponentsListingQuery,
  GetComponentsListingQueryVariables,
  Collection,
} from '../../../../../types/generated/graphql';
import { Box, Grid } from '../../../../common/layout/base';
import { Label, Textarea, Input } from '../../../../common/forms';
import { Button, Alert } from '../../../../common/misc';
import { CloseCreateUpdateModal } from '../../../../../actions/components';
import { selectCreateUpdateModalState } from '../../../../../selectors/components';
import { CREATE_ONE_COMPONENT, UPDATE_ONE_COMPONENT } from '../../../../../api/mutation/components';
import { selectUser } from '../../../../../selectors/auth';
import { GET_COMPONENTS_LISTING } from '../../../../../api/query/components';

/* Local types
============================================================================= */
type FormValues = {
  url: string;
  text: string;
};

/* Props - <LinkForm />
============================================================================= */
type Props = {
  collectionId?: Collection['id'];
};

/* <LinkForm />
============================================================================= */
const LinkForm: React.FC<Props> = ({ collectionId }) => {
  const state = useSelector(selectCreateUpdateModalState);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<CloseCreateUpdateModal>>();

  const [createComponent, { error: createComponentError }] = useMutation<
    CreateOneComponentMutation,
    CreateOneComponentMutationVariables
  >(CREATE_ONE_COMPONENT);

  const [updateComponent, { error: updateComponentError }] = useMutation<
    UpdateOneComponentMutation,
    UpdateOneComponentMutationVariables
  >(UPDATE_ONE_COMPONENT);

  if (state.mode === 'create' && state.collection?.type !== ComponentType.Link) {
    return null;
  }

  if (state.mode === 'update' && state.component?.type !== ComponentType.Link) {
    return null;
  }

  /* Extract custom component data */
  const componentData = state?.component?.linkData;

  const initialValues: FormValues = {
    url: componentData?.url ?? '',
    text: componentData?.text ?? '',
  };

  /* Render error if mutation failed */
  if (createComponentError || updateComponentError) {
    return (
      <Alert type="danger">{createComponentError?.message ?? updateComponentError?.message}</Alert>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ url, text }) => {
        if (state.mode === 'create') {
          await createComponent({
            variables: {
              data: {
                type: ComponentType.Link,
                linkData: {
                  create: {
                    url,
                    text,
                  },
                },
                collection: {
                  connect: {
                    id: state.collection.id,
                  },
                },
                author: {
                  connect: {
                    id: user.id,
                  },
                },
                team: {
                  connect: {
                    id: user.team.id,
                  },
                },
              },
            },
            update: (cache, { data: { createOneComponent } }) => {
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

              const updatedComponents = components.concat(createOneComponent);

              cache.writeQuery<GetComponentsListingQuery, GetComponentsListingQueryVariables>({
                query: GET_COMPONENTS_LISTING,
                data: {
                  components: updatedComponents,
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
          }).then(() => {
            dispatch({ type: '[COMPONENTS] CLOSE_CREATE_UPDATE_MODAL' });
          });
        } else {
          await updateComponent({
            variables: {
              data: {
                linkData: {
                  update: {
                    url,
                    text,
                  },
                },
              },
              where: {
                id: state.component?.id,
              },
            },
          }).then(() => {
            dispatch({ type: '[COMPONENTS] CLOSE_CREATE_UPDATE_MODAL' });
          });
        }
      }}
    >
      {({ values, isSubmitting, handleChange, handleBlur }) => (
        <Form>
          <Box mb="s6">
            <Label htmlFor="url">URL</Label>
            <Input
              type="url"
              id="url"
              name="url"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.url}
            />
          </Box>

          <Box mb="s6">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              name="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
            />
          </Box>

          <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4" mt="s12">
            <Button type="submit" variant="brand" disabled={isSubmitting} isLoading={isSubmitting}>
              {state.mode === 'create' ? 'Create' : 'Save'}
            </Button>

            <Button onClick={() => dispatch({ type: '[COMPONENTS] CLOSE_CREATE_UPDATE_MODAL' })}>
              Cancel
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LinkForm;
