import axios from "axios";

const API_URL = "https://toms-coding-hub-1.onrender.com"; 

// פונקציה שמבצעת בדיקה אם הנתונים הם מערך, ואם לא מחזירה מערך ריק
const ensureArray = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  } else {
    console.error("Received data is not an array:", data);
    return []; // במקרה של נתונים לא תקינים, מחזירים מערך ריק
  }
};

export const fetchCodeBlocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return ensureArray(response.data); // לוודא שהנתונים הם מערך
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    throw error;
  }
};

export const fetchCodeBlock = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // מחזיר את המידע על בלוק הקוד הספציפי
  } catch (error) {
    console.error(`Error fetching code block with id ${id}:`, error);
    throw error;
  }
};

export const createCodeBlock = async (newCodeBlock: { title: string; description: string; hint: string; solution: string }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, newCodeBlock);
    return response.data;
  } catch (error) {
    console.error("Error creating code block:", error);
    throw error;
  }
};
