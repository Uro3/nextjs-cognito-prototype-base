import { redirect } from 'next/navigation';

import { signInWithCognito } from '@/actions/auth';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  if (session) {
    return redirect('/home');
  }

  const onClickSignIn = async () => {
    'use server';
    await signInWithCognito();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-2">
        ようこそ！プロトタイプアプリへ！
      </h1>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClickSignIn}
      >
        ログイン
      </button>
    </div>
  );
}
