import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(true);

  const showMenu = () => {
    setActive(!active);
  };

  const closeMenu = () => {
    setActive(false);
  };

  return (
    <>
      <nav className="w-full shadow-lg bg-green-100 text-green-700">
        <div className="flex justify-between items-center h-12 px-6">
          <Link href="/">
            <h3 className="text-2xl cursor-pointer">eCare</h3>
          </Link>
          <ul className="hidden sm:flex flex-row gap-6 uppercase">
            <MenuItems />
          </ul>

          <AiOutlineMenu
            className="sm:hidden cursor-pointer"
            onClick={showMenu}
          />
        </div>
        {active && (
          <ul className="sm:hidden flex flex-col gap-2 fixed inset-0 justify-center right-1/2 border-2 items-center uppercase mt-12 bg-black/30 backdrop-blur-sm z-10 shadow-2xl">
            <MenuItems closeMenu={closeMenu} />
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
