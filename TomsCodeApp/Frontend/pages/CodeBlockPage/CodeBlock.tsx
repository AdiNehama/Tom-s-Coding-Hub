import React from "react";
import { useParams } from "react-router-dom";

const CodeBlockPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Code Block {id}</h1>
      <p>Here you will see the code block details.</p>
    </div>
  );
};

export default CodeBlockPage;
