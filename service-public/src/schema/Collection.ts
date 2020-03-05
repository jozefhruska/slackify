import { objectType } from 'nexus';

export default objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.handle();
    t.model.posts();
    t.model.team();
  },
});
