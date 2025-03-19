import type { DrizzleDatabase } from '@repo/db/client';

export type AppEnv = {
  Variables: {
    db: DrizzleDatabase;
  };
};

export type EnvVar = {
  COGNITO_CLIENT_ID: string;
  COGNITO_USER_POOL_ID: string;
  DATABASE_URL: string;
  NODE_ENV: string;
};

export type ErrorResponseBody = {
  messages: string[];
};
