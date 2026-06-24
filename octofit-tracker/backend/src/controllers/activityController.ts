import { Request, Response } from 'express';
import { Activity } from '../models/Activity';

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'username email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
};

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', 'username email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
};

export const getUserActivities = async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).populate('userId', 'username email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user activities' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('userId', 'username email');
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('userId', 'username email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
};
