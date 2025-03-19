import { createRoute } from '@hono/zod-openapi';

import { CreatePostSchema, PostSchema } from '@/schema/post';

export default createRoute({
  method: 'post',
  path: '/',
  operationId: 'CreatePost',
  tags: ['Posts'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreatePostSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '成功',
      content: {
        'application/json': {
          schema: PostSchema,
        },
      },
    },
  },
});
