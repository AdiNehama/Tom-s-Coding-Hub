import { Request, Response } from "express";
import CodeBlock from "../models/CodeBlock";
import { Server } from "socket.io";  // ייבוא של Socket.IO

let io: Server; // משתנה להחזקת אובייקט ה-Socket.IO

// פונקציה להגדרת ה-Socket.IO
export const setSocketIO = (socketIo: Server) => {
  io = socketIo;
};

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
        // שלח התראה לכל המשתמשים המחוברים דרך סוקטים
        io.emit("new-code-block", savedCodeBlock);  // כל החיבורים מקבלים את ההתראה
  
        res.status(201).json(savedCodeBlock); // מחזיר את הבלוק החדש שנשמר
      })
      .catch((error) => {
        console.error("Error creating code block:", error);
        res.status(500).json({ error: "Failed to create code block" });
      });
  };
  

export const getCodeBlockById = (req: Request, res: Response): void => {
  const { id } = req.params;

  CodeBlock.findById(id)
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
