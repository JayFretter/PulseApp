import { useState } from "react";

import { Link } from "react-router-dom";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);

  const getNavbarLinks = () => {
    if (loggedIn)
    {
      return (
        <div className="flex items-center gap-4 uppercase font-thin">
          <Link to={`/`} className="hidden md:block">Log Out</Link>
          <Link to={`profile`} className="hidden md:block">Profile</Link>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-4 uppercase font-thin">
        <Link to={`/login`} className="hidden md:block">Log In</Link>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between px-8 h-[60px] bg-purple-800 text-white">
      <Link to={`/`} className="font-semibold text-3xl tracking-wide hover:cursor-pointer">pulse.</Link>
      <input type="text" placeholder="Search for a pulse..." className="max-w-[80%] min-w-[220px] h-[50%] rounded-lg bg-purple-200 p-2 text-black" />
      {getNavbarLinks()}
    </div>
  );
}

export default Navbar;
