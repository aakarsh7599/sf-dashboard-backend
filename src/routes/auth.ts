import { Router, Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

const router = Router();

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { token } = await loginUser(email, password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
});

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const { token } = await registerUser(email, password);
    res.json({ token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/login', (req, res) => {
  res.send('GET /auth/login working!');
});

export default router;