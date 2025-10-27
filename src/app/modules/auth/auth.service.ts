import config from '../../config';
import { User } from '../user/user.model';
import jwt from 'jsonwebtoken';

const userLoginService = async (email: string, password: string) => {
  const user = await User.findOne({ email, password });

  if (!user) {
    return { success: false };
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: accessToken,
    data: jwtPayload,
  };
};

export const AuthService = {
  userLoginService,
};
