import { createSelector } from 'reselect';

import { AppState } from '../reducers';

const getState = (state: AppState) => state.collections;

export const selectCreateUpdateModalState = createSelector(
  getState,
  state => state.createUpdateModal
);
