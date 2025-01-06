import axios from "@/axiosInterceptors";

const API = process.env.NEXT_PUBLIC_API;

export const getProducts = async (typeUrl: string = "") => {
  try {
    const res = await axios.get(
      `${API}/products/${typeUrl ? "by-type/" : ""}${typeUrl}`
    );

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getProductTypes = async () => {
  try {
    const res = await axios.get(`${API}/products/types`);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const addProduct = async (
  orderId: number,
  product: Pick<
    Product,
    "title" | "serialNumber" | "isNew" | "type" | "specification"
  > & { price: number; photo: string }
) => {
  try {
    const res = await axios.post(`${API}/products/create/${orderId}`, product);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const removeProduct = async (productId: number) => {
  try {
    const res = await axios.delete(`${API}/products/${productId}`);

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

export const getOrderProducts = async (orderId: number) => {
  try {
    const res = await axios.get(`${API}/products/by-order/${orderId}`);

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
