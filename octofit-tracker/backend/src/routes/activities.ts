import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user').sort({ activityDate: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

export default router;
