import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { getSalesforceAccounts } from '../services/salesforceService';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const { accounts, total } = await getSalesforceAccounts(page, limit);

    res.json({ accounts, total, page, limit });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch accounts' });
  }
});

export default router;