import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export type DrizzleDatabase = NodePgDatabase<typeof schema>;

export const createClient = (connectionString: string): DrizzleDatabase => {
  return drizzle({
    connection: { connectionString },
    schema,
    casing: 'snake_case',
  });
};
