import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
// Create Bikes
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product Created Successfully',
    data: result,
  });
});

// Find Bikes by searching with "Name","Brand","Category"
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllDataFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved Successfully',
    data: result,
  });
});

// Find Bikes by searching with "Name","Brand","Category"
const featuredProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getFeaturedDataFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved Successfully',
    data: result,
  });
});

// Find single bike by ID
const getSingleBike = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductService.getSingleBikeFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved Successfully',
    data: result,
  });
});

// Update Products
const updateSingleBike = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const data = req.body;
  const result = await ProductService.updateSingleBikeFromDB(productId, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Updated Successfully',
    data: result,
  });
});

// Delete Bikes
const deleteSingleBike = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductService.deleteSingleBikeFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: {},
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleBike,
  updateSingleBike,
  featuredProduct,
  deleteSingleBike,
};
