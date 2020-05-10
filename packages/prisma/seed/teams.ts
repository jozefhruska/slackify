import { PrismaClient } from '@prisma/client';

export default async (prisma: PrismaClient) => {
  console.log('Seeding teams ...');

  try {
    await prisma.team.create({
      data: {
        id: 'TP9A3CF2N',
        name: 'team-name',
        botId: 'BSQ7DCLNA',
        botToken: 'xoxb-791343423090-906044567472-vfEKlhopOWVnA3nBrHGJkDtG',
        accessToken: '4c8d40d6850b716d181362d28986da65d806488c9d70bb1f993774739a9f0e45',
      },
    });
  } catch (error) {
    console.error(error);
    return;
  }

  console.log('Seeding teams done.');
};
