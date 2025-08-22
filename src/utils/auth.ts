import NextAuth from "next-auth";
import { authConfig } from "./config";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { schemeLogin } from "./schemes";
import { login, refresh } from "./actions";
import { AxiosError } from "axios";
import { error } from "console";

export const {auth, signIn, signOut, handlers} = NextAuth({
    ...authConfig,
    pages: {
        signIn: "/sign-in"
    },
    callbacks: {
        session: async({session, token}) => {

            if(!token)
                console.log("Проблема с сессией, токен unknown.")    

            session.user.id = token.uid
            session.user.name = token.name
            session.user.email = token.email
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.expires_at = token.expires_at

            return session
        },
        jwt: async({user, token}) => {

            if(user && user.accessToken && user.refreshToken && user.expires_at)
            {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken
                token.expires_at = user.expires_at
            }

            if (user && user.id) 
                token.uid = user.id

            if(token.expires_at && Date.now() > token.expires_at && token.refreshToken)
            {
                const refreshed = await refresh(token.refreshToken)

                if(!refreshed)
                {
                    console.log("Ошибка, токен не обновился.")
                    return null
                }

                token.accessToken = refreshed?.access_token
                token.expires_at = refreshed?.expires_at; 

                if(token.accessToken && token.expires_at)
                {
                    console.log("Токен обновился в сессии: " + token.accessToken)
                    console.log("Новое истечение времени: " + token.expires_at)
                }
            }

           return token 
        },
    },
    session: {
        strategy: 'jwt'
    },
    providers: [Credentials({
        credentials: {
            username:{
                label: 'username',
                placeholder: 'username'
            },
            password:{
                type: 'password',
                label: 'password',
                placeholder: 'password'
            }
        },
        async authorize(credentials, request): Promise<any> {

            const data = schemeLogin.safeParse({
                username: credentials.username,
                password: credentials.password
            })

            if(!data.success)
            {
                console.log("Данные о пользователе не были введены верно.")
                return null 
            }

            let response: ResponseLogin | undefined = await login(data.data) 

            if(response == undefined || !response.user)
                return null

            return{
                id: response.user.id,
                name: response.user.username,
                email: response.user.email,
                accessToken: response.access_token,
                refreshToken: response.refresh_token,
                expires_at: response.expires_at
            }
        },
    })]
})