"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const salesforceService_1 = require("../services/salesforceService");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const { accounts, total } = await (0, salesforceService_1.getSalesforceAccounts)(page, limit);
        res.json({ accounts, total, page, limit });
    }
    catch (err) {
        res.status(500).json({ error: err.message || 'Failed to fetch accounts' });
    }
});
exports.default = router;
