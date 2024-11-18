import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin } from "antd";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protected-route.tsx";
import MainLayout from "./layout/main-layout.tsx";
import Cart from "./pages/cart.tsx";
import Categories from "./pages/category/categories.tsx";
import CategoryId from "./pages/category/category-id.tsx";
import Contact from "./pages/contact.tsx";
import Main from "./pages/main/main.tsx";
import Filter from "./pages/products/filter.tsx";
import ProductId from "./pages/products/product-id.tsx";
import Products from "./pages/products/products.tsx";
import ReturnProducts from "./pages/return-products.tsx";
import Saved from "./pages/saved.tsx";
import { fetchProductsAndCategories } from "./redux/productsSlice.tsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAndCategories() as any);
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FFB12A",
              colorPrimaryHover: "#444",
            },
          }}
        >
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
                <Route path="contacts" element={<Contact />} />
              </Route>
            </Route>
          </Routes>
        </ConfigProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
