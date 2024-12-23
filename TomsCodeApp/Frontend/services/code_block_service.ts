
import axios from "axios";

const API_URL = "https://toms-coding-hub-1.onrender.com/api"; // שינינו את הנתיב

// פונקציה שמבצעת בדיקה אם הנתונים הם מערך, ואם לא מחזירה מערך ריק
const ensureArray = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === 'object' && Array.isArray(data.data)) {
    return data.data;
  }
  console.error("Received data is not an array:", data);
  return []; 
};

export const fetchCodeBlocks = async () => {
  try {
    const response = await axios.get(${API_URL}/code-blocks); // תיקון הנתיב
    console.log("API Response:", response.data);
    return ensureArray(response.data);
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    throw error;
  }
};

export const fetchCodeBlock = async (id: string) => {
  try {
    const response = await axios.get(${API_URL}/code-blocks/${id}); // תיקון הנתיב
    return response.data;
  } catch (error) {
    console.error(Error fetching code block with id ${id}:, error);
    throw error;
  }
};

export const createCodeBlock = async (newCodeBlock: { 
  title: string; 
  description: string; 
  hint: string; 
  solution: string; 
}) => {
  try {
    const response = await axios.post(${API_URL}/code-blocks/create, newCodeBlock); // תיקון הנתיב
    return response.data;
  } catch (error) {
    console.error("Error creating code block:", error);
    throw error;
  }
};
