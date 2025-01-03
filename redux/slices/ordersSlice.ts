import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrdersSlice {
  orders: Order[];
  selectedOrder: Order | null;
}

const initialState: OrdersSlice = {
  orders: [],
  selectedOrder: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    selectOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setOrders, addOrder, deleteOrder, selectOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
