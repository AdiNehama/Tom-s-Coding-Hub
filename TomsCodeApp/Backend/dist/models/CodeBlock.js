"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CodeBlockSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    hint: { type: String, required: true },
    solution: { type: String, required: true },
});
const CodeBlock = mongoose_1.default.model("codeblock", CodeBlockSchema, "codeblocks");
exports.default = CodeBlock;
