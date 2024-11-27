import { TProduct } from './product.interface';
import { Product } from './product.model';

// Create bikes
const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// Get All The bikes
const getAllDataFromDB = async (productData: TProduct) => {
  const result = await Product.find(productData);
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
  return result;
};

// Delete bikes
const deleteSingleBikeFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllDataFromDB,
  getSingleBikeFromDB,
  updateSingleBikeFromDB,
  deleteSingleBikeFromDB,
};
