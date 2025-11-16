import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../primsa';

const router = Router();

/**
 * GET /expenses?month=YYYY-MM
 */
router.get('/', requireAuth, async (req: any, res) => {
  const userId = req.user.userId;
  const month = req.query.month as string | undefined;

  try {
    let where: any = { userId };
    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      where.date = { gte: start, lt: end };
    }

    const expenses = await prisma.expense.findMany({
      where,
      orderBy: { date: 'desc' },
      include: { category: true },
    });

    res.json(expenses);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to fetch expenses' });
  }
});

router.post('/', requireAuth, async (req: any, res) => {
  const userId = req.user.userId;
  const { amount, type, date, description, categoryId } =
    req.body;

  try {
    const ex = await prisma.expense.create({
      data: {
        userId,
        amount: Number(amount),
        type,
        date: new Date(date),
        description,
        categoryId: categoryId || null,
      },
    });
    res.json(ex);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Failed to create expense' });
  }
});

router.put('/:id', requireAuth, async (req: any, res) => {
  const userId = req.user.userId;
  const id = req.params.id;
  const existing = await prisma.expense.findUnique({
    where: { id },
  });
  if (!existing || existing.userId !== userId)
    return res.status(403).json({ error: 'Unauthorized' });

  const { amount, type, date, description, categoryId } =
    req.body;
  const updated = await prisma.expense.update({
    where: { id },
    data: {
      amount: Number(amount),
      type,
      date: new Date(date),
      description,
      categoryId: categoryId || null,
    },
  });
  res.json(updated);
});

router.delete(
  '/:id',
  requireAuth,
  async (req: any, res) => {
    const userId = req.user.userId;
    const id = req.params.id;
    const existing = await prisma.expense.findUnique({
      where: { id },
    });
    if (!existing || existing.userId !== userId)
      return res
        .status(403)
        .json({ error: 'Unauthorized' });
    await prisma.expense.delete({ where: { id } });
    res.json({ ok: true });
  },
);

export default router;
