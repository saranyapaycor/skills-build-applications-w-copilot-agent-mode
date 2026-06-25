import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    mascot: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const Team = model('Team', teamSchema);

export default Team;
