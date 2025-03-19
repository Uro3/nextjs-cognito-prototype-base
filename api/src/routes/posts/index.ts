import { createApp } from '@/app';
import {
  type ServiceEnv,
  serviceProvider,
} from '@/middlewares/serviceProvider';
import { list } from './schema/list';
import { PostsService } from './service';

const app = createApp<ServiceEnv<PostsService>>();

app.use(serviceProvider<PostsService>(PostsService));

app.openapi(list, async (c) => {
  const posts = await c.var.service.list(10);
  return c.json(posts);
});

export default app;
