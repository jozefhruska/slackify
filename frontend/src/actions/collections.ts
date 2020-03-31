import { CreateUpdateModalState } from '../types/collections';

export type OpenCollectionsCreateUpdateModal = {
  type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL';
  payload: {
    state: CreateUpdateModalState;
  };
};

export type CloseCreateUpdateModal = {
  type: '[COLLECTIONS] CLOSE_CREATE_UPDATE_MODAL';
};

export type CollectionsAction = OpenCollectionsCreateUpdateModal | CloseCreateUpdateModal;
