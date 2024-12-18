import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http"; // ליצירת שרת HTTP
import { Server, Socket } from "socket.io"; // Socket.IO
import connectDB from "./db";
import cors from "cors";
import codeBlockRoutes from "./routes/codeBlockRoutes";
import { setSocketIO } from "./Controllers/codeBlockController"; // Import setSocketIO

dotenv.config();

const app = express();
const httpServer = createServer(app); // עוטפים את Express בשרת HTTP
const io = new Server(httpServer, {
  cors: {
    origin: "*", // אפשר להגדיר כאן דומיינים מורשים
    methods: ["GET", "POST"],
  },
});

// הגדרת קונפיגורציות
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// חיבור לבסיס הנתונים
connectDB();

// חיבור WebSocket
setSocketIO(io);

// נתיב ראשי לבדיקה
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

// חיבור הנתיב של Code Blocks
app.use("/api/code-blocks", codeBlockRoutes);

// משתנה שיאחסן מידע על החדרים
const rooms: Record<string, { mentor: string | null }> = {};
io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  // הצטרפות לחדר
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);


    // אם אין מנחה, המשתמש הנוכחי הופך למנחה
    if (!rooms[roomId]) {
      rooms[roomId] = { mentor: socket.id };
      socket.emit("role-assigned", "mentor");
    } else {
      socket.emit("role-assigned", "student");
    }


    // שליחת מספר המשתמשים בחדר
    const numUsers = io.sockets.adapter.rooms.get(roomId)?.size || 0;
    io.to(roomId).emit("user-count", numUsers);
  });

// עדכון קוד
socket.on("code-update", ({ roomId, code }) => {
  socket.to(roomId).emit("receive-code", code); // שולח את הקוד לשאר המשתמשים
});



  // יציאה מהחדר
  socket.on("leave-room", (roomId: string) => {
    socket.leave(roomId);

    // אם המנחה עוזב
    if (rooms[roomId]?.mentor === socket.id) {
      delete rooms[roomId];
      io.to(roomId).emit("mentor-left"); // הודעה לכל המשתמשים שהמנחה עזב
    } else {
      const numUsers = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit("user-count", numUsers); // עדכון מספר המשתמשים
    }
  });

  // טיפול בניתוק משתמש
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [roomId, room] of Object.entries(rooms)) {
      if (room.mentor === socket.id) {
        delete rooms[roomId];
        io.to(roomId).emit("mentor-left");
      } else {
        const numUsers = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        io.to(roomId).emit("user-count", numUsers);
      }
    }
  });
});

// הרצת השרת
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



