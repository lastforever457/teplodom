import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout.tsx";
import Main from "./pages/main/main.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
