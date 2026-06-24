# OctoFit Tracker Backend API

## Overview

Express.js REST API for the OctoFit Tracker multi-tier application, built with TypeScript and Mongoose.

- **Server**: Runs on port `8000`
- **Database**: MongoDB on port `27017` (database: `octofit_db`)
- **Environment**: Supports Codespaces with auto-generated URLs

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Users (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `POST /` - Create new user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

### Activities (`/api/activities`)
- `GET /` - Get all activities
- `GET /:id` - Get activity by ID
- `GET /user/:userId` - Get user's activities
- `POST /` - Log new activity
- `PUT /:id` - Update activity
- `DELETE /:id` - Delete activity

### Teams (`/api/teams`)
- `GET /` - Get all teams
- `GET /:id` - Get team by ID
- `POST /` - Create team
- `PUT /:id` - Update team
- `DELETE /:id` - Delete team
- `POST /:id/members` - Add team member
- `DELETE /:id/members` - Remove team member

### Leaderboard (`/api/leaderboard`)
- `GET /` - Get leaderboard (sorted by calories)
- `GET /:userId` - Get user's rank
- `POST /update` - Update user's leaderboard stats
- `POST /recalculate` - Recalculate entire leaderboard

### Workouts (`/api/workouts`)
- `GET /` - Get all workouts (optional filter: `?targetAudience=beginner`)
- `GET /:id` - Get workout by ID
- `POST /` - Create workout
- `PUT /:id` - Update workout
- `DELETE /:id` - Delete workout

## Project Structure

```
src/
├── config/          # Database & environment config
├── models/          # Mongoose schemas (User, Team, Activity, etc.)
├── controllers/     # Business logic for each resource
├── routes/          # API route definitions
├── middleware/      # Error handling & utilities
├── types/          # TypeScript interfaces
└── server.ts       # Express app setup
```

## Development

```bash
# Start dev server (ts-node)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run compiled JavaScript
npm start
```

## Database Models

- **User**: Username, email, password, profile (firstName, lastName, avatar)
- **Team**: Name, description, leader, members list
- **Activity**: User activity with type, duration, distance, calories, date
- **Leaderboard**: User stats with rank, totalActivities, totalCalories, totalDistance
- **Workout**: Title, description, targetAudience, exercises array

## Features

✓ RESTful API with Express.js
✓ TypeScript for type safety
✓ MongoDB integration with Mongoose
✓ Proper error handling middleware
✓ CORS enabled for frontend integration
✓ Environment-aware configuration
✓ User authentication ready (models in place)
✓ Team management
✓ Activity logging & tracking
✓ Competitive leaderboard
✓ Personalized workout suggestions
