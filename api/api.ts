import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API}/products`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`${API}/orders`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const createOrder = async (order: {
  title: string;
  description: string;
}) => {
  try {
    const res = await axios.post(`${API}/orders`, order);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const removeOrder = async (orderId: number) => {
  try {
    const res = await axios.delete(`${API}/orders/${orderId}`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
