import mongoose from 'mongoose';
import { mongoUri } from '../config/database';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      username: 'maya_rivera',
      email: 'maya.rivera@mergington.edu',
      displayName: 'Maya Rivera',
      gradeLevel: 10,
      fitnessGoal: 'Build endurance for spring track',
      totalPoints: 880,
    },
    {
      username: 'jordan_lee',
      email: 'jordan.lee@mergington.edu',
      displayName: 'Jordan Lee',
      gradeLevel: 11,
      fitnessGoal: 'Improve strength and mobility',
      totalPoints: 760,
    },
    {
      username: 'sam_paterson',
      email: 'sam.paterson@mergington.edu',
      displayName: 'Sam Paterson',
      gradeLevel: 9,
      fitnessGoal: 'Stay active after school',
      totalPoints: 645,
    },
    {
      username: 'alina_okafor',
      email: 'alina.okafor@mergington.edu',
      displayName: 'Alina Okafor',
      gradeLevel: 12,
      fitnessGoal: 'Train consistently for soccer',
      totalPoints: 940,
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Cardio Crew',
      mascot: 'Lightning Bolt',
      coach: 'Paul Octo',
      members: [users[0]._id, users[2]._id],
      weeklyGoalMinutes: 360,
    },
    {
      name: 'Strength Squad',
      mascot: 'Barbell',
      coach: 'Jessica Cat',
      members: [users[1]._id, users[3]._id],
      weeklyGoalMinutes: 300,
    },
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      activityType: 'Running',
      durationMinutes: 42,
      distanceMiles: 4.1,
      caloriesBurned: 390,
      pointsEarned: 120,
      activityDate: new Date('2026-06-18T15:30:00Z'),
    },
    {
      user: users[1]._id,
      activityType: 'Strength Training',
      durationMinutes: 38,
      caloriesBurned: 260,
      pointsEarned: 95,
      activityDate: new Date('2026-06-19T16:00:00Z'),
    },
    {
      user: users[2]._id,
      activityType: 'Walking',
      durationMinutes: 55,
      distanceMiles: 2.8,
      caloriesBurned: 210,
      pointsEarned: 80,
      activityDate: new Date('2026-06-20T14:15:00Z'),
    },
    {
      user: users[3]._id,
      activityType: 'Soccer Drills',
      durationMinutes: 60,
      distanceMiles: 3.2,
      caloriesBurned: 480,
      pointsEarned: 140,
      activityDate: new Date('2026-06-21T13:45:00Z'),
    },
  ]);

  await Leaderboard.insertMany([
    {
      user: users[3]._id,
      team: teams[1]._id,
      rank: 1,
      points: 940,
      activeMinutes: 315,
      period: 'June 2026',
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      rank: 2,
      points: 880,
      activeMinutes: 290,
      period: 'June 2026',
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      rank: 3,
      points: 760,
      activeMinutes: 245,
      period: 'June 2026',
    },
    {
      user: users[2]._id,
      team: teams[0]._id,
      rank: 4,
      points: 645,
      activeMinutes: 220,
      period: 'June 2026',
    },
  ]);

  await Workout.insertMany([
    {
      name: 'Beginner 5K Builder',
      focusArea: 'Cardio',
      difficulty: 'beginner',
      durationMinutes: 30,
      suggestedForGoal: 'Build endurance for spring track',
      exercises: ['5 minute brisk walk', '8 rounds of 1 minute jog and 1 minute walk', '5 minute cooldown'],
    },
    {
      name: 'After-School Strength Circuit',
      focusArea: 'Strength',
      difficulty: 'intermediate',
      durationMinutes: 35,
      suggestedForGoal: 'Improve strength and mobility',
      exercises: ['Bodyweight squats', 'Push-ups', 'Walking lunges', 'Plank holds'],
    },
    {
      name: 'Soccer Agility Session',
      focusArea: 'Agility',
      difficulty: 'advanced',
      durationMinutes: 45,
      suggestedForGoal: 'Train consistently for soccer',
      exercises: ['Cone shuttles', 'Lateral bounds', 'Sprint intervals', 'Single-leg balance'],
    },
    {
      name: 'Daily Movement Reset',
      focusArea: 'Mobility',
      difficulty: 'beginner',
      durationMinutes: 20,
      suggestedForGoal: 'Stay active after school',
      exercises: ['Dynamic stretching', 'Easy walk', 'Hip mobility flow', 'Breathing cooldown'],
    },
  ]);

  console.log('OctoFit sample data inserted successfully');
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
