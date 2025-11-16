import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header)
    return res
      .status(401)
      .json({ error: 'Missing authorization header' });

  const token = header.split(' ')[1];
  if (!token)
    return res.status(401).json({ error: 'Missing token' });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid or expired token' });
  }
};
