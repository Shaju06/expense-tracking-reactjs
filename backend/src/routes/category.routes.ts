import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { prisma } from '../primsa';

const router = Router();

router.get('/', requireAuth, async (req: any, res) => {
  const userId = req.user.userId;
  const cats = await prisma.category.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(cats);
});

router.post('/', requireAuth, async (req: any, res) => {
  const userId = req.user.userId;
  const { name, color, description } = req.body;
  const cat = await prisma.category.create({
    data: { name, color, description, userId },
  });
  res.json(cat);
});

router.put('/:id', requireAuth, async (req: any, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  const existing = await prisma.category.findUnique({
    where: { id },
  });
  if (!existing || existing.userId !== userId)
    return res.status(403).json({ error: 'Unauthorized' });
  const updated = await prisma.category.update({
    where: { id },
    data: req.body,
  });
  res.json(updated);
});

router.delete(
  '/:id',
  requireAuth,
  async (req: any, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const existing = await prisma.category.findUnique({
      where: { id },
    });
    if (!existing || existing.userId !== userId)
      return res
        .status(403)
        .json({ error: 'Unauthorized' });
    await prisma.category.delete({ where: { id } });
    res.json({ ok: true });
  },
);

export default router;
