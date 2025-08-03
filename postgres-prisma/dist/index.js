"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prisma = void 0;
const client_1 = require("../prisma/generated/client");
Object.defineProperty(exports, "Prisma", { enumerable: true, get: function () { return client_1.Prisma; } });
const prisma = new client_1.PrismaClient();
exports.default = prisma;
//# sourceMappingURL=index.js.map