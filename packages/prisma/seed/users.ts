import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding users ...');

  try {
    await prisma.user.create({
      data: {
        id: 'UP9A3CFM0',
        name: 'team-name',
        email: 'email@email.com',
        accessToken: 'test',
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

  console.log('Seeding users done.');
};
