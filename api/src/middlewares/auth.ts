import { CognitoJwtVerifier } from 'aws-jwt-verify';
import type { Context } from 'hono';
import { env } from 'hono/adapter';
import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import type { AppEnv, EnvVar } from '@/types';

export const auth = createMiddleware<AppEnv>(async (c, next) => {
  await verify(c);
  await next();
});

const verify = async (c: Context<AppEnv>) => {
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) {
    throw new HTTPException(401, {
      message: '認証情報を確認できませんでした。',
    });
  }

  const cognitoJwtVerifier = CognitoJwtVerifier.create({
    userPoolId: env<EnvVar>(c).COGNITO_USER_POOL_ID,
    clientId: env<EnvVar>(c).COGNITO_CLIENT_ID,
    tokenUse: 'access',
  });

  try {
    await cognitoJwtVerifier.verify(token);
  } catch (e) {
    throw new HTTPException(401, {
      message: '認証情報が不正、または有効期限が切れています。',
    });
  }
};
