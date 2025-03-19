import NextAuth from 'next-auth';
import 'next-auth/jwt';
import Cognito from 'next-auth/providers/cognito';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: 'RefreshTokenError';
    sub: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: 'RefreshTokenError';
    sub: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Cognito],
  callbacks: {
    jwt: async ({ account, token }) => {
      if (account?.provider === 'cognito') {
        token.sub = account.providerAccountId;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
        return token;
      }

      if (!token.refreshToken) {
        throw new TypeError('Missing refresh_token');
      }

      // Refresh tokens
      try {
        const providerInfoResponse = await fetch(
          `${process.env.AUTH_COGNITO_ISSUER}/.well-known/openid-configuration`,
        );
        const { token_endpoint } = await providerInfoResponse.json();
        const response = await fetch(token_endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: process.env.AUTH_COGNITO_ID,
            client_secret: process.env.AUTH_COGNITO_SECRET,
            refresh_token: token.refreshToken,
          }),
        });
        const tokensOrError = await response.json();
        if (!response.ok) {
          throw tokensOrError;
        }
        const newTokens = tokensOrError as {
          access_token: string;
          refreshToken: string;
          expires_in: number;
        };
        return {
          ...token,
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refreshToken
            ? newTokens.refreshToken
            : token.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000 + newTokens.expires_in),
        };
      } catch (error) {
        console.error('Error refreshing access_token', error);
        token.error = 'RefreshTokenError';
        return token;
      }
    },
    session: async ({ session, token }) => {
      session.sub = token.sub;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
