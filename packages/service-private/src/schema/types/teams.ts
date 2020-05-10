import { objectType } from 'nexus';

export const Team = objectType({
  name: 'Team',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.botToken();
    t.model.accessToken();
  },
});
