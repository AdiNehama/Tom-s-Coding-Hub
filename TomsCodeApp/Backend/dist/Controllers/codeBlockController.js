"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeBlockById = exports.createCodeBlock = exports.getCodeBlocks = exports.setSocketIO = void 0;
const CodeBlock_1 = __importDefault(require("../models/CodeBlock"));
let io;
const setSocketIO = (socketIo) => {
    io = socketIo;
};
exports.setSocketIO = setSocketIO;
//  פונקציה להחזרת כל הבלוקים מהדאטה בייס
const getCodeBlocks = (req, res) => {
    CodeBlock_1.default.find()
        .then((codeBlocks) => {
        res.status(200).json(codeBlocks);
    })
        .catch((error) => {
        console.error("Error fetching code blocks:", error);
        res.status(500).json({ error: "Failed to fetch code blocks" });
    });
};
exports.getCodeBlocks = getCodeBlocks;
// פונקציה ליצירת בלוק חדש
const createCodeBlock = (req, res) => {
    const { title, description, hint, solution } = req.body;
    const newCodeBlock = new CodeBlock_1.default({ title, description, hint, solution });
    newCodeBlock
        .save()
        .then((savedCodeBlock) => {
        // שלח התראה לכל המשתמשים המחוברים דרך סוקטים שעלה בלוק חדש
        io.emit("new-code-block", savedCodeBlock);
        res.status(201).json(savedCodeBlock); // מחזיר את הבלוק החדש שנשמר
    })
        .catch((error) => {
        console.error("Error creating code block:", error);
        res.status(500).json({ error: "Failed to create code block" });
    });
};
exports.createCodeBlock = createCodeBlock;
//מייבא בלוק יחיד מהדאטה בייס בשביל הדף של כל בלוק
const getCodeBlockById = (req, res) => {
    const { id } = req.params;
    CodeBlock_1.default.findById(id)
        .then((codeBlock) => {
        if (!codeBlock) {
            res.status(404).json({ error: "Code block not found" });
            return;
        }
        res.status(200).json(codeBlock);
    })
        .catch((error) => {
        console.error(`Error fetching code block with id ${id}:`, error);
        res.status(500).json({ error: "Failed to fetch code block" });
    });
};
exports.getCodeBlockById = getCodeBlockById;
