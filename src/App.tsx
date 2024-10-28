import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/main-layout.tsx";
import Main from "./pages/main/main.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import Cart from "./pages/cart.tsx";
import Products from "./pages/products/products.tsx";
import ProductId from "./pages/products/product-id.tsx";
import Categories from "./pages/category/categories.tsx";
import CategoryId from "./pages/category/category-id.tsx";
import Saved from "./pages/saved.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route element={<ProtectedRoute />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductId />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<CategoryId />} />
            <Route path="cart" element={<Cart />} />
            <Route path="favorites" element={<Saved />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
