import express from "express"
import { validation } from "../../middleware/validation"
import { updateUserValidationSchema, userValidationSchema } from "./user.zod.validation"
import { UserController } from "./user.controller"

const router = express.Router()
router.post('/',validation(userValidationSchema),UserController.createUser)
router.patch('/:id',validation(updateUserValidationSchema),UserController.updateUser)
export const UserRoutes = router