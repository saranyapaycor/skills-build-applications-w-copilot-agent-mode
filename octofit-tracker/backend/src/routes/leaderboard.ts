import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;
