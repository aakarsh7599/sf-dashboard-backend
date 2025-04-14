"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
exports.registerUser = registerUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function loginUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    console.log('User-entered password:', password);
    console.log('Stored hash:', user.password);
    const isMatch1 = await bcrypt_1.default.compare(password, user.password);
    console.log('Password match:', isMatch1);
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
}
async function registerUser(email, password) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error('User already exists');
    }
    const hashed = await bcrypt_1.default.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashed,
        },
    });
    const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
}
