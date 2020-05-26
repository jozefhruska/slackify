import { createSelector } from 'reselect';

import { AppState } from '../reducers';

const getState = (state: AppState) => state.auth;

export const selectUser = createSelector(getState, (state) => state.user);
