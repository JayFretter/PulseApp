import { useState } from "react";

import { Link } from "react-router-dom";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);

  const getNavbarLinks = () => {
    if (loggedIn)
    {
      return (
        <div className="flex items-center gap-4 uppercase font-thin">
          <Link to={`/`}>Log Out</Link>
          <Link to={`profile`}>Profile</Link>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-4 uppercase font-thin">
        <Link to={`/login`}>Log In</Link>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between px-8 h-[60px] bg-purple-800 text-white">
      <Link to={`/`} className="font-semibold text-3xl tracking-wide hover:cursor-pointer">pulse.</Link>
      <input type="text" placeholder="Search for a pulse..." className="w-[300px] h-[50%] rounded-lg bg-purple-200 p-2 text-black" />
      {getNavbarLinks()}
    </div>
  );
}

export default Navbar;
