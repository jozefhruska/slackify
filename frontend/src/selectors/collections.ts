import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const getAuthState = (state: AppState) => state.collections;

export const selectCreateUpdateModalState = createSelector(
  getAuthState,
  state => state.createUpdateModal
);
