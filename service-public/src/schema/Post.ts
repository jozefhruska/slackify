import { objectType } from 'nexus';

export default objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.type();
    t.model.category();
    t.model.short();
    t.model.content();
    t.model.isPublished();
    t.model.createdAt();
    t.model.updatedAt();
  },
});
