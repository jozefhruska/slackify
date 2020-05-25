import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding users ...');

  try {
    await prisma.user.create({
      data: {
        slackId: 'UP9A3CFM0',
        name: 'Jozef Hruška',
        role: 'OWNER',
        accessToken: 'xoxp-791343423090-791343423714-895832957265-733aadb1b12cc2a793bc4ae330221063',
        email: 'jo.hruska27@gmail.com',
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
