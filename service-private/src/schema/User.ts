import { objectType } from 'nexus';

export default objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.accessToken();
  },
});
