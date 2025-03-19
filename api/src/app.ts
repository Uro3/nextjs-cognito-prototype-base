import { OpenAPIHono } from '@hono/zod-openapi';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

import type { AppEnv, ErrorResponseBody } from '@/types';

export const createApp = <T>() => {
  return new OpenAPIHono<AppEnv & T>({
    defaultHook: (result, c) => {
      if (!result.success) {
        const { formErrors, fieldErrors } = result.error.flatten();
        const fieldErrorMessages = Object.entries(fieldErrors)
          .map(([field, errors]) => {
            return errors?.map((error) => `${field}: ${error}`);
          })
          .filter((errors) => !!errors)
          .flat();
        const data: ErrorResponseBody = {
          messages: [...formErrors, ...fieldErrorMessages],
        };
        return c.json(data, 400);
      }
    },
  });
};

export const handleError = async (
  err: Error,
  c: Context<AppEnv>,
): Promise<Response> => {
  if (err instanceof HTTPException && err.status < 500) {
    const data: ErrorResponseBody = {
      messages: [err.message],
    };
    return c.json(data, err.status);
  }

  console.error(err);
  const data: ErrorResponseBody = {
    messages: ['予期せぬエラーが発生しました。'],
  };
  return c.json(data, 500);
};
