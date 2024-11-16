import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="bg-customBackground h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
