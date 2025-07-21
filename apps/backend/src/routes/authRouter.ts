import { Router } from "express";
import {userSignIn, userSignUp } from "../engine/userAuth";


const router = Router();

router.use((req, res, next) => {
  console.log("/auth router middleware hit:", req.method, req.path); // LOG THIS
  next();
});

router.post("/signup", userSignUp);
router.post("/login", userSignIn);

export default router;
