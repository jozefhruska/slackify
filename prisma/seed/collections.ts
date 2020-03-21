import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding collections ...');

  try {
    await prisma.collection.create({
      data: {
        name: 'Collection #1 (Link)',
        type: 'LINK',
        description: 'Description',
        team: {
          connect: {
            id: 'TP9A3CF2N',
          },
        },
      },
    });

    await prisma.collection.create({
      data: {
        name: 'Collection #2 (Plain text)',
        type: 'PLAIN_TEXT',
        description: 'Description',
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
