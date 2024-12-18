import  { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { io } from "socket.io-client";  
import "./About.css";

const About = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const socket = io("http://localhost:5000");

    //  התראה על בלוק חדש
    socket.on("new-code-block", (newBlock) => {
      alert(`A new code block titled "${newBlock.title}" has been added!`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleGoHome = () => {
    navigate("/");  
  };

  return (
    <div className="container">
      <h1 className="h1-about">Welcome to Tom's website!</h1>
      <p className="p-about">
        Hey! I’m Tom, a professional JavaScript lecturer who has a deep love and passion for my students and their journey to mastering JavaScript. Unfortunately, I had to move to Thailand with my wife, but I still want to stay connected with my students and continue supporting them in their path to success.
      </p>
      <p className="p-about" >
        This website is designed to keep students on track as they practice coding, no matter where I am. By using this platform, I can follow their progress and help them overcome challenges in real-time. Together, we’ll continue to grow and master JavaScript—just like I did!
      </p>
      <button className="go-home-button" onClick={handleGoHome}>
        Go Back To Home Page
      </button>
    </div>
  );
};

export default About;
