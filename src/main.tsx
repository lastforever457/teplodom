import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReducerContextProvider from "./contexts/reducer-context-provider.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFB12A",
          colorPrimaryHover: "#444",
        },
      }}
    >
      <ReducerContextProvider>
        <App />
      </ReducerContextProvider>
    </ConfigProvider>
  </BrowserRouter>
);
