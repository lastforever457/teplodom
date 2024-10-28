import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReducerContextProvider from "./contexts/reducer-context-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ReducerContextProvider>
      <App />
    </ReducerContextProvider>
  </BrowserRouter>,
);
