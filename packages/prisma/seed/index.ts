import { PrismaClient } from '@prisma/client';

import teams from './teams';
import users from './users';
import collections from './collections';

export const prisma = new PrismaClient();

teams(prisma)
  .then(async () => {
    // await users(prisma);
    await collections(prisma);
  })
  .then(() => process.exit(0));
