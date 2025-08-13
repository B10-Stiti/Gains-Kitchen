import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.put("/:id", updateUser);
router.get("/:id", getUser);

export default router;
