import Link from 'next/link';

import { listPosts } from '@repo/api/client';
import { ApiError } from '@repo/api/error';
import type { Post } from '@repo/api/schema';

import { getSessionInfo } from '@/lib/session';
import { createPostAction } from './_actions/createPostAction';
import PostCard from './_components/PostCard';
import PostForm from './_components/PostForm';

export default async function Home() {
  const { providerUser } = await getSessionInfo();
  const posts: Post[] = [];

  try {
    const { authHeader } = await getSessionInfo();
    const { data } = await listPosts({ headers: authHeader });
    posts.push(...data);
  } catch (e) {
    if (e instanceof ApiError) {
      console.warn(e.messages);
    } else {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start p-2 gap-3 min-w-md">
      <p>{providerUser.email} でログインしています</p>
      <Link
        href="/signout"
        className="py-1 px-2 rounded border-2 border-gray-600 bg-gray-900 hover:bg-gray-600"
      >
        ログアウト
      </Link>
      <hr className="w-full text-gray-200 dark:text-gray-700" />
      <PostForm submitAction={createPostAction} />
      <hr className="w-full text-gray-200 dark:text-gray-700" />
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
