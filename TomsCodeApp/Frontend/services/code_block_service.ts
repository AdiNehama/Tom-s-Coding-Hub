import axios from "axios";

// URL של ה-API להחזרת כל הבלוקים
const API_URL = "http://localhost:5000/api/code-blocks"; 

export const fetchCodeBlocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    throw error;
  }
};

// URL של ה-API ליצירת בלוק חדש
const API_UR = "http://localhost:5000/api/code-blocks/create"; // שים לב, ה-URL הוא /create כפי שביקשת

export const createCodeBlock = async (newCodeBlock: { title: string; description: string; hint: string; solution: string }) => {
    try {
      const response = await axios.post(API_UR, newCodeBlock);
      return response.data; 
    } catch (error) {
      console.error("Error creating code block:", error);
      throw error;
    }
};
