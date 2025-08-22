import z from "zod";

export const schemeLogin = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
})