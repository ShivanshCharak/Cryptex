import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "postgres-prisma";
import { userLoginSchema, userSchema } from "../zodvalidator";
import dotenv from 'dotenv'
dotenv.config()

const SALT_ROUNDS = 10;

interface TokenPayload {
    userId: string;
    email: string;
}

export async function userSignUp(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;
    

    if (!username || !password || !email) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const validation = userSchema.safeParse({ username, password, email });
    console.log(validation.error)

    if (!validation.success) {

        res.status(400).json({ 
            error: "Validation failed", 
            details: validation.error.errors 
        });
        return;
    }

    try {
        
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            res.status(409).json({ error: "Username already exists" });
            return;
        }

        
        const existingEmail = await prisma.user.findUnique({
            where: { email },
        });

        if (existingEmail) {
            res.status(409).json({ error: "Email already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
            },
        });

        const tokenPayload: TokenPayload = {
            userId: user.id,
            email: user.email
        };

        
        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET as string, { 
            expiresIn: "15m" 
        });
        
        const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET as string , { 
            expiresIn: "7d" 
        });
        console.log(accessToken)
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(201).json({
            message: "User created successfully",
            accessToken,
            user: { 
                id: user.id, 
                email: user.email, 
                username: user.username 
            },
        });

    } catch (error: any) {
        console.error("Signup error:", error);
        if (error.code === "P2002") {
            res.status(409).json({ 
                error: `Unique constraint failed on: ${error.meta?.target?.join(", ")}` 
            });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export async function userSignIn(req: Request, res: Response): Promise<void> {
    const { password, email } = req.body;
    console.log(password,email)
    if (!password || !email) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    const validation = userLoginSchema.safeParse({ password, email });

    if (!validation.success) {
        res.status(400).json({ 
            error: "Validation failed", 
            details: validation.error.errors 
        });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        const tokenPayload: TokenPayload = {
            userId: user.id,
            email: user.email
        };

        
        const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET as string, { 
            expiresIn: "15m" 
        });
        
        const refreshToken = jwt.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET as string, { 
            expiresIn: "7d" 
        });

        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: `Welcome back ${user.username}`,
            accessToken,
            user: { 
                id: user.id, 
                email: user.email, 
                username: user.username 
            },
        });

    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        res.status(401).json({ error: "Refresh token not found" });
        return;
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;
        
        
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        const tokenPayload: TokenPayload = {
            userId: user.id,
            email: user.email
        };

        
        const newAccessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET as string, { 
            expiresIn: "15m" 
        });

        res.status(200).json({
            accessToken: newAccessToken,
            message: "Token refreshed successfully"
        });

    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(401).json({ error: "Invalid refresh token" });
    }
}

export async function logout(req: Request, res: Response): Promise<void> {
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Logged out successfully" });
}