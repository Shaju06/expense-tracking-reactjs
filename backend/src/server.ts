import app from './app';
import { prisma } from './primsa';

const PORT = Number(process.env.PORT || 4000);

async function main() {
  app.listen(4000, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
});
