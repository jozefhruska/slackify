import { objectType } from 'nexus';

export const Collection = objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.description();
    t.model.team();
    t.model.components();
  },
});
