import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../Errors/AppError';
import { searchField } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';
// Create bikes
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// Get All The bikes
const getAllDataFromDB = async (query: Record<string, unknown>) => {
  console.log(query);
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(searchField)
    .filter();
  const result = await productQuery.modelQuery;
  return result;
};

// Get Featured Bike
const getFeaturedDataFromDB = async () => {
  const result = await Product.find().sort({ createdAt: -1 }).limit(4);
  return result;
};

// Get single bikes search by id
const getSingleBikeFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

// Update bikes information
const updateSingleBikeFromDB = async (
  productId: string,
  productData: TProduct,
) => {
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not founded');
  }
  return result;
};

// Delete bikes
const deleteSingleBikeFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not founded');
  }
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllDataFromDB,
  getSingleBikeFromDB,
  updateSingleBikeFromDB,
  deleteSingleBikeFromDB,
  getFeaturedDataFromDB,
};
