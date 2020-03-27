import { PrismaClient, ComponentType } from '@prisma/client';

const generateProductType = (): ComponentType => {
  const num = Math.floor(Math.random() * 3);

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
    for (let i = 0; i < 20; i++) {
      const type = generateProductType();

      await prisma.collection.create({
        data: {
          name: `Collection #${i} (${type})`,
          type,
          published: Math.floor(Math.random() * 2) === 0 ? false : true,
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
