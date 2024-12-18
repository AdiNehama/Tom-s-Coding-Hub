import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCodeBlock } from "../../services/code_block_service";
import { io } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "./CodeBlock.css";

interface CodeBlock {
  title: string;
  description: string;
  hint: string;
  solution: string;
}

const CodeBlockPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [codeBlock, setCodeBlock] = useState<CodeBlock | null>(null);
  const [code, setCode] = useState("");
  const [isMentor, setIsMentor] = useState(false);
  const [studentsCount, setStudentsCount] = useState(0);
  const [showSmiley, setShowSmiley] = useState(false);

  const socket = io("http://localhost:5000"); // חיבור לסוקטים

  useEffect(() => {
    const loadCodeBlock = async () => {
      try {
        const block = await fetchCodeBlock(id!);
        setCodeBlock(block);
        setCode(block.solution.split("\n").map(() => "").join("\n"));
      } catch (error) {
        console.error("Failed to load code block", error);
        navigate("/"); 
      }
    };

    loadCodeBlock();

    socket.emit("join-room", id);

    socket.on("role-assigned", (role) => {
      setIsMentor(role === "mentor"); 
    });

    socket.on("user-count", (count) => {
      setStudentsCount(count);
    });

    socket.on("mentor-left", () => {
      if (!isMentor) navigate("/");  
    });

    //  להתראה על הגעת בלוק חדש
    socket.on("new-code-block", (newBlock) => {
      alert(`A new code block titled "${newBlock.title}" has been added!`);
    });

    return () => {
      socket.emit("leave-room", id);
      socket.disconnect();
    };
  }, [id, navigate]);

  useEffect(() => {
    socket.on("receive-code", (updatedCode) => {
      setCode(updatedCode);
    });

  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    socket.emit("code-update", { roomId: id, code: newCode });

    // בדיקה אם הקוד תואם לפתרון
    if (newCode.trim() === codeBlock?.solution.trim()) {
      setShowSmiley(true); 
    } else {
      setShowSmiley(false);
    }
  };

  

  if (!codeBlock) return <p>Loading...</p>;

  return (
    <div>
    <div className="code-block-container">
      <h1>{codeBlock.title}</h1>
      <p>{codeBlock.description}</p>
      <p className="hint"><strong>Hint:</strong> {codeBlock.hint}</p>

      <div className="editor-container">
        <CodeMirror
          value={code}
          extensions={[javascript()]}
          onChange={handleCodeChange}
          editable={!isMentor}  
          theme="dark"
          className="code-editor"
        />
      </div>

      {isMentor && <p className="readonly-warning">You are in read-only mode.</p>}
      {!isMentor && <p className="readonly-warning">You are in student mode. write your solution!</p>}


      <p>Students in room: {studentsCount - 1}</p>

      {showSmiley && <div className="smiley">😊</div>} 

    </div></div>
  );
};

export default CodeBlockPage;
