import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCodeBlocks } from "../../services/code_block_service";
import { io } from "socket.io-client";  
import "./Home.css";

interface CodeBlock {
  _id: string;
  title: string;
  description: string;
  solution: string;
  hint: string;
}

const Home: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    const loadCodeBlocks = async () => {
      try {
        const blocks = await fetchCodeBlocks();
        setCodeBlocks(blocks);
      } catch (error) {
        console.error("Failed to load code blocks", error);
      } finally {
        setLoading(false);
      }
    };

    loadCodeBlocks();

    //  להתראה על בלוק חדש
    socket.on("new-code-block", (newBlock) => {
      alert(`A new code block titled "${newBlock.title}" has been added!`);
      setCodeBlocks((prev) => [newBlock, ...prev]); // הוספת הבלוק החדש 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="container">
      <h1 className="h1-home">Choose Code Block</h1>
      <div className="code-block-list">
        {codeBlocks.map((block) => (
          <li key={block._id} className="code-block-item">
            <Link to={`/code-block/${block._id}`} className="code-block-link">
              <div className="code-block-title">{block.title}</div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Home;
