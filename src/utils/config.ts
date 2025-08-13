import axios from "axios";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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