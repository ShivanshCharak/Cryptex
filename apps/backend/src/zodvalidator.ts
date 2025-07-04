import {z} from 'zod'

export const userSchema = z.object({
    username: z.string().min(2,"Name should be more than 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
})

export const userLoginSchema = z.object({
  password: z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number"),
  email: z.string().min(2,"Name should be more than 2 characters")
})