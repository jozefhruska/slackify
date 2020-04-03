import { CreateUpdateModalState } from '../types/collections';

export type OpenCreateUpdateModal = {
  type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL';
  payload: {
    state: CreateUpdateModalState;
  };
};

export type CloseCreateUpdateModal = {
  type: '[COLLECTIONS] CLOSE_CREATE_UPDATE_MODAL';
};

export type CollectionsAction = OpenCreateUpdateModal | CloseCreateUpdateModal;
