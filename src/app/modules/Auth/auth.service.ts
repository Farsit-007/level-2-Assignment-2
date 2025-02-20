import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const userStatus = user.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid Credentials');

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    name: user.name,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    '10d',
  );
  return {
    token,
    refreshToken,
  };
};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExists(userData.userEmail);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const userStatus = user.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid Credentials');

  const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(12));

  const result = await User.findOneAndUpdate(
    {
      email: user.email,
      role: user.role,
      name: user.name,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (accessToken: string) => {
  //Check the Token is valid
  const decoded = jwt.verify(
    accessToken,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;

  const user = await User.isUserExists(userEmail);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is blocked
  const userStatus = user?.isBlock;
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized This One!',
    );
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
    name: user.name,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1d',
  );

  return {
    token,
  };
};

export const AuthServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
  refreshToken,
};
