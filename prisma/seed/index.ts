import { PrismaClient } from '@prisma/client';

import teams from './teams';

export const prisma = new PrismaClient();

teams(prisma).then(() => process.exit(0));
