import { desc } from 'drizzle-orm';
import type { z } from 'zod';

import { posts } from '@repo/db/schema';

import { BaseService } from '@/middlewares/serviceProvider';
import type { PostSchema } from '@/schema/post';

export class PostsService extends BaseService {
  async list(limit: number): Promise<z.infer<typeof PostSchema>[]> {
    return await this.db.query.posts.findMany({
      orderBy: desc(posts.createdAt),
      limit,
    });
  }
}
