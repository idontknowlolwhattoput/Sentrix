import { SigninController } from "../controller/signinController.js";
import express from "express"


const router = express.Router()

router.post("/signin", SigninController)

export default router;