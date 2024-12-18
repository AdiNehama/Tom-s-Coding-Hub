import axios from "axios";

const API_URL = "https://toms-coding-hub-1.onrender.com"; 

export const fetchCodeBlocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
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
