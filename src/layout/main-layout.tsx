import Navbar from "../components/navbar.tsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="px-20">
        <Outlet />
      </div>
      {/*<Footer/>*/}
    </>
  );
};

export default MainLayout;
