import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User founded successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.updateUserFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  updateUser,
  getAllUser,
};
