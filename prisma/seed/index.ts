import { PrismaClient } from '@prisma/client';

import teams from './teams';
import users from './users';

export const prisma = new PrismaClient();

teams(prisma)
  .then(async () => {
    await users(prisma);
  })
  .then(() => process.exit(0));
