import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find({ role: 'customer' });
  return result;
};

const updateUserFromDB = async (userId: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });
  return result;
};

const updateProfileUserFromDB = async (
  email: string,
  payload: Partial<TUser>,
) => {
  const result = await User.findOneAndUpdate({ email }, payload, {
    new: true,
  });
  return result;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserFromDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateProfileUserFromDB,
};
