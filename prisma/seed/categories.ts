import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding categories ...');

  try {
    await prisma.category.create({
      data: {
        handle: 'test-category',
        team: {
          connect: {
            id: 'TP9A3CF2N',
          },
        },
      },
    });

    await prisma.category.create({
      data: {
        handle: 'test-category-x',
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

  console.log('Seeding categories done.');
};
