import { Request, Response } from 'express';
import { User } from '../user/user.model';
import { Referral } from '../referral/referral.model';

export const simulatePurchase = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.referredBy) {
      const referral = await Referral.findOne({
        referredUser: userId,
        hasConverted: false,
      });

      if (referral) {
        await User.findByIdAndUpdate(referral.referrer, {
          $inc: { credits: 2 },
        });

        await User.findByIdAndUpdate(userId, {
          $inc: { credits: 2 },
        });
        referral.hasConverted = true;
        referral.creditsAwarded = true;
        await referral.save();
      }
    }

    res.json({
      message: 'Purchase completed successfully',
      creditsAwarded: user.referredBy ? true : false,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
