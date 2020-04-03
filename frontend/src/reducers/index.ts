import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth';
import collectionsReducer, { CollectionsState } from './collections';
import componentsReducer, { ComponentsState } from './components';

/* State type - rootReducer
============================================================================= */
export type AppState = {
  auth: AuthState;
  collections: CollectionsState;
  components: ComponentsState;
};

/* rootReducer
============================================================================= */
export const rootReducer = combineReducers({
  auth: authReducer,
  collections: collectionsReducer,
  components: componentsReducer,
});
