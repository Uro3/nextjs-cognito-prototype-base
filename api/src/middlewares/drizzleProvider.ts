import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';

import { createClient } from '@repo/db/client';

import type { AppEnv, EnvVar } from '@/types';

export const drizzleProvider = createMiddleware<AppEnv>(async (c, next) => {
  const db = createClient(env<EnvVar>(c).DATABASE_URL);
  c.set('db', db);
  await next();
});
