'use server';

import { redirect } from 'next/navigation';

import { signIn, signOut } from '@/auth';

export async function signInWithCognito(lang = 'ja') {
  await signIn('cognito', { redirectTo: '/home' }, { lang });
}

export async function federeatedSignOut() {
  await signOut({ redirect: false });
  await signOutFromCognito();
}

export async function signOutClient() {
  await signOut({ redirectTo: '/' });
}

async function signOutFromCognito() {
  const res = await fetch(
    `${process.env.AUTH_COGNITO_ISSUER}/.well-known/openid-configuration`,
  );
  const { end_session_endpoint } = await res.json();
  const params = new URLSearchParams({
    client_id: process.env.AUTH_COGNITO_ID,
    logout_uri: process.env.APP_BASE_URL,
  });
  redirect(`${end_session_endpoint}?${params.toString()}`);
}
