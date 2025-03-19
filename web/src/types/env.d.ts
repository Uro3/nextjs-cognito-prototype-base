declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_BASE_URL: string;
      AUTH_SECRET: string;
      AUTH_COGNITO_ID: string;
      AUTH_COGNITO_ISSUER: string;
      AUTH_COGNITO_SECRET: string;
    }
  }
}

export {};
