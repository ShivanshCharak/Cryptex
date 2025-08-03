"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("../engine/userAuth");
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    console.log("/auth router middleware hit:", req.method, req.path); // LOG THIS
    next();
});
router.post("/signup", userAuth_1.userSignUp);
router.post("/login", userAuth_1.userSignIn);
router.get("/me", userAuth_1.refreshToken);
exports.default = router;
