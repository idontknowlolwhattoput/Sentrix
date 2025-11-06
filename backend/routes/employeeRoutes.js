import express, { Router } from "express"
import { addEmployeeController } from "../controller/addEmployeeController.js"
import { viewEmployeeController } from "../controller/viewEmployeeController.js"
import { deleteEmployeeController } from "../controller/deleteEmployeeController.js"

const router = Router()

router.post("/add", addEmployeeController)
router.get("/view", viewEmployeeController)
router.post("/delete", deleteEmployeeController)
export default router;