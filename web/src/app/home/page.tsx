import Link from 'next/link';

import { listPosts } from '@repo/api/client';
import { ApiError } from '@repo/api/error';
import type { Post } from '@repo/api/schema';

import { getSessionInfo } from '@/lib/session';

export default async function Home() {
  const { providerUser } = await getSessionInfo();
  const posts: Post[] = [];

  try {
    const { data } = await listPosts();
    posts.push(...data);
  } catch (e) {
    if (e instanceof ApiError) {
      console.warn(e.messages);
    }
    console.error(e);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 gap-3">
      <p>{providerUser.email} でログインしています</p>
      <Link
        href="/signout"
        className="py-1 px-2 rounded border-2 border-gray-600 bg-gray-900 hover:bg-gray-600"
      >
        ログアウト
      </Link>
      <hr className="w-full" />
      <div className="flex flex-col gap-1">
        {posts.map((post) => (
          <div key={post.id} className="p-2 border-1 border-gray-600">
            <p>{post.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
