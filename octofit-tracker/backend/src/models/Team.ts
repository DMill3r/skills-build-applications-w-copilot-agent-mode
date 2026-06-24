import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from '../types';

interface TeamDocument extends Omit<ITeam, '_id'>, Document {}

const teamSchema = new Schema<TeamDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    leader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export const Team = mongoose.model<TeamDocument>('Team', teamSchema);
