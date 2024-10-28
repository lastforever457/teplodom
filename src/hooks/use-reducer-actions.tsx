import { useCallback } from "react";
import useReducerContext from "./use-reducer-context.tsx";
import useToastify from "./use-toastify.tsx";

interface IActions {
  setProducts: (products: any[]) => void;
  setBrands: (brands: any[]) => void;
  setCategories: (categories: any[]) => void;
  setStatus: (status: string) => void;
  addToCart: (product: Record<string, any>) => void;
  removeFromCart: (id: string | number) => void;
  addToFavorite: (id: string | number) => void;
  removeFromFavorite: (id: string | number) => void;
  clearCart: () => void;
}

export const useReducerActions = (): IActions => {
  const { context } = useReducerContext();
  const { dispatch } = context;
  const { toastSuccess } = useToastify();

  const setProducts = useCallback(
    (products: any[]) => dispatch({ type: "SET_PRODUCTS", payload: products }),
    [dispatch],
  );

  const setBrands = useCallback(
    (brands: any[]) => dispatch({ type: "SET_BRANDS", payload: brands }),
    [dispatch],
  );

  const setCategories = useCallback(
    (categories: any[]) =>
      dispatch({ type: "SET_CATEGORIES", payload: categories }),
    [dispatch],
  );

  const setStatus = useCallback(
    (status: string) => dispatch({ type: "SET_STATUS", payload: status }),
    [dispatch],
  );

  const addToCart = useCallback(
    (product: Record<string, any>) => {
      dispatch({ type: "ADD_TO_CART", payload: product });
      toastSuccess("Product added to cart successfully!");
    },
    [dispatch, toastSuccess],
  );

  const removeFromCart = useCallback(
    (id: string | number) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: id });
      toastSuccess("Product removed from cart successfully!");
    },
    [dispatch, toastSuccess],
  );

  const addToFavorite = useCallback(
    (id: string | number) => {
      dispatch({ type: "ADD_TO_FAVORITE", payload: id });
      toastSuccess("Product added to favorites successfully!");
    },
    [dispatch, toastSuccess],
  );

  const removeFromFavorite = useCallback(
    (id: string | number) => {
      dispatch({ type: "REMOVE_FROM_FAVORITE", payload: id });
      toastSuccess("Product removed from favorites successfully!");
    },
    [dispatch, toastSuccess],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    toastSuccess("Products bought successfully!");
  }, [dispatch, toastSuccess]);

  return {
    setProducts,
    setBrands,
    setCategories,
    setStatus,
    addToCart,
    removeFromCart,
    addToFavorite,
    removeFromFavorite,
    clearCart
  };
};
