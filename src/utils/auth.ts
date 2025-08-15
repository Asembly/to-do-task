import NextAuth, { DefaultSession, Session} from "next-auth";
import { authConfig, serverInstance } from "./config";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers} = NextAuth({
  ...authConfig,
    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) 
          session.user.id = token.uid

        if (token && token.accessToken && token.refreshToken)
        {
          session.accessToken = token.accessToken 
          session.refreshToken = token.refreshToken
        }

        return session;
      },
      jwt: async ({ user, token }) => {

        if(user && user.accessToken && user.refreshToken)
        {
          token.accessToken = user?.accessToken
          token.refreshToken = user?.refreshToken
        }

        if (user && user.id) 
          token.uid = user.id

        return token;
      },
    },
    session: {
      strategy: 'jwt'
    },
    providers: [Credentials({
        async authorize(credentials) {
            const data = {
                username: credentials.username,
                password: credentials.password
            }

            let response: {access_token: String, refresh_token: String, user: User} = await serverInstance.post('/api/auth/sign-in', data)
            .then(res => res.data)
            .catch(error => error)

            if(!response.user)
                return null

            console.log(response.access_token)

            return {
                id: response.user.id, 
                name: response.user.username, 
                email: response.user.email, 
                accessToken: response.access_token,
                refreshToken: response.refresh_token
            } as any 
        },
        credentials: {
            username: {
                label: 'username',
                placeholder: 'username' 
            },
            password: {
                type: 'password',
                label: 'password',
                placeholder: 'password'
            }
        }
    })]
})