import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';

import type { DrizzleDatabase } from '@repo/db/client';

import type { AppEnv, EnvVar } from '@/types';

export class BaseService {
  constructor(
    protected readonly env: EnvVar,
    protected readonly db: DrizzleDatabase,
  ) {}
}

export interface ServiceEnv<T> {
  Variables: {
    service: T;
  };
}

export function serviceProvider<T extends BaseService>(
  Service: new (env: EnvVar, db: DrizzleDatabase) => T,
) {
  return createMiddleware<AppEnv & ServiceEnv<T>>(async (c, next) => {
    c.set('service', new Service(env<EnvVar>(c), c.var.db));
    await next();
  });
}
