import axios from 'axios';

export const TOKEN_NAME = "order-crud-token";
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const signup = async (email: string, username: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, { email, username, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
