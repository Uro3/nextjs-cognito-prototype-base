declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      AUTH_COGNITO_ID: string;
      AUTH_COGNITO_ISSUER: string;
      AUTH_COGNITO_SECRET: string;
    }
  }
}

export {};
