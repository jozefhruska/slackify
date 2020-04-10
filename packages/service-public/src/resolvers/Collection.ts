import { objectType } from 'nexus';

export const Collection = objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.handle();
    t.model.components();
    t.model.team();
  },
});
