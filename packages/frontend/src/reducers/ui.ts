import { Reducer } from 'redux';

import { UIAction } from '../actions/ui';

/* State type - UIReducer
============================================================================= */
export type UIState = {
  isNavigationOpen: boolean;
  isSidebarOpen: boolean;
};

/* Initial state - UIReducer
============================================================================= */
const INITIAL_STATE: UIState = {
  isNavigationOpen: false,
  isSidebarOpen: false,
};

/* UIReducer
============================================================================= */
const UIReducer: Reducer<UIState, UIAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '[UI] OPEN_NAVIGATION': {
      return Object.assign<{}, UIState, Pick<UIState, 'isNavigationOpen'>>({}, state, {
        isNavigationOpen: true,
      });
    }

    case '[UI] CLOSE_NAVIGATION': {
      return Object.assign<{}, UIState, Pick<UIState, 'isNavigationOpen'>>({}, state, {
        isNavigationOpen: false,
      });
    }

    case '[UI] OPEN_SIDEBAR': {
      return Object.assign<{}, UIState, Pick<UIState, 'isSidebarOpen'>>({}, state, {
        isSidebarOpen: true,
      });
    }

    case '[UI] CLOSE_SIDEBAR': {
      return Object.assign<{}, UIState, Pick<UIState, 'isSidebarOpen'>>({}, state, {
        isSidebarOpen: false,
      });
    }

    default: {
      return state;
    }
  }
};

export default UIReducer;
