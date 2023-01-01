import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";

function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
