import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import connectDB from "./db";
import cors from "cors";
import codeBlockRoutes from "./routes/codeBlockRoutes";
import { setSocketIO } from "./Controllers/codeBlockController";
import path from "path";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// הגדרת CORS ל-Express
const corsOptions = {
  origin: "https://toms-coding-hub-front.onrender.com", // כתובת הפרונט
  methods: ["GET", "POST"], // שיטות HTTP מותרות
  credentials: true, // מאפשר שליחת credentials (עוגיות או headers מותאמים אישית)
};

app.use(cors(corsOptions)); // שימוש בהגדרות CORS ב-Express
app.use(express.json());

// משרת את הקבצים הסטטיים מתוך frontend/dist
app.use("/frontend", express.static(path.join(__dirname, 'Frontend/dist')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend','dist' , 'index.html'));
});


const io = new Server(httpServer, {
  cors: {
    ...corsOptions,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"]
  },
  pingTimeout: 60000, // זמן timeout ארוך יותר
  pingInterval: 25000 // בדיקת חיבור תכופה יותר
});

const PORT = process.env.PORT || 5000;

// חיבור לדאטה בייס
connectDB();

// חיבור WebSocket
setSocketIO(io);

// בדיקה
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

// ראוטים
app.use("/api/code-blocks", codeBlockRoutes);

// משתנה שיאחסן מידע על הסוקטים
const rooms: Record<string, { mentor: string | null }> = {};

io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);

  // הצטרפות לחדר
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);

    // אם אין מנחה, המשתמש הראשון הופך למנחה
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

  // עדכון קוד בלייב
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
