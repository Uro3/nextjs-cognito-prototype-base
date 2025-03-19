import { createApp } from '@/app';
import {
  type ServiceEnv,
  serviceProvider,
} from '@/middlewares/serviceProvider';
import createRoute from './schema/create';
import listRoute from './schema/list';
import { PostsService } from './service';

const app = createApp<ServiceEnv<PostsService>>();

app.use(serviceProvider<PostsService>(PostsService));

app.openapi(createRoute, async (c) => {
  const params = c.req.valid('json');
  const practice = await c.var.service.create(params);
  return c.json(practice, 201);
});

app.openapi(listRoute, async (c) => {
  const posts = await c.var.service.list(10);
  return c.json(posts);
});

export default app;
