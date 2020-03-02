import { objectType } from 'nexus';

export default objectType({
  name: 'Team',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.domain();
  },
});
