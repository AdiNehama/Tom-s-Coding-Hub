"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const codeBlockController_1 = require("../Controllers/codeBlockController");
const router = express_1.default.Router();
// פונקציית POST להוספת בלוק קוד חדש
router.post("/create", codeBlockController_1.createCodeBlock);
// פונקציה להחזרת כל הבלוקים
router.get("/", codeBlockController_1.getCodeBlocks);
// פונקציה להחזרת בלוק קוד לפי ID
router.get("/:id", codeBlockController_1.getCodeBlockById);
exports.default = router;
