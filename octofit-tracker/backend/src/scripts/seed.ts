import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to octofit_db');

    // Clear existing data
    console.log('\n📝 Clearing existing data...');
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('✓ Database cleared');

    // Create sample users
    console.log('\n👥 Creating sample users...');
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@example.com',
        password: 'hashed_password_1',
        profile: {
          firstName: 'Alex',
          lastName: 'Johnson',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        username: 'sarah_cyclist',
        email: 'sarah@example.com',
        password: 'hashed_password_2',
        profile: {
          firstName: 'Sarah',
          lastName: 'Williams',
          avatar: 'https://i.pravatar.cc/150?img=2',
        },
      },
      {
        username: 'mike_swimmer',
        email: 'mike@example.com',
        password: 'hashed_password_3',
        profile: {
          firstName: 'Mike',
          lastName: 'Chen',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      },
      {
        username: 'emma_gym',
        email: 'emma@example.com',
        password: 'hashed_password_4',
        profile: {
          firstName: 'Emma',
          lastName: 'Davis',
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
      },
      {
        username: 'james_athlete',
        email: 'james@example.com',
        password: 'hashed_password_5',
        profile: {
          firstName: 'James',
          lastName: 'Martinez',
          avatar: 'https://i.pravatar.cc/150?img=5',
        },
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    console.log('\n🏆 Creating sample teams...');
    const teams = await Team.insertMany([
      {
        name: 'Morning Warriors',
        description: 'Early risers united for fitness',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Gym Legends',
        description: 'Strength training enthusiasts',
        leader: users[3]._id,
        members: [users[3]._id, users[4]._id],
      },
      {
        name: 'Endurance Squad',
        description: 'Long-distance runners and cyclists',
        leader: users[1]._id,
        members: [users[0]._id, users[1]._id, users[4]._id],
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Create sample activities
    console.log('\n🏃 Creating sample activities...');
    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 7.2,
        calories: 520,
        date: new Date('2026-06-24T08:00:00'),
        notes: 'Morning run in the park',
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 50,
        distance: 8.1,
        calories: 580,
        date: new Date('2026-06-23T07:30:00'),
        notes: 'Strong pace today',
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 60,
        distance: 22.5,
        calories: 650,
        date: new Date('2026-06-24T18:00:00'),
        notes: 'Evening bike ride',
      },
      {
        userId: users[1]._id,
        type: 'cycling',
        duration: 75,
        distance: 28.3,
        calories: 780,
        date: new Date('2026-06-22T09:00:00'),
        notes: 'Long distance ride',
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 40,
        distance: 1.5,
        calories: 420,
        date: new Date('2026-06-24T10:00:00'),
        notes: 'Pool session',
      },
      {
        userId: users[2]._id,
        type: 'swimming',
        duration: 45,
        distance: 1.8,
        calories: 480,
        date: new Date('2026-06-21T10:30:00'),
        notes: 'Interval training',
      },
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 60,
        calories: 520,
        date: new Date('2026-06-24T17:00:00'),
        notes: 'Upper body workout',
      },
      {
        userId: users[3]._id,
        type: 'gym',
        duration: 55,
        calories: 480,
        date: new Date('2026-06-20T17:30:00'),
        notes: 'Leg day',
      },
      {
        userId: users[4]._id,
        type: 'running',
        duration: 35,
        distance: 5.5,
        calories: 400,
        date: new Date('2026-06-24T06:00:00'),
        notes: 'Quick morning run',
      },
      {
        userId: users[4]._id,
        type: 'gym',
        duration: 50,
        calories: 450,
        date: new Date('2026-06-19T18:00:00'),
        notes: 'Crossfit class',
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create sample workouts
    console.log('\n💪 Creating sample workouts...');
    const workouts = await Workout.insertMany([
      {
        title: 'Beginner Running Program',
        description: 'Perfect for starting your running journey',
        targetAudience: 'beginner',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1, duration: 5 },
          { name: 'Easy pace run', sets: 1, reps: 1, duration: 20 },
          { name: 'Cool-down walk', sets: 1, reps: 1, duration: 5 },
        ],
      },
      {
        title: 'Intermediate HIIT Workout',
        description: 'High-intensity interval training for cardio',
        targetAudience: 'intermediate',
        exercises: [
          { name: 'Jumping jacks', sets: 3, reps: 30 },
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Mountain climbers', sets: 3, reps: 20 },
          { name: 'High knees', sets: 3, reps: 30 },
        ],
      },
      {
        title: 'Advanced Strength Training',
        description: 'Comprehensive strength building routine',
        targetAudience: 'advanced',
        exercises: [
          { name: 'Barbell squats', sets: 4, reps: 8 },
          { name: 'Bench press', sets: 4, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
          { name: 'Pull-ups', sets: 3, reps: 10 },
        ],
      },
      {
        title: 'Beginner Yoga Flow',
        description: 'Gentle yoga for flexibility and relaxation',
        targetAudience: 'beginner',
        exercises: [
          { name: 'Child pose', sets: 1, reps: 1, duration: 1 },
          { name: 'Downward dog', sets: 2, reps: 5, duration: 1 },
          { name: 'Warrior pose', sets: 2, reps: 5, duration: 1 },
        ],
      },
      {
        title: 'Intermediate Cycling Training',
        description: 'Build endurance and speed on the bike',
        targetAudience: 'intermediate',
        exercises: [
          { name: 'Warm-up ride', sets: 1, reps: 1, duration: 10 },
          { name: 'Tempo intervals', sets: 5, reps: 1, duration: 3 },
          { name: 'Cool-down', sets: 1, reps: 1, duration: 10 },
        ],
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    // Update leaderboard with calculated stats
    console.log('\n📊 Updating leaderboard...');
    const leaderboardEntries = [];
    for (const user of users) {
      const userActivities = activities.filter((a) => a.userId.equals(user._id));
      const totalActivities = userActivities.length;
      const totalCalories = userActivities.reduce((sum, a) => sum + a.calories, 0);
      const totalDistance = userActivities.reduce((sum, a) => sum + (a.distance || 0), 0);

      leaderboardEntries.push({
        userId: user._id,
        username: user.username,
        totalActivities,
        totalCalories,
        totalDistance,
        rank: 0,
      });
    }

    // Sort by calories and assign ranks
    leaderboardEntries.sort((a, b) => b.totalCalories - a.totalCalories);
    leaderboardEntries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    await Leaderboard.insertMany(leaderboardEntries);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    // Display summary
    console.log('\n✨ Database seeding completed successfully!\n');
    console.log('📈 Summary:');
    console.log(`  • ${users.length} users`);
    console.log(`  • ${teams.length} teams`);
    console.log(`  • ${activities.length} activities`);
    console.log(`  • ${workouts.length} workouts`);
    console.log(`  • ${leaderboardEntries.length} leaderboard entries`);
    console.log('\n🔗 Connect to the API to verify data:');
    console.log('  $ npm run dev');
    console.log('  $ curl http://localhost:8000/api/health');

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
