import { CreateUpdateModalState } from '../types/components';

export type OpenCreateUpdateModal = {
  type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL';
  payload: {
    state: CreateUpdateModalState;
  };
};

export type CloseCreateUpdateModal = {
  type: '[COMPONENTS] CLOSE_CREATE_UPDATE_MODAL';
};

export type ComponentsAction = OpenCreateUpdateModal | CloseCreateUpdateModal;
