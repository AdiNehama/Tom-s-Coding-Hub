import express from "express";
import { getCodeBlocks, createCodeBlock, getCodeBlockById } from "../Controllers/codeBlockController";
import { setSocketIO } from "../Controllers/codeBlockController"; // Import the setSocketIO function

const router = express.Router();

// פונקציית POST להוספת בלוק קוד חדש
router.post("/create", createCodeBlock);

// פונקציה להחזרת כל הבלוקים
router.get("/", getCodeBlocks);

// פונקציה להחזרת בלוק קוד לפי ID
router.get("/:id", getCodeBlockById);

export default router;
