import React, { createContext, ReactNode, useEffect, useReducer } from "react";
import axios from "axios";

interface IState {
  brands: Record<string, any>[];
  cart: Record<string, any>[];
  categories: Record<string, any>[];
  products: Record<string, any>[];
  status: "loading" | "success" | "error";
}

interface Action {
  type: string;
  payload?: any;
}

interface IContextProps {
  state: IState;
  dispatch: React.Dispatch<Action>;
}

export const ReducerContext = createContext<IContextProps>({
  state: {
    brands: [],
    cart: [],
    categories: [],
    products: [],
    status: "loading",
  },
  dispatch: () => null,
});

const initialState: IState = {
  brands: [],
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  categories: [],
  products: [],
  status: "loading",
};

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      const savedProducts = action.payload.map((product: Record<string, any>) => ({
        ...product,
        isSaved: JSON.parse(localStorage.getItem("favorites") || "[]").includes(product.id),
      }));
      return { ...state, products: savedProducts };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item: Record<string, any>) => item.id === action.payload.id,
      );
      let newCart;
      if (existingItem) {
        newCart = state.cart.map((item: Record<string, any>) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newCart = [{ ...action.payload, quantity: 1 }, ...state.cart];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "REMOVE_FROM_CART": {
      const existingItem = state.cart.find(
        (item: Record<string, any>) => item.id === action.payload,
      );
      let newCart;
      if (existingItem && existingItem.quantity > 1) {
        newCart = state.cart.map((item: Record<string, any>) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      } else {
        newCart = state.cart.filter(
          (item: Record<string, any>) => item.id !== action.payload,
        );
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "UPDATE_QUANTITY": {
      const newCart = state.cart.map((item: Record<string, any>) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "ADD_TO_FAVORITE": {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return {
        ...state,
        products: state.products.map((product: Record<string, any>) =>
          product.id === action.payload
            ? { ...product, isSaved: true }
            : product,
        ),
      };
    }
    case "REMOVE_FROM_FAVORITE": {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const newFavorites = favorites.filter((id: number) => id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...state,
        products: state.products.map((product: Record<string, any>) =>
          product.id === action.payload
            ? { ...product, isSaved: false }
            : product,
        ),
      };
    }
    case "CLEAR_CART": {
      localStorage.removeItem("cart");
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

const ReducerContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchDataHandler = async () => {
      try {
        dispatch({ type: "SET_STATUS", payload: "loading" });
        const resProducts = await axios.get("https://dummyjson.com/products");
        const resCategories = await axios.get(
          "https://dummyjson.com/products/categories",
        );
        console.log(resProducts);
        dispatch({
          type: "SET_PRODUCTS",
          payload: resProducts.data.products,
        });
        dispatch({ type: "SET_CATEGORIES", payload: resCategories.data });
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        dispatch({ type: "SET_STATUS", payload: "success" });
      }
    };
    fetchDataHandler();
  }, []);

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};

export default ReducerContextProvider;