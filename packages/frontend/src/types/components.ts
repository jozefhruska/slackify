import { Component, Collection } from './generated/graphql';

export type CreateUpdateModalState = {
  mode: 'create' | 'update';
  component?: Partial<Component>;
  collection?: Pick<Collection, 'id' | 'name' | 'type'>;
};
