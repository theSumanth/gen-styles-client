import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <>
      <div className="bg-neutral-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
