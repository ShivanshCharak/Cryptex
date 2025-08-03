"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z.string().min(2, "Name should be more than 2 characters"),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string()
});
exports.userLoginSchema = zod_1.z.object({
    password: zod_1.z.string(),
    email: zod_1.z.string().min(2, "Name should be more than 2 characters")
});
