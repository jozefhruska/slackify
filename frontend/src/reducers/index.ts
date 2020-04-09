import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth';
import collectionsReducer, { CollectionsState } from './collections';
import componentsReducer, { ComponentsState } from './components';
import UIReducer, { UIState } from './ui';

/* State type - rootReducer
============================================================================= */
export type AppState = {
  auth: AuthState;
  collections: CollectionsState;
  components: ComponentsState;
  ui: UIState;
};

/* rootReducer
============================================================================= */
export const rootReducer = combineReducers({
  auth: authReducer,
  collections: collectionsReducer,
  components: componentsReducer,
  ui: UIReducer,
});
