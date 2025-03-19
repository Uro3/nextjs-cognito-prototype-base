'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { federeatedSignOut, signOutClient } from '@/actions/auth';

export default function Signout() {
  return (
    <SessionProvider>
      <SignoutComponent />
    </SessionProvider>
  );
}

function SignoutComponent() {
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session?.error !== 'RefreshTokenError') {
        await federeatedSignOut();
      }
      await signOutClient();
    })();
  }, [session]);

  return null;
}
