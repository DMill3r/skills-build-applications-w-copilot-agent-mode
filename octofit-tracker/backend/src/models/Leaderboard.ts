import mongoose, { Schema, Document } from 'mongoose';
import { ILeaderboard } from '../types';

interface LeaderboardDocument extends Omit<ILeaderboard, '_id'>, Document {}

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    totalActivities: {
      type: Number,
      default: 0,
    },
    totalCalories: {
      type: Number,
      default: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
