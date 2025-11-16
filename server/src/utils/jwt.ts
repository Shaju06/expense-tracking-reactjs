import jwt from 'jsonwebtoken';

const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '30d';

export const signAccessToken = (payload: object) =>
  jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: ACCESS_EXPIRES },
  );

export const signRefreshToken = (payload: object) =>
  jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: REFRESH_EXPIRES },
  );

export const verifyAccessToken = (token: string) =>
  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET as string,
  );

export const verifyRefreshToken = (token: string) =>
  jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string,
  );
