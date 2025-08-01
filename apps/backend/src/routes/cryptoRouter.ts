import { Router } from "express";
import { buyCrypto,CryptoInserter,sellCrypto } from "../engine/cryptoDealer";


const router = Router()

router.post("/buy",buyCrypto)
router.post("/sell",sellCrypto)
router.post("/deposit",CryptoInserter)
export default router