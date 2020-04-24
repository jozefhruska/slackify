import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.role();
    t.model.accessToken();
    t.model.image_24();
    t.model.image_32();
    t.model.image_48();
    t.model.image_72();
    t.model.image_192();
    t.model.image_512();
    t.model.team();
  },
});
