import axios from "axios";

const API_URL = "https://toms-coding-hub-1.onrender.com/api";

interface CodeBlock {
  title: string;
  description: string;
  hint: string;
  solution: string;
  id?: string;
}

interface ApiResponse {
  data: CodeBlock[];
}

const ensureArray = (data: CodeBlock[] | ApiResponse | unknown): CodeBlock[] => {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as ApiResponse).data)) {
    return (data as ApiResponse).data;
  }
  console.error("Received data is not an array:", data);
  return [];
};

export const fetchCodeBlocks = async (): Promise<CodeBlock[]> => {
  try {
    const response = await axios.get<CodeBlock[] | ApiResponse>(`${API_URL}/code-blocks`);
    console.log("API Response:", response.data);
    return ensureArray(response.data);
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    throw error;
  }
};

export const fetchCodeBlock = async (id: string): Promise<CodeBlock> => {
  try {
    const response = await axios.get<CodeBlock>(`${API_URL}/code-blocks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching code block with id ${id}:`, error);
    throw error;
  }
};

export const createCodeBlock = async (newCodeBlock: Omit<CodeBlock, 'id'>): Promise<CodeBlock> => {
  try {
    const response = await axios.post<CodeBlock>(`${API_URL}/code-blocks/create`, newCodeBlock);
    return response.data;
  } catch (error) {
    console.error("Error creating code block:", error);
    throw error;
  }
};