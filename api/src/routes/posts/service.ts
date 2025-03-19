import { desc } from 'drizzle-orm';
import type { z } from 'zod';

import { posts } from '@repo/db/schema';

import { BaseService } from '@/middlewares/serviceProvider';
import type { CreatePostSchema, PostSchema } from '@/schema/post';

export class PostsService extends BaseService {
  async create(
    params: z.infer<typeof CreatePostSchema>,
  ): Promise<z.infer<typeof PostSchema>> {
    const results = await this.db
      .insert(posts)
      .values({ ...params })
      .returning();
    return results[0];
  }

  async list(limit: number): Promise<z.infer<typeof PostSchema>[]> {
    return await this.db.query.posts.findMany({
      orderBy: desc(posts.createdAt),
      limit,
    });
  }
}
