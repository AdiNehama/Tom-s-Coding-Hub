import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home.tsx";
import CodeBlockPage from "../pages/CodeBlockPage/CodeBlock.tsx";   
import CreateCodeBlock from "../pages/CodeBlockPage/CreateCodeBlock.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-block/:id" element={<CodeBlockPage />} />
        <Route path="/create" element={<CreateCodeBlock />} /> {/* שינה את ה-path ל-/create */}
      </Routes>
    </Router>
  );
};

export default App;
