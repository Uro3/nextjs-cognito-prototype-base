import type { Post } from '@repo/api/schema';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="block with-full p-4 border-1 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800">
      <p>{post.message}</p>
    </div>
  );
}
