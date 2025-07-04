import { Router } from "express";
import { userSignin, userSignUp } from "../engine/userAuth";

console.log("✅ auth.ts loaded"); // LOG THIS

const router = Router();

router.use((req, res, next) => {
  console.log("✅ /auth router middleware hit:", req.method, req.path); // LOG THIS
  next();
});

router.post("/signup", userSignUp);
router.post("/signin", userSignin);

export default router;
