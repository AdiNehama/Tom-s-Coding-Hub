import { Request, Response } from "express";
import CodeBlock from "../models/CodeBlock";

// פונקציה להחזרת כל הבלוקים
export const getCodeBlocks = (req: Request, res: Response): void => {
  CodeBlock.find()
    .then((codeBlocks) => {
      res.status(200).json(codeBlocks); // מחזיר את כל הבלוקים
    })
    .catch((error) => {
      console.error("Error fetching code blocks:", error);
      res.status(500).json({ error: "Failed to fetch code blocks" });
    });
};

// פונקציה ליצירת בלוק חדש
export const createCodeBlock = (req: Request, res: Response): void => {
  const { title, description, hint, solution } = req.body;
  const newCodeBlock = new CodeBlock({ title, description, hint, solution });

  newCodeBlock
    .save()
    .then((savedCodeBlock) => {
      res.status(201).json(savedCodeBlock); // מחזיר את הבלוק החדש שנשמר
    })
    .catch((error) => {
      console.error("Error creating code block:", error);
      res.status(500).json({ error: "Failed to create code block" });
    });
};
