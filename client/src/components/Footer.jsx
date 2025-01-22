import React from "react";
import logo from "../../src/assets/logo_black/apple-touch-icon-preview.png";

function Footer() {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer ">
      <div className="w-full flex justify-between sm:flex-row items-center my-4">
        <div className="ml-20">
          <img src={logo} alt="logo" className="w-16" />
        </div>
        <div className="flex flex-wrap items-center sm:mt-0 mt-5 mr-20">
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Market
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Exchange Market
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Tutorials
          </p>
          <p className="text-white text-base text-center mx-2 cursor-pointer">
            Wallets
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-small text-center">Come Join Us</p>
        <p className="text-white text-small text-center">
          careers@sloka.com
        </p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5">
      </div>
        <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
          <p className="text-white text-small text-center">@sloka 2024</p>
          <p className="text-white text-small text-center">
            All rights reserved
          </p>
        </div>
    </div>
  );
}

export default Footer;
