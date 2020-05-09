import { inputObjectType } from 'nexus';

export * from './auth';
export * from './collections';
export * from './components';
export * from './statistics';
export * from './teams';
export * from './users';

export const PaginationInput = inputObjectType({
  name: 'PaginationInput',
  definition(t) {
    t.int('skip', { required: false });
    t.field('after', {
      type: 'CollectionWhereUniqueInput',
      required: false,
    });
    t.field('before', {
      type: 'CollectionWhereUniqueInput',
      required: false,
    });
    t.int('first', { required: false });
    t.int('last', { required: false });
  },
});
