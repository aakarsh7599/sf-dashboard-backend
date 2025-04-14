"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const email = 'aakarsh0705@gmail.com';
    const password = 'Aak@1234'; // plain text
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashed
        },
    });
    console.log('✅ Created user:', user);
}
main()
    .catch((e) => console.error('❌ Error:', e))
    .finally(() => prisma.$disconnect());
