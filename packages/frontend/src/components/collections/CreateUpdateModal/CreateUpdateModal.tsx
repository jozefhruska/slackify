import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { Modal, Button } from '../../common/misc';
import { CloseCreateUpdateModal } from '../../../actions/collections';
import { selectCreateUpdateModalState } from '../../../selectors/collections';
import {
  ComponentType,
  CreateOneCollectionMutation,
  CreateOneCollectionMutationVariables,
  UpdateOneCollectionMutation,
  UpdateOneCollectionMutationVariables,
  GetCollectionsListingQuery,
  GetCollectionsListingQueryVariables,
} from '../../../types/generated/graphql';
import { Input, Label, Select, Textarea } from '../../common/forms';
import { Box, Grid } from '../../common/layout/base';
import { COMPONENT_TYPE_OPTIONS } from '../../../constants';
import { useMutation } from '@apollo/client';
import { CREATE_ONE_COLLECTION, UPDATE_ONE_COLLECTION } from '../../../api/mutation/collections';
import { selectUser } from '../../../selectors/auth';
import { GET_COLLECTIONS_LISTING } from '../../../api/query/collections';

/* Local types
============================================================================= */
type FormValues = {
  name: string;
  type: ComponentType;
  description: string;
};

/* <CreateUpdateModal />
============================================================================= */
const CreateUpdateModal: React.FC = () => {
  const state = useSelector(selectCreateUpdateModalState);
  const user = useSelector(selectUser);
  const dispatch = useDispatch<Dispatch<CloseCreateUpdateModal>>();

  const [createCollection] = useMutation<
    CreateOneCollectionMutation,
    CreateOneCollectionMutationVariables
  >(CREATE_ONE_COLLECTION);
  const [updateCollection] = useMutation<
    UpdateOneCollectionMutation,
    UpdateOneCollectionMutationVariables
  >(UPDATE_ONE_COLLECTION);

  if (!state) {
    return null;
  }

  const initialValues: FormValues = {
    name: state.collection?.name ?? '',
    type: state.collection?.type ?? ComponentType.PlainText,
    description: state.collection?.description ?? '',
  };

  return (
    <Modal
      open={Boolean(state)}
      onClose={() => dispatch({ type: '[COLLECTIONS] CLOSE_CREATE_UPDATE_MODAL' })}
      title={`${state.mode === 'create' ? 'Create new' : 'Update'} collection`}
    >
      <Box width={['100%', null, '500px']}>
        <Formik
          initialValues={initialValues}
          onSubmit={async ({ name, type, description }) => {
            if (state.mode === 'create') {
              await createCollection({
                variables: {
                  data: {
                    name,
                    type,
                    description,
                    team: {
                      connect: {
                        id: user.team.id,
                      },
                    },
                  },
                },
                update: (cache, { data: { createOneCollection } }) => {
                  const { collections: collections } = cache.readQuery<
                    GetCollectionsListingQuery,
                    GetCollectionsListingQueryVariables
                  >({
                    query: GET_COLLECTIONS_LISTING,
                    variables: {
                      first: 40,
                    },
                  });

                  cache.writeQuery<GetCollectionsListingQuery, GetCollectionsListingQueryVariables>(
                    {
                      query: GET_COLLECTIONS_LISTING,
                      data: {
                        collections: collections.concat([createOneCollection]),
                      },
                      variables: {
                        first: 40,
                      },
                    }
                  );
                },
              });
            } else {
              await updateCollection({
                variables: {
                  data: {
                    name,
                    description,
                  },
                  where: {
                    id: state.collection.id,
                  },
                },
              });
            }

            dispatch({ type: '[COLLECTIONS] CLOSE_CREATE_UPDATE_MODAL' });
          }}
        >
          {({ isSubmitting, values, handleChange, handleBlur }) => (
            <Form>
              <Box mb="s6">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </Box>

              <Box mb="s6">
                <Label htmlFor="type">Type</Label>
                <Select
                  id="type"
                  name="type"
                  disabled={state.mode === 'update'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}
                >
                  {COMPONENT_TYPE_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box mb="s6">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </Box>

              <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="s4" mt="s12">
                <Button
                  type="submit"
                  variant="brand"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {state.mode === 'create' ? 'Create' : 'Save'}
                </Button>

                <Button
                  onClick={() => dispatch({ type: '[COLLECTIONS] CLOSE_CREATE_UPDATE_MODAL' })}
                >
                  Cancel
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default CreateUpdateModal;
