import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const countries = [
  "Uzbekistan",
  "Kazakhstan",
  "Turkmenistan",
  "Kyrgyzstan",
  "Tajikistan",
  "Russia",
  "China",
  "Japan",
  "South Korea",
  "India",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Italy",
];

export const colors = ["white", "red", "blue", "green", "yellow", "black"];

export const brands = [
  "Apple",
  "Samsung",
  "Huawei",
  "Xiaomi",
  "Oppo",
  "Vivo",
  "Realme",
  "OnePlus",
  "Google",
  "LG",
  "Sony",
  "Asus",
  "Lenovo",
  "HP",
  "Dell",
  "Acer",
  "MSI",
];

export const fetchProductsAndCategories = createAsyncThunk(
  "products/fetchProductsAndCategories",
  async () => {
    const resProducts = await axios.get("https://dummyjson.com/products");
    const resCategories = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    const products = resProducts.data.products.map((prod: any) => ({
      ...prod,
      country: countries[Math.floor(Math.random() * countries.length)],
      productColor: colors[Math.floor(Math.random() * colors.length)],
      brand: brands[Math.floor(Math.random() * brands.length)],
    }));
    return { products, categories: resCategories.data };
  }
);

interface IState {
  brands: string[];
  cart: Record<string, any>[];
  categories: string[];
  products: Record<string, any>[];
  tempProducts: Record<string, any>[];
  status: "loading" | "success" | "error";
}

const initialState: IState = {
  brands: [],
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  categories: [],
  products: [],
  tempProducts: [],
  status: "loading",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToFavorite: (state, action) => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      const product = state.products.find((p) => p.id === action.payload);
      if (product) product.isSaved = true;
    },
    removeFromFavorite: (state, action) => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const newFavorites = favorites.filter(
        (id: number | string) => id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      const product = state.products.find((p) => p.id === action.payload);
      if (product) product.isSaved = false;
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAndCategories.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.tempProducts = action.payload.products;
        state.categories = action.payload.categories;
        state.status = "success";
      })
      .addCase(fetchProductsAndCategories.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  addToFavorite,
  removeFromFavorite,
  clearCart,
} = productsSlice.actions;

export default productsSlice.reducer;
