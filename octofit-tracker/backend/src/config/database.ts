import mongoose from 'mongoose';

export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB (octofit_db)');
}