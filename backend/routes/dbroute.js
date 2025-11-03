import express from "express";
import { db } from "../controller/db.js";

const router = express.Router();

router.get("/db", db);

export default router;
