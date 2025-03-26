'use client';

import {
  type SubmissionResult,
  getFormProps,
  getTextareaProps,
  useForm,
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useActionState } from 'react';

import { createPostBody } from '@repo/api/zod';

type Props = {
  submitAction: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult>;
};

export default function PostForm({ submitAction }: Props) {
  const [lastResult, action, pending] = useActionState(submitAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema: createPostBody });
    },
    defaultValue: {
      message: '',
    },
  });

  return (
    <form className="min-w-md" {...getFormProps(form)} action={action}>
      <textarea
        className="bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-1"
        rows={3}
        {...getTextareaProps(fields.message)}
      />
      <div
        id={fields.message.errorId}
        className="text-red-600 dark:text-red-400 text-sm"
      >
        {fields.message.errors}
      </div>
      <div className="mt-1 flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          type="submit"
          disabled={pending}
        >
          投稿
        </button>
      </div>
    </form>
  );
}
