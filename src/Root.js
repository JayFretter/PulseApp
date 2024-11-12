import { Outlet } from "react-router-dom";
import Navbar from "./Components/Shared/Navbar";
import { CookiesProvider } from "react-cookie";

function Root() {
  return (
    <CookiesProvider>
      <div className="bg-gray-900">
        <Navbar />
        <Outlet />
      </div>
    </CookiesProvider>
  );
}

export default Root;
