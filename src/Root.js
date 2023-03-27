import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";

function Root() {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
