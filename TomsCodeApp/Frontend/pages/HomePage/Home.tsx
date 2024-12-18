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
  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);  // אתחול עם מערך ריק
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const socket = io("https://toms-coding-hub-1.onrender.com");

  useEffect(() => {
    const loadCodeBlocks = async () => {
      try {
        const blocks = await fetchCodeBlocks();
        
        if (Array.isArray(blocks)) {
          setCodeBlocks(blocks);
        } else {
          setError("Failed to load code blocks: Invalid data format");
          console.error("Expected an array, but received:", blocks);
        }
      } catch (error) {
        setError("Failed to load code blocks");
        console.error("Failed to load code blocks", error);
      } finally {
        setLoading(false);
      }
    };

    loadCodeBlocks();

    socket.on("new-code-block", (newBlock: CodeBlock) => {
      alert(`A new code block titled "${newBlock.title}" has been added!`);
      setCodeBlocks((prev) => Array.isArray(prev) ? [newBlock, ...prev] : [newBlock]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!Array.isArray(codeBlocks)) return <p className="error-text">Invalid data format</p>;
  if (codeBlocks.length === 0) return <p className="info-text">No code blocks available</p>;

  return (
    <div className="container">
      <h1 className="h1-home">Choose Code Block</h1>
      <ul className="code-block-list">  {/* שינוי מ-div ל-ul כי יש לנו li בפנים */}
        {codeBlocks.map((block) => (
          <li key={block._id} className="code-block-item">
            <Link to={`/code-block/${block._id}`} className="code-block-link">
              <div className="code-block-title">{block.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
