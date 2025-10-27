import mongoose, { Document, Schema } from 'mongoose';

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId;
  referredUser: mongoose.Types.ObjectId;
  hasConverted: boolean;
  creditsAwarded: boolean;
  createdAt: Date;
}

const referralSchema = new Schema<IReferral>(
  {
    referrer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    referredUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    hasConverted: { type: Boolean, default: false },
    creditsAwarded: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Referral = mongoose.model<IReferral>('Referral', referralSchema);
