import { Action, PrismaClient, User } from '@prisma/client';

export async function defaultLevelUpCommandSeed(
  prisma: PrismaClient,
  user: User,
  action?: Action
): Promise<void> {
  const levelUpAction =
    action ??
    (await prisma.action.findFirst({
      where: { name: 'level_up' },
    }));

  if (!levelUpAction) {
    return;
  }

  const foundLevelUpCommand = await prisma.command.findFirst({
    where: {
      user: {
        id: user.id,
      },
      action: {
        id: levelUpAction.id,
      },
    },
  });

  if (!foundLevelUpCommand) {
    await prisma.command.create({
      data: {
        text: `!levelUp`,
        cooldown: 0,
        isActive: false,
        action: {
          connect: {
            id: levelUpAction.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
        data: {
          arguments: ['level_up'],
          action: {},
        },
      },
    });
  }
}
