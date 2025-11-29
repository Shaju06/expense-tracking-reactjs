import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash:
        '$2a$10$B1jwrS38/IXRSR1j.PZKTuTvgc1XtpMoH68B5E.2E9X16XQvk3xyi',
      name: 'Test User',
    },
  });

  // Create some categories
  await prisma.category.createMany({
    data: [
      { name: 'Food', color: '#ff6384', userId: user.id },
      {
        name: 'Transport',
        color: '#36a2eb',
        userId: user.id,
      },
      {
        name: 'Shopping',
        color: '#ffcd56',
        userId: user.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('🌱 Seed completed');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
