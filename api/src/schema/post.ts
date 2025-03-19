import { z } from '@hono/zod-openapi';

export const PostSchema = z
  .object({
    id: z.number().positive().openapi({ description: 'ID' }),
    message: z.string().openapi({ description: 'メッセージ' }),
    createdAt: z.date().openapi({ description: '作成日時' }),
    updatedAt: z.date().openapi({ description: '更新日時' }),
  })
  .openapi('Post');

export const CreatePostSchema = PostSchema.pick({
  message: true,
});
