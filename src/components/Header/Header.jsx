import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between items-center p-3 shadow shadow-gray-300">
      {/* Logo */}
      <div className="w-[60px] h-[60px] rounded-full shadow shadow-gray-500 overflow-hidden">
        <img
          src="/logo.webp"
          alt="Logo"
          className="cursor-pointer w-full h-full object-cover p-1"
        />
      </div>

      <div>
        {isSignedIn ? (
          <div className="flex gap-4 items-center">
            <Link to={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to="/auth/sign-in">
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
