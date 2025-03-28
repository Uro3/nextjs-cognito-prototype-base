import type { Post } from '@repo/api/schema';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors">
      <p className="text-gray-900 dark:text-gray-100 text-base">{post.message}</p>
    </div>
  );
}
