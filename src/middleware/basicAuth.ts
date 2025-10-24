import { Request, Response, NextFunction } from 'express';

export function basicAuth(req: Request, res: Response, next: NextFunction) {
  const realm = 'Admin';
  const header = req.headers['authorization'] || '';
  const expectedUser = process.env.ADMIN_USER || '';
  const expectedPass = process.env.ADMIN_PASS || '';

  if (!expectedUser || !expectedPass) {
    return res.status(503).send('Admin is not configured');
  }

  if (!header.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`);
    return res.status(401).send('Authentication required');
  }
  try {
    const b64 = header.slice(6);
    const decoded = Buffer.from(b64, 'base64').toString('utf8');
    const idx = decoded.indexOf(':');
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    if (user === expectedUser && pass === expectedPass) {
      return next();
    }
  } catch (e) {
    // fallthrough to 401 below
  }
  res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`);
  return res.status(401).send('Invalid credentials');
}
