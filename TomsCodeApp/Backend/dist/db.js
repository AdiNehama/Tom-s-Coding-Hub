"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    try {
        console.log(process.env.MONGO_URI);
        mongoose_1.default.connect("mongodb+srv://adinehama6:sErQDheDRZZGETy2@tomscodeapp.llq11.mongodb.net/");
        mongoose_1.default.connection.once("open", () => {
            console.log("[server] Connected to MongoDB successfully");
        });
    }
    catch (error) {
        console.log("[server] " + error.message);
        process.exit(-1);
    }
};
exports.default = connectDB;
