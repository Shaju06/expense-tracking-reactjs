const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash: 'dummy-hash',
      name: 'Test User',
    },
  });

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
  .catch(console.error)
  .finally(() => prisma.$disconnect());
