import mongoose, { Schema, Document } from 'mongoose';
import { IWorkout } from '../types';

interface WorkoutDocument extends Omit<IWorkout, '_id'>, Document {}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    targetAudience: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    exercises: [
      {
        name: {
          type: String,
          required: true,
        },
        sets: {
          type: Number,
          required: true,
        },
        reps: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
