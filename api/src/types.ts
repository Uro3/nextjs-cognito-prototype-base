export type AppEnv = {
  Variables: {
    dummy?: string;
  };
};

export type EnvVar = {
  NODE_ENV: string;
};

export type ErrorResponseBody = {
  messages: string[];
};
