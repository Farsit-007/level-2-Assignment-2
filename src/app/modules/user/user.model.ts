/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { Role } from './user.constant';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
    },
    address: {
      type: String,
      required: [true, 'Address is required.'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required.'],
    },
    image: {
      type: String,
      required: [true, 'Image is required.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: 0,
    },
    role: {
      type: String,
      enum: Role,
      required: true,
      default: 'customer',
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(12));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});

userSchema.statics.isUserExists = async function (email: string) {
  const user = await User.findOne({ email }).select('+password');
  return user;
};
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  if (!plainTextPassword || !hashedPassword) {
    throw new Error('Both data and hash arguments are required');
  }
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
