export const getProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products`);
    const data: Product[] = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`);
    const data: Order[] = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};
