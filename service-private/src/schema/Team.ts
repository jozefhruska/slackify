import { objectType } from 'nexus';

export const Team = objectType({
  name: 'Team',
  definition(t) {
    t.string('id'),
    t.string('name'),
    t.string('domain')
  },
});