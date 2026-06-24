import mongoose, { Schema, Document } from 'mongoose';
import { IActivity } from '../types';

interface ActivityDocument extends Omit<IActivity, '_id'>, Document {}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['running', 'cycling', 'swimming', 'gym', 'other'],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    distance: {
      type: Number,
      default: null,
    },
    calories: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
