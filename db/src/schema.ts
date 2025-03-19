import { pgTable, text } from 'drizzle-orm/pg-core';

import { primaryColumn, timestamps } from './helpers';

export const posts = pgTable('posts', {
  id: primaryColumn(),
  message: text().notNull(),
  ...timestamps,
});
