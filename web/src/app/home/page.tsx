import Link from 'next/link';

import { getSessionInfo } from '@/lib/session';

export default async function Home() {
  const { providerUser } = await getSessionInfo();
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 gap-2">
      <p>{providerUser.email} でログインしています</p>
      <Link
        href="/signout"
        className="py-1 px-2 rounded border-2 border-gray-600 bg-gray-900 hover:bg-gray-600"
      >
        ログアウト
      </Link>
    </div>
  );
}
