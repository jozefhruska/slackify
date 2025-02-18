import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.role();
    t.model.accessToken();
    t.model.avatar();
    t.model.team();
  },
});
