import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding collections ...');

  try {
    await prisma.collection.create({
      data: {
        handle: 'test-collection',
        team: {
          connect: {
            id: 'TP9A3CF2N',
          },
        },
      },
    });

    await prisma.collection.create({
      data: {
        handle: 'test-collection-x',
        team: {
          connect: {
            id: 'TP9A3CF2N',
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return;
  }

  console.log('Seeding collections done.');
};
