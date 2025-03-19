import { createApp } from '@/app';
import { list } from './schema/list';

const app = createApp();

app.openapi(list, async (c) => {
  const result = [
    {
      id: 1,
      message: 'Hello',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return c.json(result);
});

export default app;
