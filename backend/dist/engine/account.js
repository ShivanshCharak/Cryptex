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
exports.depositMoney = depositMoney;
const postgres_prisma_1 = __importDefault(require("@repo/postgres-prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const metrics_1 = require("../Monitoring/metrics");
function depositMoney(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("deposit money");
        metrics_1.httpTotalRequest.inc({
            routes: "/account/deposit"
        });
        try {
            console.log(metrics_1.errorTotal);
            const { amountToDeposit } = req.body;
            if (amountToDeposit === undefined) {
                metrics_1.errorTotal.inc({ status_code: "400", error: "Amount is required", routes: "/account/deposit" });
                res.status(400).json({ error: " amount is required." });
                return;
            }
            if (Number(amountToDeposit) <= 0) {
                metrics_1.errorTotal.inc({
                    status_code: "400",
                    error: "Amont must be positive",
                    routes: "/account/deposit"
                });
                res.status(400).json({ error: "Amount must be positive." });
                return;
            }
            const accountUpdated = yield postgres_prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const existingUser = yield tx.user.findUnique({
                    where: { email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email },
                    select: { id: true }
                });
                console.log("existisng user", existingUser, req.user);
                if (!existingUser) {
                    throw new Error("UserNotFound");
                }
                const existingAccount = yield tx.accountBalance.findFirst({
                    where: { userId: existingUser.id }
                });
                if (existingAccount) {
                    console.log("existing account", existingAccount);
                    return yield tx.accountBalance.update({
                        where: { id: existingAccount.id },
                        data: { amount: { increment: Number(amountToDeposit) } },
                        select: { amount: true }
                    });
                }
                else {
                    console.log(existingUser.id, "existing users");
                    return yield tx.accountBalance.create({
                        data: {
                            amount: Number(amountToDeposit),
                            user: { connect: { id: existingUser.id } }
                        },
                        select: { amount: true }
                    });
                }
            }));
            metrics_1.httpSuccessfullRequest.inc({
                method: "201",
                routes: "/account/deposit",
                message: "Amount deposited successfully"
            });
            res.status(201).json({
                message: "Amount deposited successfully.",
                account: accountUpdated
            });
            return;
        }
        catch (error) {
            metrics_1.errorTotal.inc({
                status_code: "401",
                error: `Deposit error ${error}`,
                routes: "/account/deposit"
            });
            console.error("Deposit error:", error);
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                metrics_1.errorTotal.inc({
                    status_code: "401",
                    error: `Invalid token`,
                    routes: "/account/deposit"
                });
                res.status(401).json({ error: "Invalid token." });
                return;
            }
            if (error.message === "UserNotFound") {
                metrics_1.errorTotal.inc({
                    status_code: "401",
                    error: `User not found`,
                    routes: "/account/deposit"
                });
                res.status(404).json({ error: "User not found." });
                return;
            }
            metrics_1.errorTotal.inc({
                status_code: "500",
                error: `Internal server error`,
                routes: "/account/deposit"
            });
            res.status(500).json({ error: "Internal server error." });
            return;
        }
    });
}
