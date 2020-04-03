import { createSelector } from 'reselect';

import { AppState } from '../reducers';

const getState = (state: AppState) => state.components;

export const selectCreateUpdateModalState = createSelector(
  getState,
  state => state.createUpdateModal
);
