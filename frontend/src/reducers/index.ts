import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth';
import collectionsReducer, { CollectionsState } from './collections';

/* State type - rootReducer
============================================================================= */
export type AppState = {
  auth: AuthState;
  collections: CollectionsState;
};

/* rootReducer
============================================================================= */
export const rootReducer = combineReducers({
  auth: authReducer,
  collections: collectionsReducer,
});
