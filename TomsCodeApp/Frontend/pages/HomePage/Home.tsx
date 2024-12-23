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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCodeBlocks = async () => {
      try {
        const response = await fetchCodeBlocks();
        console.log('Raw response from server:', response);
        
        // בדיקה האם התגובה היא undefined או null
        if (!response) {
          setError("No data received from server");
          setLoading(false);
          return;
        }

        // נסה לקבל את המערך מהתגובה
        let blocks: CodeBlock[];
        if (Array.isArray(response)) {
          blocks = response;
        } else if (response.data && Array.isArray(response.data)) {
          blocks = response.data;
        } else if (typeof response === 'object') {
          // אם התגובה היא אובייקט, נסה למצוא מערך בתוכו
          const possibleArray = Object.values(response).find(value => Array.isArray(value));
          if (possibleArray) {
            blocks = possibleArray;
          } else {
            throw new Error("Could not find array in response");
          }
        } else {
          throw new Error("Invalid response format");
        }

        console.log('Processed blocks:', blocks);
        
        // וודא שכל האובייקטים במערך תקינים
        const validBlocks = blocks.filter(block => 
          block && typeof block === 'object' && '_id' in block && 'title' in block
        );

        setCodeBlocks(validBlocks);
      } catch (error) {
        console.error("Detailed error:", error);
        setError(error instanceof Error ? error.message : "Failed to load code blocks");
      } finally {
        setLoading(false);
      }
    };

    loadCodeBlocks();

    const socket = io("https://toms-coding-hub-1.onrender.com");
    
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("new-code-block", (newBlock: CodeBlock) => {
      console.log('New block received:', newBlock);
      setCodeBlocks(prev => Array.isArray(prev) ? [newBlock, ...prev] : [newBlock]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  console.log('Current codeBlocks state:', codeBlocks);

  return (
    <div className="container">
      <h1 className="h1-home">Choose Code Block</h1>
      <ul className="code-block-list">
        {Array.isArray(codeBlocks) && codeBlocks.length > 0 ? (
          codeBlocks.map((block: CodeBlock) => (
            <li key={block._id} className="code-block-item">
              <Link to={`/code-block/${block._id}`} className="code-block-link">
                <div className="code-block-title">{block.title}</div>
              </Link>
            </li>
          ))
        ) : (
          <li>No code blocks available</li>
        )}
      </ul>
    </div>
  );
};

export default Home;
