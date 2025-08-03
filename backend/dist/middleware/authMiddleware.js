"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: {email:string} | JwtPayload
//   }
// }
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'Server config error' });
    }
    try {
        console.log("Access token received");
        const payload = (0, jsonwebtoken_1.verify)(token, secret);
        console.log(payload);
        req.user = payload;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}
