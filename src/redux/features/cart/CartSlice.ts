import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TProduct = {
  id: string;
  quantity: number;
  name: string;
  price: number;
};

type TInitialState = {
  books: TProduct[];
  email: null | string;
};

const initialState: TInitialState = {
  books: [],
  email: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        quantity: number;
        name: string;
        price: number;
      }>
    ) => {
      const { id, email, quantity, name, price } = action.payload;
      state.email = email;
      const existbookIndex = state.books?.findIndex((book) => book.id === id);
      if (existbookIndex !== -1) {
        state.books[existbookIndex].quantity = quantity;
      } else {
        state.books.push({ id, quantity, name, price });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const book = state.books.find((book) => book.id === id);

      if (book) {
        book.quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      state.books = state.books.filter((book) => book.id !== bookId);
    },
    clearCart: (state) => {
      state.books = [];
      state.email = null;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const useCurrentCart = (state: RootState) => state.cart;
