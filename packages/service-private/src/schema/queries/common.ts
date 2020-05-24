import { FieldResolver } from 'nexus';
import { Component, Collection } from '@prisma/client';

export const resolveDashData: FieldResolver<'Query', 'dashData'> = async (
  _parent,
  _args,
  { prisma, team }
) => {
  /* Get recently requested components */
  const requestedComponentIdsRequest = prisma.statRecord.findMany({
    first: 100,
    where: {
      component: {
        teamId: {
          equals: team.id,
        },
      },
    },
    select: {
      componentId: true,
    },
  });

  /* Get recently created components */
  const createdComponentsRequest = prisma.component.findMany({
    first: 10,
    where: {
      teamId: {
        equals: team.id,
      },
    },
  });

  /* Get recently created collections */
  const createdCollectionsRequest = prisma.collection.findMany({
    first: 10,
    where: {
      teamId: {
        equals: team.id,
      },
    },
  });

  let requestedComponents: Component[] = [],
    createdComponents: Component[] = [],
    createdCollections: Collection[] = [];

  await Promise.all([
    requestedComponentIdsRequest,
    createdComponentsRequest,
    createdCollectionsRequest,
  ]).then(async ([componentIds, components, collections]) => {
    createdComponents = components;
    createdCollections = collections;

    /* Extract component IDs */
    const extractedIds = componentIds.flatMap((data) => data.componentId);

    /* Get unique components only */
    const uniqueComponentIds = [...new Set(extractedIds)];

    /* Get data for all component IDs */
    const requested = await prisma.component.findMany({
      where: {
        id: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          in: uniqueComponentIds,
        },
      },
    });

    requestedComponents = requested;
  });

  return {
    requestedComponents,
    createdComponents,
    createdCollections,
  };
};
