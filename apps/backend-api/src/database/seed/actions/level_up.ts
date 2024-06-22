import { PrismaClient } from '@prisma/client';
import { defaultLevelUpCommandSeed } from '../commands/level_up';

export async function levelUpActionSeed(prisma: PrismaClient): Promise<void> {
  const levelUpAction = await prisma.action.upsert({
    where: { name: 'sprite' },
    update: {},
    create: {
      name: 'sprite',
      title: 'Sprite',
      description: 'Sprite',
    },
  });

  const users = await prisma.user.findMany();

  for (const user of users) {
    await defaultLevelUpCommandSeed(prisma, user, levelUpAction);
  }

  console.log({
    levelUpAction,
  });
}
