import useAuth from "@/hooks/useAuth";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import BasicMenu from "./BasicMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    // This function says if we can scroll more than 0 (not scrolling) --> fire the react hook off
    const handleScroll = () => {
      // If we scroll past our initial fire
      if (window.scrollY > 0) {
        setIsScrolled(true);
        // If we go back to 0 scroll (the top) --> remove
      } else {
        setIsScrolled(false);
      }
    };

    // Listens to whatever event you pass through
    window.addEventListener("scroll", handleScroll);
    // Removes the nav header when you scroll to the top
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // If the react hook is fired we want to change the bg to the colour
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
          />
        </Link>
        <BasicMenu/>
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Tv Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light ">
        <MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6 sm:inline" />
        <Link href="/account">
        <img
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
        </Link>
      </div>
    </header>
  );
};

export default Header;
