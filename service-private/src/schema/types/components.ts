import { objectType, enumType } from 'nexus';

export const ComponentType = enumType({
  name: 'ComponentType',
  members: ['PLAIN_TEXT', 'ARTICLE', 'LINK'],
});

export const Component = objectType({
  name: 'Component',
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.published();
    t.model.author();
    t.model.team();
  },
});
