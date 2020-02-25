import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding teams ...');

  try {
    await prisma.team.create({
      data: {
        id: 'TP9A3CF2N',
        name: 'team-name',
        domain: 'team-domain',
      },
    });
  } catch (error) {
    console.error(error);
  }

  console.log('Seeding teams done.');
};
