import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboardController';

const router = Router();

router.get('/', leaderboardController.getLeaderboard);
router.get('/:userId', leaderboardController.getUserRank);
router.post('/update', leaderboardController.updateLeaderboard);
router.post('/recalculate', leaderboardController.recalculateLeaderboard);

export default router;
