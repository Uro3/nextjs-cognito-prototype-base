'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'next/navigation';

import { createPost } from '@repo/api/client';
import { ApiError } from '@repo/api/error';
import { createPostBody } from '@repo/api/zod';

import { getSessionInfo } from '@/lib/session';

export const createPostAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: createPostBody });
  if (submission.status !== 'success') {
    return submission.reply();
  }

  try {
    const { authHeader } = await getSessionInfo();
    await createPost(submission.value, { headers: authHeader });
  } catch (e) {
    if (e instanceof ApiError) {
      return submission.reply({ formErrors: e.messages });
    }
  }

  redirect('/home');
};
