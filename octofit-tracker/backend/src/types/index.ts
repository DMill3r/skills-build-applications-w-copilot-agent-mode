import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeam {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  leader: Types.ObjectId;
  members: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActivity {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  type: 'running' | 'cycling' | 'swimming' | 'gym' | 'other';
  duration: number;
  distance?: number;
  calories: number;
  date: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILeaderboard {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  username: string;
  totalActivities: number;
  totalCalories: number;
  totalDistance: number;
  rank: number;
  updatedAt?: Date;
}

export interface IWorkout {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  targetAudience: 'beginner' | 'intermediate' | 'advanced';
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    duration?: number;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}
