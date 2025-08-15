import type { DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string
      name: string
      email: string
    }
    accessToken?: string
    refreshToken?: string
  }
  interface User{
    id: string
    name: string
    email: string
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT{
    uid: string
    accessToken?: string
    refreshToken?: string
  }
}