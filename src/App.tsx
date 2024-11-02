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
import ReturnProducts from "./pages/return-products.tsx";
import Filter from "./pages/products/filter.tsx";
import { Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="products"
              element={
                <Suspense
                  fallback={
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                      }
                    />
                  }
                >
                  <Products />
                </Suspense>
              }
            />
            <Route path="products/:id" element={<ProductId />} />
            <Route path="products/filter" element={<Filter />} />
            <Route
              path="categories"
              element={
                <Suspense
                  fallback={
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                      }
                    />
                  }
                >
                  <Categories />
                </Suspense>
              }
            />
            <Route path="categories/:slug" element={<CategoryId />} />
            <Route path="cart" element={<Cart />} />
            <Route path="favorites" element={<Saved />} />
            <Route path="return-products" element={<ReturnProducts />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
