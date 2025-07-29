import { Router } from "express";
import {refreshToken, userSignIn, userSignUp } from "../engine/userAuth";


const router = Router();

router.use((req, res, next) => {
  console.log("/auth router middleware hit:", req.method, req.path); // LOG THIS
  next();
});

router.post("/signup", userSignUp);
router.post("/login", userSignIn);
router.get("/me", refreshToken);

export default router;
