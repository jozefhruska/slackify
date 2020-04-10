import { Reducer } from 'redux';

import { ComponentsAction } from '../actions/components';
import { CreateUpdateModalState } from '../types/components';

/* State type - componentsReducer
============================================================================= */
export type ComponentsState = {
  createUpdateModal: CreateUpdateModalState;
};

/* Initial state - componentsReducer
============================================================================= */
const INITIAL_STATE: ComponentsState = {
  createUpdateModal: null,
};

/* componentsReducer
============================================================================= */
const componentsReducer: Reducer<ComponentsState, ComponentsAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL': {
      const { state: createUpdateModal } = action.payload;

      return Object.assign({}, state, {
        createUpdateModal: {
          ...state.createUpdateModal,
          ...createUpdateModal,
        },
      });
    }

    case '[COMPONENTS] CLOSE_CREATE_UPDATE_MODAL': {
      return Object.assign({}, state, {
        createUpdateModal: null,
      });
    }

    default: {
      return state;
    }
  }
};

export default componentsReducer;
