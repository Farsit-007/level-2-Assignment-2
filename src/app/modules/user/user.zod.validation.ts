import { z } from "zod";

export const userValidationSchema = z.object({
    body : z.object({
        name : z.string({required_error : "Please provide a Name"}),
        email : z.string({required_error : "Please provide a Email"}).email("Please provide a valid Email"),
        password : z.string({required_error : "Please provide a password"})
    })
})

export const updateUserValidationSchema = z.object({
    body : z.object({
        name : z.string({required_error : "Please provide a Name"})
    })
})