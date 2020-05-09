import React from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import { Modal, Alert, Loader } from '../../common/misc';
import { CloseCreateUpdateModal, OpenCreateUpdateModal } from '../../../actions/components';
import { selectCreateUpdateModalState } from '../../../selectors/components';
import { Box, Flex } from '../../common/layout/base';
import {
  GetCollectionsOptionsQuery,
  GetCollectionsOptionsQueryVariables,
  Collection,
} from '../../../types/generated/graphql';
import { Label, Select } from '../../common/forms';
import { PlainTextForm, ArticleForm, LinkForm } from './forms';
import { GET_COLLECTIONS_OPTIONS } from '../../../api/query/collections';

import * as S from './CreateUpdateModal.styles';

/* Props - <ModalContent />
============================================================================= */
type ModalContentProps = {
  collectionId?: Collection['id'];
};

/* <ModalContent />
============================================================================= */
const ModalContent: React.FC<ModalContentProps> = ({ collectionId }) => {
  const state = useSelector(selectCreateUpdateModalState);
  const dispatch = useDispatch<Dispatch<OpenCreateUpdateModal>>();

  const { data, error } = useQuery<GetCollectionsOptionsQuery, GetCollectionsOptionsQueryVariables>(
    GET_COLLECTIONS_OPTIONS
  );

  /* Render error if query failed */
  if (error) {
    return <Alert type="danger">{error.message}</Alert>;
  }

  if (state.mode === 'create' && !data?.collections) {
    return (
      <Flex justifyContent="center" mt="s6">
        <Loader />
      </Flex>
    );
  }

  return (
    <>
      {state.mode === 'create' && (
        <>
          <Box>
            <Label htmlFor="type">Collection</Label>
            <Select
              id="collection"
              name="collection"
              value={state.collection?.id ?? ''}
              onChange={({ target }) => {
                const collection = data?.collections?.find(({ id }) => target?.value === id);

                dispatch({
                  type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                  payload: {
                    state: {
                      ...state,
                      collection,
                    },
                  },
                });
              }}
            >
              <option value="" disabled>
                -- Select --
              </option>

              {data?.collections.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>

          <S.Divider />
        </>
      )}

      <PlainTextForm collectionId={collectionId} />
      <ArticleForm collectionId={collectionId} />
      <LinkForm collectionId={collectionId} />
    </>
  );
};

/* Props - <CreateUpdateModal />
============================================================================= */
type CreateUpdateModalProps = {
  collectionId?: Collection['id'];
};

/* <CreateUpdateModal />
============================================================================= */
const CreateUpdateModal: React.FC<CreateUpdateModalProps> = ({ collectionId }) => {
  const state = useSelector(selectCreateUpdateModalState);
  const dispatch = useDispatch<Dispatch<CloseCreateUpdateModal>>();

  if (!state) {
    return null;
  }

  return (
    <Modal
      open={Boolean(state)}
      onClose={() => dispatch({ type: '[COMPONENTS] CLOSE_CREATE_UPDATE_MODAL' })}
      title={`${state.mode === 'create' ? 'Create new' : 'Update'} component`}
    >
      <Box width={['100%', null, '500px']}>
        <ModalContent collectionId={collectionId} />
      </Box>
    </Modal>
  );
};

export default CreateUpdateModal;
