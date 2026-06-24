import { Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';
import { Activity } from '../models/Activity';

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ totalCalories: -1 })
      .limit(100);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};

export const getUserRank = async (req: Request, res: Response) => {
  try {
    const userRank = await Leaderboard.findOne({ userId: req.params.userId });
    if (!userRank) {
      return res.status(404).json({ error: 'User not found on leaderboard' });
    }
    res.json(userRank);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rank' });
  }
};

export const updateLeaderboard = async (req: Request, res: Response) => {
  try {
    const { userId, username } = req.body;

    const activities = await Activity.find({ userId });
    const totalActivities = activities.length;
    const totalCalories = activities.reduce((sum, act) => sum + act.calories, 0);
    const totalDistance = activities.reduce((sum, act) => sum + (act.distance || 0), 0);

    const leaderboard = await Leaderboard.findOneAndUpdate(
      { userId },
      {
        userId,
        username,
        totalActivities,
        totalCalories,
        totalDistance,
      },
      { upsert: true, new: true }
    );

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leaderboard' });
  }
};

export const recalculateLeaderboard = async (req: Request, res: Response) => {
  try {
    await Leaderboard.deleteMany({});
    res.json({ message: 'Leaderboard recalculated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recalculate leaderboard' });
  }
};
