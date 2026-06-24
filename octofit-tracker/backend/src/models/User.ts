import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from '../types';

interface UserDocument extends Omit<IUser, '_id'>, Document {}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      firstName: {
        type: String,
        default: '',
      },
      lastName: {
        type: String,
        default: '',
      },
      avatar: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>('User', userSchema);
