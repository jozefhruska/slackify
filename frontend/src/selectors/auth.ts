import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const getAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(getAuthState, state => state.user);
