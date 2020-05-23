import { objectType } from 'nexus';

/**
 * Dashboard query result.
 */
export const DashData = objectType({
  name: 'DashData',
  definition(t) {
    t.list.field('requestedComponents', {
      type: 'Component',
      nullable: false,
    });
    t.list.field('createdComponents', {
      type: 'Component',
      nullable: false,
    });
    t.list.field('createdCollections', {
      type: 'Collection',
      nullable: false,
    });
  },
});
