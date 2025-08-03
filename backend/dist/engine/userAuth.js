"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignUp = userSignUp;
exports.userSignIn = userSignIn;
exports.refreshToken = refreshToken;
exports.logout = logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postgres_prisma_1 = __importDefault(require("@repo/postgres-prisma"));
const zodvalidator_1 = require("../zodvalidator");
const dotenv_1 = __importDefault(require("dotenv"));
const metrics_1 = require("../Monitoring/metrics");
dotenv_1.default.config();
const SALT_ROUNDS = 10;
function userSignUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        metrics_1.httpTotalRequest.inc({
            routes: "/auth/signup"
        });
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            metrics_1.errorTotal.inc({ status_code: 400, error: "All fields are required", routes: "/auth/signup" });
            res.status(400).json({ error: "All fields are required" });
            return;
        }
        const validation = zodvalidator_1.userSchema.safeParse({ username, password, email });
        if (!validation.success) {
            metrics_1.errorTotal.inc({
                status_code: "400",
                error: "Validation failed",
                routes: "/auth/signup"
            });
            res.status(400).json({
                error: "Validation failed",
                details: validation.error.errors
            });
            return;
        }
        try {
            const existingUser = yield postgres_prisma_1.default.user.findUnique({
                where: { username },
            });
            if (existingUser) {
                res.status(409).json({ error: "Username already exists" });
                return;
            }
            const existingEmail = yield postgres_prisma_1.default.user.findUnique({
                where: { email },
            });
            if (existingEmail) {
                res.status(409).json({ error: "Email already exists" });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const user = yield postgres_prisma_1.default.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    email,
                },
            });
            const tokenPayload = {
                userId: user.id,
                email: user.email
            };
            const accessToken = jsonwebtoken_1.default.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m"
            });
            const refreshToken = jsonwebtoken_1.default.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "7d"
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            metrics_1.httpSuccessfullRequest.inc({
                method: "201",
                routes: "/auth/signup",
                message: "User created successfulyl"
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
        }
        catch (error) {
            console.error("Signup error:", error);
            if (error.code === "P2002") {
                metrics_1.errorTotal.inc({
                    status_code: "409",
                    error: `Unique constraint failed on: ${(_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.join(", ")}`,
                    routes: "/auth/signup"
                });
                res.status(409).json({
                    error: `Unique constraint failed on: ${(_d = (_c = error.meta) === null || _c === void 0 ? void 0 : _c.target) === null || _d === void 0 ? void 0 : _d.join(", ")}`
                });
            }
            else {
                metrics_1.errorTotal.inc({
                    status_code: "500",
                    error: `Internal server error`,
                    routes: "/auth/signup"
                });
                res.status(500).json({ error: "Internal server error" });
            }
        }
    });
}
function userSignIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, email } = req.body;
        metrics_1.httpTotalRequest.inc({
            routes: "/auth/signin"
        });
        if (!password || !email) {
            metrics_1.errorTotal.inc({
                status_code: "400",
                error: `Email and password is required`,
                routes: "/auth/refreshToken"
            });
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        const validation = zodvalidator_1.userLoginSchema.safeParse({ password, email });
        if (!validation.success) {
            metrics_1.errorTotal.inc({
                status_code: "400",
                error: `Validation failed`,
                routes: "/auth/signin"
            });
            res.status(400).json({
                error: "Validation failed",
                details: validation.error.errors
            });
            return;
        }
        try {
            const user = yield postgres_prisma_1.default.user.findUnique({
                where: { email },
            });
            if (!user) {
                metrics_1.errorTotal.inc({
                    status_code: "401",
                    error: `Invalid creds`,
                    routes: "/auth/signin"
                });
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const isValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isValid) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const tokenPayload = {
                userId: user.id,
                email: user.email
            };
            const accessToken = jsonwebtoken_1.default.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m"
            });
            const refreshToken = jsonwebtoken_1.default.sign(tokenPayload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "7d"
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            metrics_1.httpSuccessfullRequest.inc({
                method: "200",
                routes: "/auth/signin",
                message: "Succesfully loggedin"
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
        }
        catch (error) {
            metrics_1.errorTotal.inc({
                status_code: "500",
                error: `Sign-in error: ${error}`,
                routes: "/auth/signin"
            });
            console.error("Sign-in error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            metrics_1.errorTotal.inc({
                status_code: "401",
                error: `Refresh token not found`,
                routes: "/auth/refreshToken"
            });
            res.status(401).json({ error: "Refresh token not found" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = yield postgres_prisma_1.default.user.findUnique({
                where: { id: decoded.userId },
            });
            if (!user) {
                metrics_1.errorTotal.inc({
                    status_code: "401",
                    error: `User not found`,
                    routes: "/auth/refreshToken"
                });
                res.status(401).json({ error: "User not found" });
                return;
            }
            const tokenPayload = {
                userId: user.id,
                email: user.email
            };
            const newAccessToken = jsonwebtoken_1.default.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m"
            });
            metrics_1.httpSuccessfullRequest.inc({
                method: "200",
                routes: "/auth/refreshToken",
                message: "Token created succesfully"
            });
            res.status(200).json({
                accessToken: newAccessToken,
                message: "Token refreshed successfully"
            });
        }
        catch (error) {
            metrics_1.errorTotal.inc({
                status_code: "401",
                error: `Token refresh error,${error}`,
                routes: "/auth/refreshToken"
            });
            console.error("Token refresh error:", error);
            res.status(401).json({ error: "Invalid refresh token" });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        metrics_1.httpTotalRequest.inc({
            routes: "/auth/logout"
        });
        res.clearCookie('refreshToken');
        metrics_1.httpSuccessfullRequest.inc({
            method: "200",
            routes: "/auth/logout",
            message: "Logged out successfully"
        });
        res.status(200).json({ message: "Logged out successfully" });
    });
}
