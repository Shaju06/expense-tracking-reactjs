import { Router } from 'express';
import { prisma } from '../primsa';
import {
  comparePassword,
  hashPassword,
} from '../utils/hash';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';

const router = Router();

/**
 * POST /auth/register
 * body: { email, password, name? }
 */
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: 'email and password required' });

  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing)
    return res
      .status(400)
      .json({ error: 'User already exists' });

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
});

/**
 * POST /auth/login
 * body: { email, password }
 * returns { accessToken } and sets httpOnly refresh cookie
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ error: 'email & password required' });

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user)
    return res
      .status(401)
      .json({ error: 'Invalid credentials' });

  const ok = await comparePassword(
    password,
    user.passwordHash,
  );
  if (!ok)
    return res
      .status(401)
      .json({ error: 'Invalid credentials' });

  const accessToken = signAccessToken({ userId: user.id });
  const refreshToken = signRefreshToken({
    userId: user.id,
  });

  // store refresh token in DB for later revocation
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ),
    },
  });

  // send refresh token as httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, refreshToken, user: true });
});

/**
 * POST /auth/refresh
 * Uses refresh cookie to issue new access token
 */
router.post('/refresh', async (req: any, res) => {
  const token = req.cookies?.refreshToken;
  if (!token)
    return res
      .status(401)
      .json({ error: 'Missing refresh token' });

  try {
    const payload: any = verifyRefreshToken(token) as any;
    const stored = await prisma.refreshToken.findUnique({
      where: { token },
    });
    if (!stored)
      return res
        .status(401)
        .json({ error: 'Invalid refresh token' });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user)
      return res
        .status(401)
        .json({ error: 'User not found' });

    const accessToken = signAccessToken({
      userId: user.id,
    });
    res.json({ accessToken });
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid refresh token' });
  }
});

/**
 * POST /auth/logout
 */
router.post('/logout', async (req: any, res) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    await prisma.refreshToken
      .deleteMany({ where: { token } })
      .catch(() => {});
    res.clearCookie('refreshToken');
  }
  res.json({ ok: true });
});

export default router;
