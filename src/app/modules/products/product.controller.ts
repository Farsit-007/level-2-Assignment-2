import { Request, Response } from 'express';
import { ProductService } from './product.service';
import zodProductSchema from './product.zod.validation';

// Create Bikes
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodValidation = zodProductSchema.parse(product);
    const result = await ProductService.createProductIntoDB(zodValidation);
    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      success: false,
      error: error,
      stack: new Error('Validation failed').stack,
    });
  }
};

// Find Bikes by searching with "Name","Brand","Category"
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm || '';
    const query: any = {};
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const result = await ProductService.getAllDataFromDB(query);
    if (!result || result.length === 0) {
      res.status(404).json({
        message: 'No bikes found matching your search criteria',
        status: false,
      });
    } else
      res.status(200).json({
        message: 'Bikes retrieved successfully',
        status: true,
        data: result,
      });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      status: false,
      error: error.message || error,
      stack: new Error('Validation failed').stack,
    });
  }
};

// Find single bike by ID
const getSingleBike = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductService.getSingleBikeFromDB(productId);
    if (!result) {
      res.status(404).json({
        message: 'No bikes found matching your product id',
        status: false,
      });
    } else
      res.status(200).json({
        message: 'Bikes retrieved successfully',
        status: true,
        data: result,
      });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      status: false,
      error: error.message || error,
      stack: new Error('Validation failed').stack,
    });
  }
};

// Update Products
const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const data = req.body;
    const result = await ProductService.updateSingleBikeFromDB(productId, data);
    res.status(200).json({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      status: false,
      error: error.message || error,
      stack: new Error('Validation failed').stack,
    });
  }
};

// Delete Bikes
const deleteSingleBike = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductService.deleteSingleBikeFromDB(productId);
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Something Went Wrong!!',
      status: false,
      error: error.message || error,
      stack: new Error('Validation failed').stack,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleBike,
  updateSingleBike,
  deleteSingleBike,
};
