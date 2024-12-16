import express from "express";
import { getCodeBlocks, createCodeBlock } from "../Controllers/codeBlockController";

const router = express.Router();

// Route עבור החזרת כל הבלוקים
router.get("/", getCodeBlocks);

// Route עבור יצירת בלוק חדש
router.post("/create", createCodeBlock);

export default router;
