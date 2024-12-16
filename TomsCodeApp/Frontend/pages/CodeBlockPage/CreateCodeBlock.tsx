import React, { useState } from "react";
import { createCodeBlock } from "../../services/code_block_service"; 

const CreateCodeBlock: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");
  const [solution, setSolution] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCodeBlock = { title, description, hint, solution };
      const createdBlock = await createCodeBlock(newCodeBlock);
      setSuccess("Code block created successfully!");
      console.log("New code block created:", createdBlock);
    } catch (err) {
      console.error("Error creating code block:", err);
      setError("Failed to create code block");
    }
  };

  return (
    <div>
      <h1>Create New Code Block</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Hint</label>
          <textarea value={hint} onChange={(e) => setHint(e.target.value)} required />
        </div>
        <div>
          <label>Solution</label>
          <textarea value={solution} onChange={(e) => setSolution(e.target.value)} required />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Create Code Block</button>
      </form>
    </div>
  );
};

export default CreateCodeBlock;
