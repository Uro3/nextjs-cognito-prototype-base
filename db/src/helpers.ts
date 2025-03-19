import { bigint, timestamp } from 'drizzle-orm/pg-core';

export const primaryColumn = () =>
  bigint({ mode: 'number' }).primaryKey().generatedAlwaysAsIdentity();

export const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};
