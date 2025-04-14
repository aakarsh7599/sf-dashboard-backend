"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authService_1 = require("../services/authService");
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const { token } = await (0, authService_1.loginUser)(email, password);
        res.json({ token });
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
});
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const { token } = await (0, authService_1.registerUser)(email, password);
        res.json({ token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.get('/login', (req, res) => {
    res.send('GET /auth/login working!');
});
exports.default = router;
