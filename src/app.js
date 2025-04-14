"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const client_1 = require("@prisma/client");
const dashboard_1 = __importDefault(require("./routes/dashboard"));
// Load environment variables from .env
dotenv_1.default.config();
// Init Express and Prisma
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true
})); // Enable CORS
app.use(express_1.default.json()); // Parses JSON bodies
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/dashboard', dashboard_1.default);
// Root route
app.get('/', (req, res) => {
    res.send('🚀 API is running...');
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
