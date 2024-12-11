import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../src/assets/logo_black/apple-touch-icon-preview.png";

const NavbarItem = ({title, classProps} ) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

function Navbar() {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-3">
      <div className="md:flex-[0.5] flex-intial justify-center items-center">
        <img src={logo} alt="logo" className="w-14 cursor-pointer inline-block" />
        <span className="text-white playwrite-es-regular font-bold tracking-[0.75rem] absolute top-5">SLOKA</span>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutotials", "Wallets"].map((item, index) => (
          <NavbarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#259037] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#25bd39d4]">
Login
        </li>
      </ul>
      <div className="flex relative">
        {toggleMenu 
        ? 
      <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToggleMenu(false)} />
    :
    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToggleMenu(true)}/>}
    {toggleMenu &&
    (
      <ul
      className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
      flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
      >
        <li className="text-xl w-full my-2">
          <AiOutlineClose onClick = {()=>setToggleMenu(false)}/>
        </li>
        {["Market", "Exchange", "Tutotials", "Wallets"].map((item, index) => (
          <NavbarItem key={item + index} title={item} classProps = "my-2 text-lg"/>
        ))}
      </ul>
    )}
      </div>
    </nav>
  );
}

export default Navbar;
