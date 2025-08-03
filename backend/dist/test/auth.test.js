"use strict";
// import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest';
// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { userSignUp, userSignIn, refreshToken, logout } from "../auth";
// import { userLoginSchema, userSchema } from "../zodvalidator";
Object.defineProperty(exports, "__esModule", { value: true });
// // Mock dependencies
// vi.mock("postgres-prisma", () => ({
//     default: {
//         user: {
//             findUnique: vi.fn(),
//             create: vi.fn(),
//         },
//     },
// }));
// vi.mock("bcrypt");
// vi.mock("jsonwebtoken");
// vi.mock("../zodvalidator");
// // Import mocked modules after mocking
// const mockPrisma = import("postgres-prisma");
// const mockBcrypt = vi.mocked(bcrypt);
// const mockJwt = vi.mocked(jwt);
// const mockUserSchema = vi.mocked(userSchema);
// const mockUserLoginSchema = vi.mocked(userLoginSchema);
// describe("Authentication Controller", () => {
//     let mockReq: Partial<Request>;
//     let mockRes: Partial<Response>;
//     let mockJson: MockedFunction<any>;
//     let mockStatus: MockedFunction<any>;
//     let mockCookie: MockedFunction<any>;
//     let mockClearCookie: MockedFunction<any>;
//     beforeEach(() => {
//         mockJson = vi.fn();
//         mockStatus = vi.fn().mockReturnThis();
//         mockCookie = vi.fn();
//         mockClearCookie = vi.fn();
//         mockRes = {
//             status: mockStatus,
//             json: mockJson,
//             cookie: mockCookie,
//             clearCookie: mockClearCookie,
//         };
//         mockReq = {
//             body: {},
//             cookies: {},
//         };
//         vi.clearAllMocks();
//     });
//     describe("userSignUp", () => {
//         it("should create a new user successfully", async () => {
//             const userData = {
//                 username: "testuser",
//                 email: "test@example.com",
//                 password: "password123"
//             };
//             mockReq.body = userData;
//             mockUserSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: userData
//             });
//             mockPrisma.default.user.findUnique
//                 .mockResolvedValueOnce(null) // username check
//                 .mockResolvedValueOnce(null); // email check
//             mockBcrypt.hash.mockResolvedValue("hashedPassword" as never);
//             const createdUser = {
//                 id: "user123",
//                 username: "testuser",
//                 email: "test@example.com",
//                 password: "hashedPassword"
//             };
//             mockPrisma.default.user.create.mockResolvedValue(createdUser);
//             mockJwt.sign
//                 .mockReturnValueOnce("accessToken123" as never) // access token
//                 .mockReturnValueOnce("refreshToken123" as never); // refresh token
//             await userSignUp(mockReq as Request, mockRes as Response);
//             expect(mockPrisma.default.user.findUnique).toHaveBeenCalledWith({
//                 where: { username: "testuser" }
//             });
//             expect(mockPrisma.default.user.findUnique).toHaveBeenCalledWith({
//                 where: { email: "test@example.com" }
//             });
//             expect(mockBcrypt.hash).toHaveBeenCalledWith("password123", 10);
//             expect(mockPrisma.default.user.create).toHaveBeenCalledWith({
//                 data: {
//                     username: "testuser",
//                     email: "test@example.com",
//                     password: "hashedPassword"
//                 }
//             });
//             expect(mockCookie).toHaveBeenCalledWith("refreshToken", "refreshToken123", {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: 'strict',
//                 maxAge: 7 * 24 * 60 * 60 * 1000
//             });
//             expect(mockStatus).toHaveBeenCalledWith(201);
//             expect(mockJson).toHaveBeenCalledWith({
//                 message: "User created successfully",
//                 accessToken: "accessToken123",
//                 user: {
//                     id: "user123",
//                     email: "test@example.com",
//                     username: "testuser"
//                 }
//             });
//         });
//         it("should return 400 if required fields are missing", async () => {
//             mockReq.body = { username: "testuser" }; // missing email and password
//             await userSignUp(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(400);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "All fields are required"
//             });
//         });
//         it("should return 400 if validation fails", async () => {
//             mockReq.body = {
//                 username: "testuser",
//                 email: "invalid-email",
//                 password: "123"
//             };
//             mockUserSchema.safeParse.mockReturnValue({
//                 success: false,
//                 error: {
//                     errors: [{ message: "Invalid email format" }]
//                 }
//             } as never);
//             await userSignUp(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(400);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Validation failed",
//                 details: [{ message: "Invalid email format" }]
//             });
//         });
//         it("should return 409 if username already exists", async () => {
//             mockReq.body = {
//                 username: "existinguser",
//                 email: "test@example.com",
//                 password: "password123"
//             };
//             mockUserSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             mockPrisma.default.user.findUnique.mockResolvedValue({
//                 id: "existing123",
//                 username: "existinguser"
//             } as never);
//             await userSignUp(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(409);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Username already exists"
//             });
//         });
//         it("should return 409 if email already exists", async () => {
//             mockReq.body = {
//                 username: "newuser",
//                 email: "existing@example.com",
//                 password: "password123"
//             };
//             mockUserSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             mockPrisma.default.user.findUnique
//                 .mockResolvedValueOnce(null) // username check
//                 .mockResolvedValueOnce({ id: "existing123", email: "existing@example.com" } as never); // email check
//             await userSignUp(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(409);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Email already exists"
//             });
//         });
//         it("should handle database errors gracefully", async () => {
//             mockReq.body = {
//                 username: "testuser",
//                 email: "test@example.com",
//                 password: "password123"
//             };
//             mockUserSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             mockPrisma.default.user.findUnique
//                 .mockResolvedValueOnce(null)
//                 .mockResolvedValueOnce(null);
//             mockBcrypt.hash.mockResolvedValue("hashedPassword" as never);
//             const prismaError = new Error("Database error") as any;
//             prismaError.code = "P2002";
//             prismaError.meta = { target: ["email"] };
//             mockPrisma.default.user.create.mockRejectedValue(prismaError);
//             await userSignUp(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(409);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Unique constraint failed on: email"
//             });
//         });
//     });
//     describe("userSignIn", () => {
//         it("should sign in user successfully", async () => {
//             mockReq.body = {
//                 email: "test@example.com",
//                 password: "password123"
//             };
//             mockUserLoginSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             const user = {
//                 id: "user123",
//                 username: "testuser",
//                 email: "test@example.com",
//                 password: "hashedPassword"
//             };
//             mockPrisma.default.user.findUnique.mockResolvedValue(user as never);
//             mockBcrypt.compare.mockResolvedValue(true as never);
//             mockJwt.sign
//                 .mockReturnValueOnce("accessToken123" as never)
//                 .mockReturnValueOnce("refreshToken123" as never);
//             await userSignIn(mockReq as Request, mockRes as Response);
//             expect(mockPrisma.default.user.findUnique).toHaveBeenCalledWith({
//                 where: { email: "test@example.com" }
//             });
//             expect(mockBcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
//             expect(mockCookie).toHaveBeenCalledWith("refreshToken", "refreshToken123", {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: 'strict',
//                 maxAge: 7 * 24 * 60 * 60 * 1000
//             });
//             expect(mockStatus).toHaveBeenCalledWith(200);
//             expect(mockJson).toHaveBeenCalledWith({
//                 message: "Welcome back testuser",
//                 accessToken: "accessToken123",
//                 user: {
//                     id: "user123",
//                     email: "test@example.com",
//                     username: "testuser"
//                 }
//             });
//         });
//         it("should return 400 if required fields are missing", async () => {
//             mockReq.body = { email: "test@example.com" }; // missing password
//             await userSignIn(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(400);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Email and password are required"
//             });
//         });
//         it("should return 400 if validation fails", async () => {
//             mockReq.body = {
//                 email: "invalid-email",
//                 password: "password123"
//             };
//             mockUserLoginSchema.safeParse.mockReturnValue({
//                 success: false,
//                 error: {
//                     errors: [{ message: "Invalid email format" }]
//                 }
//             } as never);
//             await userSignIn(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(400);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Validation failed",
//                 details: [{ message: "Invalid email format" }]
//             });
//         });
//         it("should return 401 if user not found", async () => {
//             mockReq.body = {
//                 email: "nonexistent@example.com",
//                 password: "password123"
//             };
//             mockUserLoginSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             mockPrisma.default.user.findUnique.mockResolvedValue(null);
//             await userSignIn(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(401);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Invalid credentials"
//             });
//         });
//         it("should return 401 if password is incorrect", async () => {
//             mockReq.body = {
//                 email: "test@example.com",
//                 password: "wrongpassword"
//             };
//             mockUserLoginSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             const user = {
//                 id: "user123",
//                 username: "testuser",
//                 email: "test@example.com",
//                 password: "hashedPassword"
//             };
//             mockPrisma.default.user.findUnique.mockResolvedValue(user as never);
//             mockBcrypt.compare.mockResolvedValue(false as never);
//             await userSignIn(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(401);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Invalid credentials"
//             });
//         });
//         it("should handle database errors gracefully", async () => {
//             mockReq.body = {
//                 email: "test@example.com",
//                 password: "password123"
//             };
//             mockUserLoginSchema.safeParse.mockReturnValue({
//                 success: true,
//                 data: mockReq.body
//             });
//             mockPrisma.default.user.findUnique.mockRejectedValue(new Error("Database connection failed"));
//             await userSignIn(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(500);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Internal server error"
//             });
//         });
//     });
//     describe("refreshToken", () => {
//         it("should refresh token successfully", async () => {
//             mockReq.cookies = {
//                 refreshToken: "validRefreshToken"
//             };
//             const decodedToken = {
//                 userId: "user123",
//                 email: "test@example.com"
//             };
//             const user = {
//                 id: "user123",
//                 username: "testuser",
//                 email: "test@example.com"
//             };
//             mockJwt.verify.mockReturnValue(decodedToken as never);
//             mockPrisma.default.user.findUnique.mockResolvedValue(user as never);
//             mockJwt.sign.mockReturnValue("newAccessToken123" as never);
//             await refreshToken(mockReq as Request, mockRes as Response);
//             expect(mockJwt.verify).toHaveBeenCalledWith("validRefreshToken", "delta");
//             expect(mockPrisma.default.user.findUnique).toHaveBeenCalledWith({
//                 where: { id: "user123" }
//             });
//             expect(mockStatus).toHaveBeenCalledWith(200);
//             expect(mockJson).toHaveBeenCalledWith({
//                 accessToken: "newAccessToken123",
//                 message: "Token refreshed successfully"
//             });
//         });
//         it("should return 401 if refresh token is missing", async () => {
//             mockReq.cookies = {};
//             await refreshToken(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(401);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Refresh token not found"
//             });
//         });
//         it("should return 401 if refresh token is invalid", async () => {
//             mockReq.cookies = {
//                 refreshToken: "invalidToken"
//             };
//             mockJwt.verify.mockImplementation(() => {
//                 throw new Error("Invalid token");
//             });
//             await refreshToken(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(401);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Invalid refresh token"
//             });
//         });
//         it("should return 401 if user not found", async () => {
//             mockReq.cookies = {
//                 refreshToken: "validRefreshToken"
//             };
//             const decodedToken = {
//                 userId: "user123",
//                 email: "test@example.com"
//             };
//             mockJwt.verify.mockReturnValue(decodedToken as never);
//             mockPrisma.default.user.findUnique.mockResolvedValue(null);
//             await refreshToken(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(401);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "User not found"
//             });
//         });
//         it("should handle JWT verification errors", async () => {
//             mockReq.cookies = {
//                 refreshToken: "expiredToken"
//             };
//             const jwtError = new Error("TokenExpiredError") as any;
//             jwtError.name = "TokenExpiredError";
//             mockJwt.verify.mockImplementation(() => {
//                 throw jwtError;
//             });
//             await refreshToken(mockReq as Request, mockRes as Response);
//             expect(mockStatus).toHaveBeenCalledWith(401);
//             expect(mockJson).toHaveBeenCalledWith({
//                 error: "Invalid refresh token"
//             });
//         });
//     });
//     describe("logout", () => {
//         it("should logout successfully", async () => {
//             await logout(mockReq as Request, mockRes as Response);
//             expect(mockClearCookie).toHaveBeenCalledWith("refreshToken");
//             expect(mockStatus).toHaveBeenCalledWith(200);
//             expect(mockJson).toHaveBeenCalledWith({
//                 message: "Logged out successfully"
//             });
//         });
//         it("should logout successfully even without refresh token", async () => {
//             mockReq.cookies = {};
//             await logout(mockReq as Request, mockRes as Response);
//             expect(mockClearCookie).toHaveBeenCalledWith("refreshToken");
//             expect(mockStatus).toHaveBeenCalledWith(200);
//             expect(mockJson).toHaveBeenCalledWith({
//                 message: "Logged out successfully"
//             });
//         });
//     });
// });
