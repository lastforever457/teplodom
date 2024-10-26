import React, { createContext, ReactNode, useReducer } from "react";

const ReducerContext = createContext<IContextProps | null>(null);

interface IState {
  brands: Record<string, any>[];
  cart: Record<string, any>[];
  categories: Record<string, any>[];
  products: Record<string, any>[];
  status: "loading" | "success" | "error";
}

interface IContextProps {
  state: IState;
  dispatch: React.Dispatch<any>;
}

const initialState: IState = {
  brands: [],
  cart: [],
  categories: [],
  products: [],
  status: "loading",
};
const reducer = (state: IState, action: any) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "ADD_TO_CART": {
      const newCart = [action.payload, ...state.cart];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "REMOVE_FROM_CART": {
      const newCart = state.cart.filter(
        (item: Record<string, any>) => item.id !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, cart: newCart };
    }
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        products: state.products.map((product: Record<string, any>) =>
          product.id === action.payload
            ? { ...product, isSaved: true }
            : product,
        ),
      };
    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        products: state.products.map((product: Record<string, any>) =>
          product.id === action.payload
            ? { ...product, isSaved: false }
            : product,
        ),
      };
    default:
      return state;
  }
};

const ReducerContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};

export default ReducerContextProvider;
