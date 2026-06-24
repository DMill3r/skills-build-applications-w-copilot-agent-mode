# OctoFit Tracker Data Tier - Quick Start

## Overview

The OctoFit Tracker backend is fully set up with:
- ✓ Express.js API on port 8000
- ✓ MongoDB database (`octofit_db`) on port 27017
- ✓ 5 Mongoose models with complete CRUD operations
- ✓ Seed script with 25+ test data objects
- ✓ All API endpoints verified and working

## Quick Commands

```bash
# Populate database with test data
npm run seed

# Start development server (watches for changes)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start
```

## Seeded Data

**5 Users:**
- alex_runner, sarah_cyclist, mike_swimmer, emma_gym, james_athlete

**3 Teams:**
- Morning Warriors, Gym Legends, Endurance Squad

**10 Activities:**
- Running, Cycling, Swimming, and Gym activities with realistic stats

**5 Workouts:**
- Beginner, Intermediate, and Advanced training programs

**5 Leaderboard Rankings:**
- Auto-calculated by total calories burned

## API Endpoints (All Tested ✓)

```
Health Check:
  GET /api/health

Users:
  GET    /api/users
  GET    /api/users/:id
  POST   /api/users
  PUT    /api/users/:id
  DELETE /api/users/:id

Activities:
  GET    /api/activities
  GET    /api/activities/:id
  GET    /api/activities/user/:userId
  POST   /api/activities
  PUT    /api/activities/:id
  DELETE /api/activities/:id

Teams:
  GET    /api/teams
  GET    /api/teams/:id
  POST   /api/teams
  PUT    /api/teams/:id
  DELETE /api/teams/:id
  POST   /api/teams/:id/members
  DELETE /api/teams/:id/members

Leaderboard:
  GET    /api/leaderboard
  GET    /api/leaderboard/:userId
  POST   /api/leaderboard/update
  POST   /api/leaderboard/recalculate

Workouts:
  GET    /api/workouts
  GET    /api/workouts/:id
  POST   /api/workouts
  PUT    /api/workouts/:id
  DELETE /api/workouts/:id
```

## Example API Calls

```bash
# Get all users
curl http://localhost:8000/api/users | jq

# Get user's activities
curl http://localhost:8000/api/activities/user/{userId} | jq

# Get leaderboard rankings
curl http://localhost:8000/api/leaderboard | jq

# Create new user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new_user",
    "email": "user@example.com",
    "password": "hashed_password",
    "profile": {
      "firstName": "John",
      "lastName": "Doe"
    }
  }'
```

## Database Status

✓ MongoDB running on port 27017
✓ Database: `octofit_db`
✓ Test data: Fully populated and verified
✓ API: All endpoints functional

## Next Steps

1. Connect the React frontend (port 5173) to this API
2. Implement user authentication (JWT)
3. Add real-time leaderboard updates
4. Deploy to production

Ready to build the frontend! 🚀
