import axios from "axios";
import { NextAuthConfig } from "next-auth";

export const serverInstance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
});

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [],
} satisfies NextAuthConfig;