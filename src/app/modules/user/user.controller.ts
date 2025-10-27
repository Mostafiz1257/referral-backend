import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from './user.model';
import { Referral } from '../referral/referral.model';

const generateReferralCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, referralCode, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      referralCode: generateReferralCode(),
      credits: 0,
      role: 'user',
    });
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        user.referredBy = referrer._id;

        await Referral.create({
          referrer: referrer._id,
          referredUser: user._id,
          hasConverted: false,
          creditsAwarded: false,
        });
      }
    }

    await user.save();

    const jwtPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
    };

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: config.jwt_access_expires_in,
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        credits: user.credits,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const jwtPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
    };

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: config.jwt_access_expires_in,
    });
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        credits: user.credits,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const referredUsers = await Referral.find({ referrer: userId });
    const convertedUsers = await Referral.find({
      referrer: userId,
      hasConverted: true,
    });

    const totalCreditsEarned = convertedUsers.length * 2;

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        credits: user.credits,
      },
      stats: {
        totalReferredUsers: referredUsers.length,
        convertedUsers: convertedUsers.length,
        totalCreditsEarned,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
