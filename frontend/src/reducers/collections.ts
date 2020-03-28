import { Reducer } from 'redux';

import { CollectionsAction } from '../actions/collections';
import { CreateUpdateModalState } from '../types/collections';

/* State type - collectionsReducer
============================================================================= */
export type CollectionsState = {
  createUpdateModal: CreateUpdateModalState;
};

/* Initial state - collectionsReducer
============================================================================= */
const INITIAL_STATE: CollectionsState = {
  createUpdateModal: null,
};

/* collectionsReducer
============================================================================= */
const collectionsReducer: Reducer<CollectionsState, CollectionsAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL': {
      const { state: createUpdateModal } = action.payload;

      return Object.assign({}, state, {
        createUpdateModal: {
          ...state.createUpdateModal,
          ...createUpdateModal,
        },
      });
    }

    case '[COLLECTIONS] CLOSE_CREATE_UPDATE_MODAL': {
      return Object.assign({}, state, {
        createUpdateModal: null,
      });
    }

    default: {
      return state;
    }
  }
};

export default collectionsReducer;
