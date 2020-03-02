import { PrismaClient } from '@prisma/client';

import teams from './teams';
import users from './users';
import categories from './categories';

export const prisma = new PrismaClient();

teams(prisma)
  .then(async () => {
    await users(prisma);
    await categories(prisma);
  })
  .then(() => process.exit(0));
