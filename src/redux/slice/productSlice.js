import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://dummyjson.com/products?limit=100");
    // console.log(response.data.products);
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log("this is what we received in slice: ", action.payload);
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        console.log(
          "product already exists so incrementing count",
          existingProduct.quantity,
          product
        );
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      const newCart = state.cart.filter((item) => item.id !== product.id);
      console.log(newCart);
      state.cart = newCart;
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);
      product.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cart.find((item) => item.id === productId);

      if (product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        // console.log(action.payload)
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  productSlice.actions;

export default productSlice.reducer;
