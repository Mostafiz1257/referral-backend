import mongoose, { Document, Schema } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  referralCode: string;
  credits: number;
  referredBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  role: 'admin' | 'user';
}
export type TUserRole = keyof typeof USER_ROLE;

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true },
    credits: { type: Number, default: 0 },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.user,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', userSchema);
