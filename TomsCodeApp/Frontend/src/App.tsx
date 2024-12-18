import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home.tsx";
import CodeBlockPage from "../pages/CodeBlockPage/CodeBlock.tsx";   
import CreateCodeBlock from "../pages/CreateCodeBlockPage/CreateCodeBlock.tsx";
import Navbar from "../components/navBar/navBar.tsx";
import About from "../pages/AboutPage/About.tsx";
import { AlertProvider, useAlert } from "../components/Alart/alart.tsx"; 

const App = () => {
  return (
    <AlertProvider>
      <Router>
        <Navbar />
        <div className="content">
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/code-block/:id" element={<CodeBlockPage />} />
            <Route path="/create" element={<CreateCodeBlock />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AlertProvider>
  );
};

// רכיב הצגת האלרט
const Alert = () => {
  const { alertMessage, setAlertMessage } = useAlert();

  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    }
  }, [alertMessage, setAlertMessage]);

  if (!alertMessage) return null;

  return (
    <div className="alert">
      {alertMessage}
    </div>
  );
};

export default App;
