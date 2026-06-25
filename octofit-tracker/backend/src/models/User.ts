import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    displayName: { type: String, required: true, trim: true },
    gradeLevel: { type: Number, required: true, min: 9, max: 12 },
    fitnessGoal: { type: String, required: true, trim: true },
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
