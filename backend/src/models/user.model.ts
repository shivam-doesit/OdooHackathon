import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  blocked: boolean;
  points: number;
  avatar?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  blocked:  { type: Boolean, default: false },
  points:   { type: Number, default: 50 },
  avatar:   { type: String }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);