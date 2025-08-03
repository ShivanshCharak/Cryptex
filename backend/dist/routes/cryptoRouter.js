"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoDealer_1 = require("../engine/cryptoDealer");
const router = (0, express_1.Router)();
router.post("/buy", cryptoDealer_1.buyCrypto);
router.post("/sell", cryptoDealer_1.sellCrypto);
router.post("/deposit", cryptoDealer_1.CryptoInserter);
exports.default = router;
