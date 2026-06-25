import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    pointsEarned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Activity = model('Activity', activitySchema);

export default Activity;
