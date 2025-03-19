import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgres://pguser:password@localhost:5432/prototype_base',
  },
  casing: 'snake_case',
});
