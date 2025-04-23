import axios from 'axios';
import { OrderStatus } from '../store/interfaces/order';

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

export const createOrder = async (status: OrderStatus, amount: number, token: string) => {
  const response = await axios.post(`${API_URL}`, { status, amount }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getOrderById = async (orderId: string, token: string) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getOrders = async (token: string, query?: { status?: OrderStatus; customer_id?: string; }) => {
  const response = await axios.get(`${API_URL}`, {
    params: query,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const updateOrder = async (orderId: string, status: OrderStatus, amount: number, token: string) => {
  const response = await axios.put(`${API_URL}/${orderId}`, { status, amount }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export const deleteOrder = async (orderId: string, token: string) => {
  const response = await axios.delete(`${API_URL}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
