import { queryType } from '@nexus/schema';

export const Query = queryType({
  definition(t) {
    /* Collections */
    t.crud.collections({
      filtering: {
        id: true,
        name: true,
        type: true,
        description: true,
        updatedAt: true,
        createdAt: true,
      },
      ordering: {
        id: true,
        name: true,
        type: true,
        description: true,
        updatedAt: true,
        createdAt: true,
      },
      pagination: true,
    });

    /* Collection */
    t.crud.collection();

    /* Components */
    t.crud.components({
      filtering: {
        id: true,
        type: true,
        updatedAt: true,
        createdAt: true,
      },
      ordering: {
        id: true,
        type: true,
        updatedAt: true,
        createdAt: true,
      },
      pagination: true,
    });

    /* Component */
    t.crud.component();
  },
});
