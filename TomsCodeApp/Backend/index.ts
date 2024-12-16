import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import cors from "cors";
import codeBlockRoutes from "./routes/codeBlockRoutes";

dotenv.config();

const app = express();

// הגדרת קונפיגורציות
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB(); // חיבור לבסיס הנתונים

// מבצע קריאה לפונקציה הראשית
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

// חיבור הנתיב של ה-CodeBlocks
app.use("/api/code-blocks", codeBlockRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
