import { createSelector } from 'reselect';

import { AppState } from '../reducers';

const getState = (state: AppState) => state.ui;

export const selectIsNavigationOpen = createSelector(getState, (state) => state.isNavigationOpen);

export const selectIsSidebarOpen = createSelector(getState, (state) => state.isSidebarOpen);

export const selectIsSettingsModalOpen = createSelector(
  getState,
  (state) => state.isSettingsModalOpen
);
