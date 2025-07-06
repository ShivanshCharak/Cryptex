import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "postgres-prisma";
import { userLoginSchema, userSchema } from "../zodvalidator";
import z from "zod";

const ACCESS_TOKEN_SECRET="gamma";
const REFRESH_TOKEN_SECRET ="delta";

// Interface, though unused here, can remain for future strict typing
interface authParams {
    username: string;
    password: string;
    email: string;
}

export async function userSignUp(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    const validation = userSchema.safeParse({ username, password, email });

    if (!validation.success) {
        res.status(400).json({ error: "Validation failed", details: validation.error.errors });
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
            },
        });

        res.json(user);

    } catch (error: any) {
        console.error("Signup error:", error);
        if (error.code === "P2002") {
            res.status(409).json({ error: `Unique constraint failed on: ${error.meta?.target?.join(", ")}` });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

const SALT_ROUNDS = 10;

export async function BulkUserInsertion(req: Request, res: Response): Promise<void> {
  const { users } = req.body;

  // Validate request body
  if (!users || !Array.isArray(users)) {
    res.status(400).json({ error: "Invalid input: 'users' must be an array" });
    return;
  }

  try {
    // Hash passwords before saving
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users into the database
    const result = await prisma.user.createMany({
      data: usersWithHashedPasswords,
      skipDuplicates: true, // Skip duplicates (optional)
    });

    res.status(201).json({
      message: "Users created successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Error occurred while saving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function userSignin(req: Request, res: Response):Promise<void> {
    const { password, email } = req.body;
    if (!password || !email) {
        res.status(400).json({ error: "Email and password are required." });
        return
    }

    const validation = userLoginSchema.safeParse({ password, email });

    if (!validation.success) {
        res.status(400).json({ error: "Validation failed", details: validation.error.errors });
        return
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(404).json({ error: "User not found." });
            return
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ error: "Invalid credentials." });
            return
        }

        const token = jwt.sign({ userId: user.id, email }, "gamma", { expiresIn: "1h" });

        res.status(200).json({
            token,
            message: `Welcome back ${user.username}`,
            user: { id: user.id, email: user.email, username: user.username },
        });

    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
