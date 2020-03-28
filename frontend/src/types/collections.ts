import { Collection } from './generated/graphql';

export type CreateUpdateModalState = {
  mode: 'create' | 'update';
  collection?: Omit<Collection, 'team' | 'components'>;
};
