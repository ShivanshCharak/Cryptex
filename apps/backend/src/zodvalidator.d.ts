import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username?: string;
    password?: string;
    email?: string;
}, {
    username?: string;
    password?: string;
    email?: string;
}>;
export declare const userLoginSchema: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password?: string;
    email?: string;
}, {
    password?: string;
    email?: string;
}>;
