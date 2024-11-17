import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useUserCredentials } from "../../Hooks/useUserCredentials";

function Navbar() {
  const [, , removeCookie] = useCookies(["token"]);
  const [isLoggedIn, getUserCredentials] = useUserCredentials();

  const logOut = () => {
    removeCookie("token", { path: "/" });
  };

  const renderNavbarLinks = () => {
    if (isLoggedIn()) {
      const credentials = getUserCredentials();
      return (
        <div className="flex items-center gap-4 uppercase font-thin">
          <Link to={`profile/${credentials!.username}`} className="hidden md:block">
            Hi, {credentials!.username}
          </Link>
          <Link to={`/`} className="hidden md:block" onClick={logOut}>
            Log Out
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4 uppercase font-thin">
        <Link to={`/login`} className="hidden md:block">
          Log In
        </Link>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between px-8 h-[60px] text-white">
      <Link
        to={`/`}
        className="font-semibold text-3xl tracking-wide hover:cursor-pointer"
      >
        pulse.
      </Link>
      {/* <input type="text" placeholder="Find pulses..." className="max-w-[80%] min-w-[220px] border-b-2 border-sky-400 bg-black/30 px-4 py-1 text-white" /> */}
      {renderNavbarLinks()}
    </div>
  );
}

export default Navbar;
