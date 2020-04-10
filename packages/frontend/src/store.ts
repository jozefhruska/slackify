import { createStore } from 'redux';

import { AppState, rootReducer } from './reducers';
import { AppAction } from './actions';

export const configureStore = () => {
  return createStore<AppState, AppAction, never, never>(rootReducer);
};
