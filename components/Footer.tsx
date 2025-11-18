import React from "react";
import { LuInstagram } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col md:items-start items-center justify-center">
      <div className="flex flex-row items-center gap-2 px-4 sm:px-6 lg:px-12">
        <h1 className="text-black text-[18px] sm:text-[20px] md:text-[24px] leading-[26px] font-semibold">
          Be Part of the AAURAA Community
        </h1>
        <div className="w-8 sm:w-10 md:w-16 h-[3px] bg-black rounded-full md:block hidden"></div>
        <div className="flex flex-row items-center gap-2 ">
          <Link
            href="https://www.instagram.com/getaauraa?igsh=ZXg1NWVmdnk5ZXFn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <LuInstagram className="text-black text-[20px] sm:text-[22px] md:text-[30px] cursor-pointer md:block hidden" />
          </Link>
          <Link
            href="https://facebook.com/aauraa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <IoLogoFacebook className="text-black text-[20px] sm:text-[22px] md:text-[33px] cursor-pointer md:block hidden" />
          </Link>
        </div>
      </div>
      <div className="relative w-full h-[110px] sm:h-[220px] md:h-[252px] mt-6 md:px-13 px-5">
        <Image
          src="https://ik.imagekit.io/99y1fc9mh/Aauraa/Mask%20group.png?updatedAt=1763033392868"
          alt="Footer Banner"
          width={2000}
          height={2000}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="flex flex-row items-center gap-2 mb-5 ">
        <Link
          href="https://www.instagram.com/getaauraa?igsh=ZXg1NWVmdnk5ZXFn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <h1 className="text-black font-semibold text-[15px] leading-[16px] tracking-tight cursor-pointer md:hidden block">
            Instagram
          </h1>
        </Link>
        <Link
          href="https://facebook.com/aauraa"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <h1 className="text-black font-semibold text-[15px] leading-[16px] tracking-tight cursor-pointer md:hidden block">
            Facebook
          </h1>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2 sm:gap-6 md:mt-14 mb-6  px-4 sm:px-6 lg:px-19 text-center">
        <p className="text-[#6E6E6E] text-[15px] leading-[16px]  md:text-[20px] md:leading-[22px] font-semibold tracking-tight">
          © {currentYear} Aauraa. All rights reserved.
        </p>
        <p className="text-[#6E6E6E] text-[15px] leading-[16px]  md:text-[20px] md:leading-[22px] font-semibold tracking-tight">
          Designed & Developed by{" "}
          <Link
            href="https://ticbyakwad.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" font-semibold hover:underline transition-all"
          >
            Ticbyakwad
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
