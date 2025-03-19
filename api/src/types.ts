export type AppEnv = {
  Variables: {
    dummy?: string;
  };
};

export type EnvVar = {
  COGNITO_CLIENT_ID: string;
  COGNITO_USER_POOL_ID: string;
  NODE_ENV: string;
};

export type ErrorResponseBody = {
  messages: string[];
};
