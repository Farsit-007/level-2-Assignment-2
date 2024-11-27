import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()
router.post('/', ProductController.createProduct)
router.get('/',ProductController.getAllProducts)
router.get('/:productId',ProductController.getSingleBike)
router.put('/:productId',ProductController.updateSingleBike)
router.delete('/:productId',ProductController.deleteSingleBike)
export const ProductRoutes = router;