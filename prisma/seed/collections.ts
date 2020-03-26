import { PrismaClient, ComponentType } from '@prisma/client';

const generateProductType = (): ComponentType => {
  const num = Math.floor(Math.random() * 2);

  switch (num) {
    case 0: {
      return 'PLAIN_TEXT';
    }
    case 1: {
      return 'ARTICLE';
    }
    case 2: {
      return 'LINK';
    }

    default: {
      return 'PLAIN_TEXT';
    }
  }
};

export default async (prisma: PrismaClient) => {
  console.log('Seeding collections ...');

  try {
    for (let i = 0; i < 100; i++) {
      const type = generateProductType();

      await prisma.collection.create({
        data: {
          name: `Collection #${i} (${type})`,
          type,
          description: 'Description',
          team: {
            connect: {
              id: 'TP9A3CF2N',
            },
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
    return;
  }

  console.log('Seeding collections done.');
};
