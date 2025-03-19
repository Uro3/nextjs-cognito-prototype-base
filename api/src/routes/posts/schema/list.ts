import { createRoute } from '@hono/zod-openapi';

import { PostSchema } from '@/schema/post';

export const list = createRoute({
  method: 'get',
  path: '/',
  operationId: 'ListPosts',
  tags: ['Posts'],
  responses: {
    200: {
      description: '取得レコード',
      content: {
        'application/json': {
          schema: PostSchema.array(),
        },
      },
    },
  },
});
