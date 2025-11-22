import {
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../primsa';

const router = Router();

router.get('/', requireAuth, async (req: any, res) => {
  const userId = req.userId!;
  const { month } = req.query;

  if (!month)
    return res
      .status(400)
      .json({ error: 'Month is required' });
  // month format: YYYY-MM
  const startDate = new Date(`${month}-01T00:00:00.000Z`);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  // Total IN
  const totalIn = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: {
      userId,
      type: 'in',
      date: { gte: startDate, lt: endDate },
    },
  });

  // Total OUT
  const totalOut = await prisma.expense.aggregate({
    _sum: { amount: true },
    where: {
      userId,
      type: 'out',
      date: { gte: startDate, lt: endDate },
    },
  });

  // Category breakdown
  const byCategory = await prisma.expense.groupBy({
    by: ['categoryId'],
    _sum: { amount: true },
    where: {
      userId,
      date: { gte: startDate, lt: endDate },
    },
  });

  // join categories to names
  const categories = await prisma.category.findMany({
    where: { userId },
  });

  const categoryTotals = byCategory.map((c) => {
    const cat = categories.find(
      (x) => x.id === c.categoryId,
    );
    return {
      id: c.categoryId,
      name: cat?.name || 'Uncategorized',
      total: c._sum.amount || 0,
      color: cat?.color || '#8884d8',
    };
  });

  res.json({
    totalIn: totalIn._sum.amount || 0,
    totalOut: totalOut._sum.amount || 0,
    byCategory: categoryTotals,
  });
});

router.get('/last6', requireAuth, async (req: any, res) => {
  const userId = req.userId!;
  const now = new Date();
  let results: any[] = [];

  for (let i = 5; i >= 0; i--) {
    const start = startOfMonth(subMonths(now, i));
    const end = endOfMonth(subMonths(now, i));

    const income = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: 'in',
        date: { gte: start, lte: end },
      },
    });

    const outcome = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: 'out',
        date: { gte: start, lte: end },
      },
    });

    results.push({
      month: format(start, 'MMM'), // e.g. Jan, Feb
      income: income._sum.amount || 0,
      expense: outcome._sum.amount || 0,
    });
  }

  res.json(results);
});

export default router;
