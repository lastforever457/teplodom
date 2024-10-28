import { useContext } from "react";
import { ReducerContext } from "../contexts/reducer-context-provider.tsx";

const useReducerContext = () => {
  const context = useContext(ReducerContext);

  if (!context) {
    throw new Error(
      "useReducerContext must be used within a ReducerContextProvider",
    );
  }

  return { context };
};

export default useReducerContext;
