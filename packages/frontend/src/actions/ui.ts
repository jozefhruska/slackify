export type OpenNavigation = {
  type: '[UI] OPEN_NAVIGATION';
};

export type CloseNavigation = {
  type: '[UI] CLOSE_NAVIGATION';
};

export type OpenSidebar = {
  type: '[UI] OPEN_SIDEBAR';
};

export type CloseSidebar = {
  type: '[UI] CLOSE_SIDEBAR';
};

export type OpenSettings = {
  type: '[UI] OPEN_SETTINGS';
};

export type CloseSettings = {
  type: '[UI] CLOSE_SETTINGS';
};

export type UIAction =
  | OpenNavigation
  | CloseNavigation
  | OpenSidebar
  | CloseSidebar
  | OpenSettings
  | CloseSettings;
