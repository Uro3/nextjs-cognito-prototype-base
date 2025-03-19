import type { User } from 'next-auth';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

type SessionInfo = {
  sub: string;
  providerUser: User;
  authHeader: HeadersInit;
};

export const getSessionInfo = async (): Promise<SessionInfo> => {
  const session = await auth();
  if (!session?.user) {
    return redirect('/');
  }

  const authHeader = {
    Authorization: `Bearer ${session.accessToken}`,
  };

  return { sub: session.sub, providerUser: session.user, authHeader };
};
