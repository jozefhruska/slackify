import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { AppState, rootReducer } from './reducers';
import { AppAction } from './actions';

export const configureStore = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return createStore<AppState, AppAction, never, never>(rootReducer, devToolsEnhancer());
};
