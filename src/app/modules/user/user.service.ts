import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const updateUserFromDB = async (userId: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserFromDB,
};
