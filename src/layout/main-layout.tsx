import Navbar from "../components/navbar.tsx";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer.tsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="px-20">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer/>
    </>
  );
};

export default MainLayout;
