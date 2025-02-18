import { objectType } from 'nexus';

export const StatRecord = objectType({
  name: 'StatRecord',
  definition(t) {
    t.model.createdAt();
    t.model.componentId();
    t.model.component();
  },
});
