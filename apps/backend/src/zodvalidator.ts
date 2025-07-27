import {z} from 'zod'

export const userSchema = z.object({
    username: z.string().min(2,"Name should be more than 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string()
})

export const userLoginSchema = z.object({
  password: z.string(),
  email: z.string().min(2,"Name should be more than 2 characters")
})