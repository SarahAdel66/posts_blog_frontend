import axios from "axios";
import { User } from "../types/types";

// const API_URL = "http://localhost:5000/api/users";
const API_URL = "https://postsblogbackend-production.up.railway.app/api/users";


export const registerUser = async (userData: { name: string; email: string; password: string }): Promise<User> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData: { email: string; password: string }): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};
